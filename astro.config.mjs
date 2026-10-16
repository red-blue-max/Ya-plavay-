// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
// Адрес сайта для canonical, sitemap и Open Graph:
// 1) SITE_URL из .env или настроек хостинга; 2) на Vercel — его адрес проекта; 3) боевой домен.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const site = env.SITE_URL || (vercelHost ? `https://${vercelHost}` : 'https://ya-plavau.ru');

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/design-system/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
