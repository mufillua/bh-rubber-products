/**
 * Runs after `ng build` (part of `npm run build`).
 *
 * Creates dist/.../browser/404.html. Hosts like Vercel serve this file — with a real
 * 404 status — for any URL that doesn't match a prerendered page. It's the
 * client-rendered app shell, so the in-app router still shows the right
 * "not found" screen, and it's marked noindex with no canonical link so search
 * engines never index a broken URL as a copy of the home page.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist/bh-rubber-products/browser');
const shell = join(out, 'index.csr.html');

if (!existsSync(shell)) {
  console.error('postbuild: index.csr.html not found — is outputMode "static" set in angular.json?');
  process.exit(1);
}

let html = readFileSync(shell, 'utf8');
html = html
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found | B H Rubber Products</title>')
  .replace(/\s*<link rel="canonical"[^>]*>/, '')
  .replace(/\s*<meta property="og:url"[^>]*>/, '')
  .replace(/<meta name="description"[^>]*>/, '<meta name="robots" content="noindex, follow">');

writeFileSync(join(out, '404.html'), html);
console.log('postbuild: 404.html written (noindex)');
