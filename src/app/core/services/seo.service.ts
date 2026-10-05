import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { COMPANY } from '../config/company.config';

export interface SeoData {
  /** Page title without the site suffix. Omit for the home page. */
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. "/products" */
  path?: string;
  /** Image path relative to /public */
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set({ title, description, path = '', image }: SeoData): void {
    const fullTitle = title ? `${title} | ${COMPANY.name}` : COMPANY.seo.defaultTitle;
    const desc = description ?? COMPANY.seo.defaultDescription;
    const url = `${COMPANY.siteUrl}${path}`;
    const img = `${COMPANY.siteUrl}/${image ?? COMPANY.seo.ogImage}`;

    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: img });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: desc });

    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }
}
