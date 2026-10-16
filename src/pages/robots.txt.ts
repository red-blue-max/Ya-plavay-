import type { APIRoute } from 'astro';

// PUBLIC_INDEXING=false (демо) — сайт полностью закрыт от поисковиков.
export const GET: APIRoute = ({ site }) => {
  const indexing = import.meta.env.PUBLIC_INDEXING === 'true';
  const body = indexing
    ? `User-agent: *\nDisallow: /api/\nDisallow: /design-system/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
    : `# Демо-сборка: индексация запрещена\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
