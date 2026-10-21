# B H Rubber Products — catalogue website

Live: **https://www.bhrubberproducts.com** · Angular 20 (standalone components, signals, OnPush), SCSS,
lazy-loaded routes, every page prerendered to static HTML. No UI libraries.

```bash
npm install
npm start          # regenerates thumbnails/sitemap, then dev server at http://localhost:4200
npm run build      # sitemap + images → prerendered site → 404 page, in dist/bh-rubber-products/browser
npm run sitemap    # only regenerate sitemap.xml, robots.txt, share images and thumbnails
```

## Deploying (Vercel)

`vercel.json` holds the build settings, so a push to GitHub deploys correctly with no dashboard
changes: build `npm run build`, output `dist/bh-rubber-products/browser`, clean URLs, no trailing
slash, real 404s, and long caching for fonts and hashed JS/CSS.

It also holds two permanent redirects, so every page has exactly one address:

- `bhrubberproducts.com/…` → `https://www.bhrubberproducts.com/…` (the same page on www)
- old category links `/products?category=<name>` → `/categories/<name>`

In **Vercel → Project → Settings → Domains**, keep `www.bhrubberproducts.com` as the primary
domain. Setting `bhrubberproducts.com` to redirect to www there as well is fine, but **never** set
www to redirect to the bare domain: that would loop with the rule above.

## Where to change things

| What | File |
|---|---|
| Phone, WhatsApp number, email, address, shop timings, live domain, home page title | `src/app/core/config/company.config.ts` |
| Products (names, codes, specs, sizes, images, featured flag) | `src/app/data/products.data.ts` |
| Flanges (46 products, own file, appended to the catalogue) | `src/app/data/flanges.data.ts` |
| Categories and their grouping | `src/app/data/categories.data.ts` |
| Category page Google title, heading (H1) and description (`seoTitle`, `heading`, `seoDescription`) | `src/app/data/categories.data.ts` |
| Buying-guide text under each category page | `src/app/data/category-guides.data.ts` |
| Plain-English explanations of EN 388 / EN 407 / EN ISO 20345 ratings | `src/app/core/utils/standards.ts` |
| Page titles, descriptions, structured data | each page's `seo.set(...)` call; shared logic in `src/app/core/services/seo.service.ts` |
| Colours, spacing, radius, shadows, type scale | CSS variables at the top of `src/styles.scss` |
| Sitemap, robots.txt, share images, thumbnails (generated) | `scripts/generate-sitemap.mjs` |
| Which pages are prerendered | `src/app/app.routes.server.ts` |
| Hosting settings | `vercel.json` |

### Adding a product
Add an entry to `RAW_PRODUCTS` in `products.data.ts` and put its photo in `public/products/`
(square WebP on white, 640×640). `id`, `slug` and the card summary are generated automatically.
The next `npm run build` adds it to the sitemap, prerenders its page, and makes its thumbnail and
WhatsApp/social preview image. Commit and push; Vercel does the rest.

## How the site is set up for search engines

- **Real HTML for every page.** All 177 pages (home, products, categories, about, contact,
  15 category pages, 157 product pages) are prerendered with their own title, description,
  canonical link, social preview and structured data — search engines don't need to run
  JavaScript to read them.
- **Category landing pages** at `/categories/<name>` (e.g. `/categories/cut-resistant-gloves`),
  each titled "<Category> Supplier in Kolkata", with a short buying guide under the products.
  Old `/products?category=…` links permanently redirect (308) to them.
- **Product pages explain their ratings.** A product quoting e.g. `EN 388:2016 (4544D)` or
  `EN ISO 20345 S1 SRC` gets a "What the ratings mean" table decoding each figure, generated
  from the standard already in the product data.
- **Structured data (schema.org):** LocalBusiness with address, phone, email and opening hours
  (home, about, contact — generated from `company.config.ts`), WebSite (home), and
  BreadcrumbList on every page. No Product markup: Google requires a price, review or rating
  for that, and the site doesn't publish prices.
