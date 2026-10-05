import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { EnquiryService } from '../../../core/services/enquiry.service';
import { Icon } from '../icon/icon';

/**
 * Reusable "Enquire on WhatsApp" button.
 * With a product: pre-fills the product enquiry message.
 * Without: opens a general enquiry chat.
 */
@Component({
  selector: 'bh-whatsapp-button',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="btn btn--whatsapp"
      [class.btn--block]="block()"
      [class.btn--sm]="size() === 'sm'"
      [href]="href()"
      target="_blank"
      rel="noopener"
      [attr.aria-label]="product() ? label() + ' about ' + product()!.name + ' (opens WhatsApp)' : label() + ' (opens WhatsApp)'"
    >
      <bh-icon name="whatsapp" />
      <span>{{ label() }}</span>
    </a>
  `,
  styles: `:host { display: contents; }`,
})
export class WhatsappButton {
  private readonly enquiry = inject(EnquiryService);
  readonly product = input<Product | null>(null);
  readonly label = input('Enquire on WhatsApp');
  readonly block = input(false);
  readonly size = input<'md' | 'sm'>('md');
  readonly href = computed(() => {
    const p = this.product();
    return p ? this.enquiry.productWhatsapp(p) : this.enquiry.generalWhatsapp();
  });
}

/** Reusable "Send Enquiry by Email" button — opens the visitor's mail app, pre-filled. */
@Component({
  selector: 'bh-email-button',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="btn btn--outline"
      [class.btn--block]="block()"
      [class.btn--sm]="size() === 'sm'"
      [href]="href()"
      [attr.aria-label]="product() ? label() + ' about ' + product()!.name : label()"
    >
      <bh-icon name="mail" />
      <span>{{ label() }}</span>
    </a>
  `,
  styles: `:host { display: contents; }`,
})
export class EmailButton {
  private readonly enquiry = inject(EnquiryService);
  readonly product = input<Product | null>(null);
  readonly label = input('Send Enquiry by Email');
  readonly block = input(false);
  readonly size = input<'md' | 'sm'>('md');
  readonly href = computed(() => {
    const p = this.product();
    return p ? this.enquiry.productMailto(p) : this.enquiry.mailtoLink('Product Enquiry');
  });
}
