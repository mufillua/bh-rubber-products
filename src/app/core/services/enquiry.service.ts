import { Injectable } from '@angular/core';
import { COMPANY } from '../config/company.config';
import { Product } from '../models/product.model';

export interface QuoteRequest {
  name: string;
  company?: string;
  phone: string;
  email: string;
  requirement: string;
  quantity?: string;
  message?: string;
}

/** Builds every WhatsApp / email / phone link on the site from COMPANY config. */
@Injectable({ providedIn: 'root' })
export class EnquiryService {
  readonly company = COMPANY;

  productMessage(product: Product): string {
    const lines = [
      `Hello ${COMPANY.name},`,
      '',
      'I am interested in the following product:',
      '',
      `Product: ${product.name}`,
      ...(product.code ? [`Product Code: ${product.code}`] : []),
      '',
      'Please share availability, pricing and further details.',
      '',
      'Thank you.',
    ];
    return lines.join('\n');
  }

  productSubject(product: Product): string {
    return ['Product Enquiry', product.name, product.code].filter(Boolean).join(' - ');
  }

  whatsappLink(text?: string): string {
    const base = `https://wa.me/${COMPANY.whatsappNumber}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
  }

  mailtoLink(subject?: string, body?: string): string {
    const params: string[] = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    return `mailto:${COMPANY.email}${params.length ? '?' + params.join('&') : ''}`;
  }

  productWhatsapp(product: Product): string {
    return this.whatsappLink(this.productMessage(product));
  }

  productMailto(product: Product): string {
    return this.mailtoLink(this.productSubject(product), this.productMessage(product));
  }

  generalWhatsapp(): string {
    return this.whatsappLink(
      `Hello ${COMPANY.name},\n\nI would like to enquire about your industrial products. Please get in touch.\n\nThank you.`,
    );
  }

  quoteMessage(q: QuoteRequest): string {
    const rows: [string, string | undefined][] = [
      ['Name', q.name],
      ['Company', q.company],
      ['Phone', q.phone],
      ['Email', q.email],
      ['Product / Requirement', q.requirement],
      ['Quantity', q.quantity],
    ];
    return [
      `Hello ${COMPANY.name},`,
      '',
      'I would like a quote for the following:',
      '',
      ...rows.filter(([, v]) => v?.trim()).map(([k, v]) => `${k}: ${v!.trim()}`),
      ...(q.message?.trim() ? ['', q.message.trim()] : []),
      '',
      'Thank you.',
    ].join('\n');
  }

  quoteMailto(q: QuoteRequest): string {
    return this.mailtoLink(`Quote Request - ${q.requirement.trim()}`, this.quoteMessage(q));
  }

  quoteWhatsapp(q: QuoteRequest): string {
    return this.whatsappLink(this.quoteMessage(q));
  }

  telLink(): string {
    return `tel:${COMPANY.phoneHref}`;
  }
}
