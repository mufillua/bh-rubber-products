import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './data/products.data';

/**
 * Every page is prerendered to static HTML at build time, so search engines
 * and WhatsApp/social link previews see each page's real title, description
 * and image without running JavaScript. Product pages are generated from the
 * same PRODUCTS list the site renders, so they can never drift apart.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PRODUCTS.map((p) => ({ slug: p.slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
