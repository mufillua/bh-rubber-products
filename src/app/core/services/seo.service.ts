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
  /** Keep this page out of search results (internal search, "not found" pages). */
  noindex?: boolean;
  /** Structured data (schema.org JSON-LD) for this page. */
  jsonLd?: object[];
}

type Crumb = { name: string; path: string };

const abs = (path: string) => `${COMPANY.siteUrl}${path.startsWith('/') ? '' : '/'}${path}`;

/** schema.org BreadcrumbList — shown by Google as the page path under the result title. */
export function breadcrumbLd(crumbs: Crumb[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

const DAY_NAMES: Record<string, string[]> = {
  'Monday – Friday': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  Saturday: ['Saturday'],
  Sunday: ['Sunday'],
};

/** "10:00 am – 6:00 pm" → ["10:00", "18:00"] */
function parseHours(range: string): [string, string] | null {
  const m = range.match(/(\d{1,2}):(\d{2})\s*(am|pm)\s*–\s*(\d{1,2}):(\d{2})\s*(am|pm)/i);
  if (!m) return null;
  const to24 = (h: string, min: string, ap: string) =>
    `${String((Number(h) % 12) + (ap.toLowerCase() === 'pm' ? 12 : 0)).padStart(2, '0')}:${min}`;
  return [to24(m[1], m[2], m[3]), to24(m[4], m[5], m[6])];
}

/**
 * The business itself (LocalBusiness), built from COMPANY so it never drifts
 * from what the site shows. Used on Home, About and Contact.
 */
export function businessLd(): object {
  const a = COMPANY.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': abs('/#business'),
    name: COMPANY.name,
    slogan: COMPANY.tagline,
    description: COMPANY.seo.defaultDescription,
    url: abs('/'),
    logo: abs('/brand/bh-emblem-512.png'),
    image: abs('/brand/og-image.jpg'),
    telephone: COMPANY.phoneDisplay,
    email: COMPANY.email,
    founder: { '@type': 'Person', name: COMPANY.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.line1,
      addressLocality: a.city,
      postalCode: a.postcode,
      addressRegion: a.region,
      addressCountry: 'IN',
    },
    hasMap: COMPANY.mapsUrl,
    openingHoursSpecification: COMPANY.hours.flatMap((h) => {
      const t = parseHours(h.time);
      const days = DAY_NAMES[h.days];
      return t && days ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: t[0], closes: t[1] }] : [];
    }),
  };
}

/** WebSite — helps Google show "B H Rubber Products" as the site name in results. */
export function websiteLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: COMPANY.name,
    alternateName: ['BH Rubber Products', 'B.H. Rubber Products'],
    url: abs('/'),
    publisher: { '@id': abs('/#business') },
    inLanguage: 'en-IN',
  };
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set({ title, description, path = '', image, noindex = false, jsonLd = [] }: SeoData): void {
    const fullTitle = title ? `${title} | ${COMPANY.name}` : COMPANY.seo.defaultTitle;
    const desc = description ?? COMPANY.seo.defaultDescription;
    const url = abs(path || '/');
    // Product photos are WebP; link previews use the matching 1200×630 JPG made by `npm run sitemap`.
    const shareImage = image?.startsWith('products/') ? `share/${image.replace(/\.[a-z]+$/i, '.jpg')}` : image;
    const img = abs(shareImage ?? COMPANY.seo.ogImage);

    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({
      name: 'robots',
      content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: img });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: title ?? COMPANY.name });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.meta.updateTag({ name: 'twitter:image', content: img });

    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;

    this.setJsonLd(noindex ? [] : jsonLd);
  }

  /** One <script type="application/ld+json"> per page, replaced on every navigation. */
  private setJsonLd(items: object[]): void {
    const id = 'page-structured-data';
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!items.length) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      this.doc.head.appendChild(script);
    }
    const data = items.length === 1 ? items[0] : items;
    // Escape "<" so product text can never close the script tag.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }
}