- **One canonical address per page** (`https://www.bhrubberproducts.com/...`, no trailing slash);
  the bare domain redirects to www.
  Search-result pages (`?q=`) and "not found" pages are `noindex`.
- **Sitemap** lists every page plus product photos for Google Images, with a `<lastmod>` date
  that only changes when that page's content changes (tracked in `scripts/sitemap-lastmod.json`
  — commit it with your changes). Pagination uses real links
  so every product is reachable by crawling, not only via the sitemap.
- **Speed:** thumbnails for cards, long caching, self-hosted font. Lighthouse (mobile, simulated
  slow 4G): SEO 100, Accessibility 100, Best Practices 100, Performance ~83–89.

## Getting found on Google — steps outside the code

1. **Google Search Console** (search.google.com/search-console): add a *Domain* property for
   `bhrubberproducts.com`, verify with the DNS TXT record it gives you (add it where the domain's
   DNS is managed), then **Sitemaps → submit** `https://www.bhrubberproducts.com/sitemap.xml`.
   Use **URL Inspection → Request indexing** on the home page and a few category pages.
   In **Pages → Crawled – currently not indexed**, click **Validate fix** after deploying.
2. **Google Business Profile** (business.google.com): create/claim "B H Rubber Products" at
   6A, Clive Row, Kolkata 700001 with the same phone, hours and website. This is what puts the
   business on Google Maps and in "near me" / "in Kolkata" results. Add photos; ask happy
   customers for reviews.
3. **Bing Webmaster Tools** (bing.com/webmasters): import from Search Console in one click.
   Bing also powers results in ChatGPT search, Copilot and DuckDuckGo.
4. **B2B listings** with a link back to the website, using exactly the same name, address and
   phone: IndiaMART, TradeIndia, Justdial, and any trade associations. These links are among
   the strongest signals for a new site.
5. Put the website link in the WhatsApp Business profile, email signature, invoices and social
   profiles.
6. Check Search Console monthly: *Pages* (indexing problems), *Performance* (what people search
   to find the site). New sites typically take a few weeks to show up and a few months to settle.

## Structure

```
src/app/
  core/config      company.config.ts   ← single source for contact details and site URL
  core/models      product.model.ts
  core/services    catalog (search/filter/sort), enquiry (WhatsApp/mailto links), seo
  core/utils       standards.ts (decodes EN 388 / EN 407 / EN ISO 20345 ratings)
  data/            products.data.ts, flanges.data.ts, categories.data.ts, category-guides.data.ts
  layout/          header (sticky, mobile menu), footer
  pages/           home (+hero), products (also serves /categories/:slug), product-detail,
                   categories, about, contact, not-found
  shared/          product-card, product-grid, pagination, category-card, cta-section,
                   page-header, enquiry-buttons (WhatsApp/Email), segment-ring, icon,
                   reveal directive
public/
  products/        product photos (WebP, 640×640); products/flanges/ for flanges
  brand/           logo, emblem, social share image
  fonts/           Archivo variable font (self-hosted, OFL licence)
  site.webmanifest
  thumbs/          small card thumbnails (generated by `npm run sitemap`, committed so `ng serve` works)
  share/, sitemap.xml, robots.txt   (generated by `npm run sitemap` — don't edit)
scripts/
  generate-sitemap.mjs   sitemap, robots.txt, share images, thumbnails
  sitemap-lastmod.json   per-page content fingerprint + last-changed date (generated; commit it)
  postbuild.mjs          writes 404.html (noindex) after the build
```

## Behaviour notes
- Listing pages show 12 products per page; search, sort and page live in the URL
  (`/categories/drivers-gloves?q=yellow&page=2`), so filtered views can be shared and the back
  button works. Changing search, category or sort returns to page 1.
- Product enquiry buttons pre-fill the product name and code. Products without a code
  (welding apron, guards, jacket, trousers, flanges) omit the code line.
- The quote form validates in the browser, then opens the visitor's email app or WhatsApp with
  all details filled in. There is no server-side form handler.
- `/contact?product=<slug>` pre-fills the requirement field.
- Animations respect the visitor's "reduce motion" setting.
