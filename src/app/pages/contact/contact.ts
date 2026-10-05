import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { COMPANY } from '../../core/config/company.config';
import { CatalogService } from '../../core/services/catalog.service';
import { EnquiryService, QuoteRequest } from '../../core/services/enquiry.service';
import { SeoService } from '../../core/services/seo.service';
import { Icon } from '../../shared/components/icon/icon';
import { PageHeader } from '../../shared/components/page-header/page-header';

type Field = 'name' | 'company' | 'phone' | 'email' | 'requirement' | 'quantity' | 'message';

/** Friendly, specific messages for each validation rule. */
const MESSAGES: Record<string, Partial<Record<string, string>>> = {
  name: { required: 'Please enter your name.', minlength: 'Please enter at least 2 characters.' },
  phone: {
    required: 'Please enter a phone number so we can reach you.',
    pattern: 'Enter a valid phone number — digits, spaces, + and - are fine.',
  },
  email: { required: 'Please enter your email address.', email: 'That email address doesn’t look right — check for typos.' },
  requirement: { required: 'Tell us which product or what you need.', minlength: 'Please add a little more detail.' },
  quantity: { maxlength: 'Please keep this under 60 characters.' },
  message: { maxlength: 'Please keep your message under 1,000 characters.' },
  company: { maxlength: 'Please keep this under 120 characters.' },
};

@Component({
  selector: 'bh-contact',
  imports: [ReactiveFormsModule, PageHeader, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly company = COMPANY;
  readonly enquiry = inject(EnquiryService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: ['', [Validators.maxLength(120)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,20}$/)]],
    email: ['', [Validators.required, Validators.email]],
    requirement: ['', [Validators.required, Validators.minLength(2)]],
    quantity: ['', [Validators.maxLength(60)]],
    message: ['', [Validators.maxLength(1000)]],
  });

  readonly submitted = signal(false);
  /** Which channel the enquiry was handed to, for the confirmation panel. */
  readonly sentVia = signal<'email' | 'whatsapp' | null>(null);

  constructor() {
    inject(SeoService).set({
      title: 'Contact / Get A Quote',
      description:
        'Request a quote from B H Rubber Products, 6A Clive Row, Kolkata. Call, WhatsApp or email us with the product and quantity you need.',
      path: '/contact',
    });

    // /contact?product=<slug> pre-fills the requirement
    const slug = inject(ActivatedRoute).snapshot.queryParamMap.get('product');
    const product = slug ? inject(CatalogService).getBySlug(slug) : undefined;
    if (product) {
      this.form.controls.requirement.setValue(product.code ? `${product.name} (${product.code})` : product.name);
    }
  }

  showError(field: Field): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || this.submitted());
  }

  errorFor(field: Field): string {
    const errors = this.form.controls[field].errors;
    if (!errors) return '';
    const key = Object.keys(errors)[0];
    return MESSAGES[field]?.[key] ?? 'Please check this field.';
  }

  private validate(): QuoteRequest | null {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      const first = (Object.keys(this.form.controls) as Field[]).find((k) => this.form.controls[k].invalid);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return null;
    }
    return this.form.getRawValue();
  }

  sendEmail(): void {
    const q = this.validate();
    if (!q) return;
    window.location.href = this.enquiry.quoteMailto(q);
    this.sentVia.set('email');
  }

  sendWhatsapp(): void {
    const q = this.validate();
    if (!q) return;
    window.open(this.enquiry.quoteWhatsapp(q), '_blank', 'noopener');
    this.sentVia.set('whatsapp');
  }

  startOver(): void {
    this.form.reset();
    this.submitted.set(false);
    this.sentVia.set(null);
  }
}
