# B H Rubber Products — catalogue website

Angular 20 (standalone components, signals, OnPush), SCSS, lazy-loaded routes. No UI libraries.

```bash
npm install
npm start          # dev server at http://localhost:4200
npm run build      # production build → dist/bh-rubber-products/browser
```

The build output is plain static files. Deploy the `browser` folder to any static host, with
all unknown paths rewritten to `index.html` (needed for routes like `/products/k300-…`).

## Where to change things

| What | File |
|---|---|
| Phone, **WhatsApp number**, **email**, address, shop timings, site URL | `src/app/core/config/company.config.ts` |
| Products (names, codes, specs, sizes, images, featured flag) | `src/app/data/products.data.ts` |
| Flanges (46 products, own file, appended to the catalogue) | `src/app/data/flanges.data.ts` |
| Categories and their grouping | `src/app/data/categories.data.ts` |
| Colours, spacing, radius, shadows, type scale | CSS variables at the top of `src/styles.scss` |
| Business details for search engines (structured data) | `<script type="application/ld+json">` in `src/index.html` |

**Placeholders still to replace:** `email` (`YOUR_EMAIL@example.com`) and `siteUrl`
in `company.config.ts`. `whatsappNumber` is set to the business phone number — change it
there if WhatsApp uses a different number.

### Adding a product
Add an entry to `RAW_PRODUCTS` in `products.data.ts` and put its photo in
`public/products/` (square WebP on white works best — existing images are 640×640).
`id`, `slug` and the card summary are generated automatically.

## Structure

```
src/app/
  core/config      company.config.ts   ← single source for contact details
  core/models      product.model.ts
  core/services    catalog (search/filter/sort), enquiry (WhatsApp/mailto links), seo
  data/            products.data.ts, flanges.data.ts, categories.data.ts
  layout/          header (sticky, mobile menu), footer
  pages/           home (+hero), products, product-detail, categories, about, contact, not-found
  shared/          product-card, product-grid, pagination, category-card, cta-section,
                   page-header, enquiry-buttons (WhatsApp/Email), segment-ring, icon,
                   reveal directive
public/
  products/        110 product photos (WebP)
  products/flanges/  46 flange photos (WebP, named by product slug)
  brand/           logo, emblem, social share image
  fonts/           Archivo variable font (self-hosted, OFL licence)
```

## Behaviour notes
- Products page: 12 per page; search, category and sort live in the URL
  (`/products?category=drivers-gloves&q=yellow&page=2`), so filtered views can be
  shared and the back button works. Changing search, category or sort returns to page 1.
- Product enquiry buttons pre-fill the product name and code. Products without a code
  (welding apron, guards, jacket, trousers) omit the code line.
- The quote form validates in the browser, then opens the visitor's email app or
  WhatsApp with all details filled in. There is no server-side form handler.
- `/contact?product=<slug>` pre-fills the requirement field.
- Animations respect the visitor's "reduce motion" setting.
