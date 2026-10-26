/**
 * Tells Bing (and other IndexNow search engines: Yandex, Seznam, Naver, Yep) which pages changed,
 * so they recrawl them within days instead of weeks. Bing also feeds ChatGPT search, Copilot,
 * DuckDuckGo and Yahoo. Google does not use IndexNow — use Search Console for Google.
 *
 *   npm run indexnow                      submit every URL in public/sitemap.xml
 *   npm run indexnow -- /products/ms-flange /categories/flanges     submit only these pages
 *
 * Run it AFTER the new version is live (the key file public/<key>.txt must be reachable).
 * Submit changed pages only; resubmitting unchanged pages again and again is ignored or penalised.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const keyFile = readdirSync(join(root, 'public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (32 hex characters + .txt) found in public/.');
const key = keyFile.replace('.txt', '');

const sitemap = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');
const all = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const site = new URL(all[0]).origin;
const args = process.argv.slice(2);
const urlList = args.length ? args.map((a) => (a.startsWith('http') ? a : site + a)) : all;

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
// 200 = accepted, 202 = accepted (key check pending), 403 = key file not found on the live site.
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URL(s) submitted for ${site}`);
if (res.status >= 300) process.exitCode = 1;
