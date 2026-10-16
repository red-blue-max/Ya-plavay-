// Проверка собранного сайта: ссылки и якоря, один H1, alt у картинок, уникальные title/description,
// отсутствие упоминаний лагеря. Запуск: node scripts/check-dist.mjs (после npm run build)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) { if (f !== '_astro') walk(p); }
  else if (f.endsWith('.html')) pages.push(p);
});
walk(dist);

const urlOf = (file) => '/' + file.slice(dist.length + 1).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');
const html = Object.fromEntries(pages.map((p) => [urlOf(p), readFileSync(p, 'utf8')]));
const ids = Object.fromEntries(Object.entries(html).map(([u, h]) => [u, new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const errors = [];
const titles = new Map(), descs = new Map();

for (const [url, h] of Object.entries(html)) {
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${url}: H1 на странице — ${h1}`);
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\salt[\s=>]/.test(m[0])) errors.push(`${url}: <img> без alt`);
  const t = h.match(/<title>([^<]*)<\/title>/)?.[1]; const d = h.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!t) errors.push(`${url}: нет title`); if (!d) errors.push(`${url}: нет description`);
  if (url !== '/404') { if (titles.has(t)) errors.push(`${url}: title как у ${titles.get(t)}`); titles.set(t, url); if (descs.has(d)) errors.push(`${url}: description как у ${descs.get(d)}`); descs.set(d, url); }
  const text = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  if (/лагер|lager/i.test(text) || /lager/i.test(h)) errors.push(`${url}: упоминание лагеря`);
  if (/нозолог/i.test(text)) errors.push(`${url}: слово «нозологий»`);
  for (const m of h.matchAll(/href="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [path, hash] = href.split('#');
    const target = path === '' ? url : path;
    if (path && !path.startsWith('/')) continue;
    if (/\.(css|js)$/.test(target)) continue;
    if (/\.(png|webp|avif|jpg|xml|webmanifest|php|txt)$/.test(target)) { if (!target.startsWith('/api/') && !existsSync(join(dist, target))) errors.push(`${url}: нет файла ${target}`); continue; }
    if (!(target in html)) { errors.push(`${url}: битая ссылка ${href}`); continue; }
    if (hash && !ids[target].has(hash)) errors.push(`${url}: нет якоря ${href}`);
  }
}
// Якоря из .htaccess
const ht = readFileSync(join(dist, '.htaccess'), 'utf8');
for (const m of ht.matchAll(/RewriteRule \^[^\s]+\s+(\/[^\s]*)/g)) {
  if (m[1].includes('$')) continue;
  const [p, hash] = m[1].split('#');
  if (!(p in html)) errors.push(`.htaccess: редирект на несуществующую страницу ${m[1]}`);
  else if (hash && !ids[p].has(hash)) errors.push(`.htaccess: нет якоря ${m[1]}`);
}
console.log(`Страниц: ${pages.length}`);
console.log(errors.length ? errors.join('\n') : 'Ошибок не найдено');
process.exit(errors.length ? 1 : 0);
