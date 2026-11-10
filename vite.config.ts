import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Адрес сайта нужен только для абсолютных ссылок в SEO-разметке
 * (canonical, Open Graph, sitemap.xml).
 *
 * Источники, по приоритету:
 * 1. VITE_SITE_URL — задаётся вручную (например, https://example.ru);
 * 2. VERCEL_PROJECT_PRODUCTION_URL — Vercel подставляет сам при сборке.
 *
 * Если адрес неизвестен, сборка всё равно проходит: sitemap.xml просто
 * не создаётся, а ссылок с выдуманным доменом в разметке не появляется.
 */
function resolveSiteUrl(env: Record<string, string>): string {
  const manual = (env.VITE_SITE_URL ?? '').trim();
  const vercel = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '').trim();
  const raw = manual || (vercel ? `https://${vercel}` : '');
  return raw.replace(/\/+$/, '');
}

function seoFiles(siteUrl: string, base: string): Plugin {
  return {
    name: 'kontur-seo-files',
    apply: 'build',

    transformIndexHtml() {
      const image = siteUrl ? `${siteUrl}/assets/og.png` : `${base}assets/og.png`;
      const tags = [
        { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' as const },
      ];
      if (siteUrl) {
        tags.push(
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' as const },
        );
      }
      return tags;
    },

    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (siteUrl) {
        robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
        const today = new Date().toISOString().slice(0, 10);
        const urls = ['/', '/privacy']
          .map(
            (path) =>
              `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
          )
          .join('\n');
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        });
      }
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `${robots.join('\n')}\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = resolveSiteUrl(env);

  // Подпапка сайта: «/» для собственного домена и Vercel,
  // «/имя-репозитория/» для GitHub Pages (задаётся в workflow).
  const base = `/${(env.VITE_BASE ?? '').replace(/^\/+|\/+$/g, '')}/`.replace(/\/+/g, '/');

  return {
    base,
    plugins: [react(), seoFiles(siteUrl, base)],
  };
});
