/**
 * Tells Bing (and other IndexNow search engines: Yandex, Seznam, Naver, Yep) which pages changed,
 * so they recrawl them within days instead of weeks. Bing also feeds ChatGPT search, Copilot,
 * DuckDuckGo and Yahoo. Google does not use IndexNow — use Search Console for Google.
 *
 *   npm run indexnow                      submit every URL in public/sitemap.xml
 *   npm run indexnow -- /products/ms-flange /categories/flanges     submit only these pages
 *
 * Run it AFTER the new version is live: search engines check that the key file
 * public/<key>.txt is reachable on the live site before accepting the URLs.
 * Submit changed pages only; resubmitting unchanged pages again and again is ignored.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Any one endpoint is enough — IndexNow engines share submissions with each other.
// If one can't be reached from your network, the next is tried.
const ENDPOINTS = process.env.INDEXNOW_ENDPOINT
  ? [process.env.INDEXNOW_ENDPOINT]
  : ['https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow', 'https://yandex.com/indexnow'];
const TIMEOUT_MS = 20_000;

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const keyFile = readdirSync(join(root, 'public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (32 hex characters + .txt) found in public/.');
const key = keyFile.replace('.txt', '');

const sitemap = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');
const all = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const site = new URL(all[0]).origin;
const keyLocation = `${site}/${keyFile}`;
const args = process.argv.slice(2);
const urlList = args.length ? args.map((a) => (a.startsWith('http') ? a : site + a)) : all;

const why = (e) =>
  e?.cause?.code ?? e?.cause?.errors?.[0]?.code ?? (e?.name === 'TimeoutError' ? 'timed out' : e?.message ?? String(e));
const get = (url, init = {}) => fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });

// 1. Is the key file live? If not, every engine will reject the submission.
try {
  const r = await get(keyLocation, { cache: 'no-store' });
  const body = (await r.text()).trim();
  if (!r.ok || body !== key) {
    console.error(
      `✗ The key file isn't live yet: ${keyLocation} returned HTTP ${r.status}.\n` +
        '  Deploy first (git push, then wait until Vercel shows the deployment as Ready), then run this again.',
    );
    process.exit(1);
  }
  console.log(`✓ Key file is live at ${keyLocation}`);
} catch (e) {
  console.warn(`! Couldn't check ${keyLocation} (${why(e)}) — submitting anyway.`);
}

// 2. Submit, trying each endpoint until one answers.
const body = JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList });
for (const endpoint of ENDPOINTS) {
  let res;
  try {
    res = await get(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
  } catch (e) {
    console.warn(`! ${endpoint}: couldn't connect (${why(e)}) — trying the next one.`);
    continue;
  }
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ ${endpoint}: accepted ${urlList.length} URL(s) for ${site} (HTTP ${res.status}).`);
    process.exit(0);
  }
  const hint =
    {
      400: 'bad request',
      403: 'key not valid — the key file is missing or wrong on the live site',
      422: 'some URLs are not on this site',
      429: 'too many requests — wait a day before submitting again',
    }[res.status] ?? 'unexpected response';
  console.error(`✗ ${endpoint}: HTTP ${res.status} (${hint}).`);
  process.exit(1);
}

console.error(
  '✗ None of the IndexNow servers could be reached from this network (a firewall, antivirus, VPN or\n' +
    '  the internet provider is blocking them). Try again on another network, such as a phone hotspot.',
);
process.exitCode = 1;
