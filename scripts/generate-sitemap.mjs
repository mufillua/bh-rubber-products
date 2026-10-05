/**
 * Generates, from the live product data:
 *   • public/sitemap.xml
 *   • public/robots.txt
 *   • public/share/products/…jpg — 1200×630 JPG link-preview images for every
 *     product (WhatsApp and some social apps don't reliably preview WebP)
 *
 *   npm run sitemap        (also runs automatically before `npm run build`)
 *
 * The domain comes from COMPANY.siteUrl in src/app/core/config/company.config.ts,
 * and product URLs come from the same PRODUCTS list the site renders — so adding
 * or renaming a product, or changing the domain, needs no edits here.
 */
import { build } from 'esbuild';
import sharp from 'sharp';
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Bundle the TypeScript data files into a temporary module we can import.
const tmp = mkdtempSync(join(tmpdir(), 'bh-sitemap-'));
const entry = join(tmp, 'entry.ts');
writeFileSync(
  entry,
  `export { PRODUCTS } from ${JSON.stringify(join(root, 'src/app/data/products.data.ts'))};
   export { CATEGORIES } from ${JSON.stringify(join(root, 'src/app/data/categories.data.ts'))};
   export { COMPANY } from ${JSON.stringify(join(root, 'src/app/core/config/company.config.ts'))};`,
);
const outfile = join(tmp, 'data.mjs');
await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', outfile, logLevel: 'error' });
const { PRODUCTS, CATEGORIES, COMPANY } = await import(pathToFileURL(outfile).href);
rmSync(tmp, { recursive: true, force: true });

const site = COMPANY.siteUrl.replace(/\/+$/, '');
const today = new Date().toISOString().slice(0, 10);
const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/categories', priority: '0.8', changefreq: 'monthly' },
  ...CATEGORIES.map((c) => ({ path: `/products?category=${c.slug}`, priority: '0.8', changefreq: 'weekly' })),
  ...PRODUCTS.map((p) => ({ path: `/products/${p.slug}`, priority: '0.7', changefreq: 'monthly' })),
  { path: '/about', priority: '0.5', changefreq: 'yearly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages
    .map(
      (p) =>
        `  <url>\n    <loc>${xmlEscape(site + p.path)}</loc>\n    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`;

// Share images: product photo centred on a white 1200×630 canvas (the size link previews use).
let made = 0;
for (const p of PRODUCTS) {
  const src = join(root, 'public', p.image);
  const dest = join(root, 'public/share', p.image.replace(/\.[a-z]+$/i, '.jpg'));
  if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(src).mtimeMs) continue;
  mkdirSync(dirname(dest), { recursive: true });
  // Trim the white padding so the product fills the preview, then centre it with a margin.
  const photo = await sharp(src)
    .flatten({ background: '#ffffff' })
    .trim({ background: '#ffffff', threshold: 12 })
    .resize(1040, 540, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true });
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
    .composite([{ input: photo.data, left: Math.round((1200 - photo.info.width) / 2), top: Math.round((630 - photo.info.height) / 2) }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  made++;
}
console.log(`share images: ${made} generated, ${PRODUCTS.length - made} up to date`);

writeFileSync(join(root, 'public/sitemap.xml'), xml);
writeFileSync(join(root, 'public/robots.txt'), robots);
console.log(`sitemap.xml: ${pages.length} URLs for ${site} (${PRODUCTS.length} products, ${CATEGORIES.length} categories)`);
