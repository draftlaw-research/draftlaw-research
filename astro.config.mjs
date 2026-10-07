import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change this to the real domain once it is bought (see README.md).
export default defineConfig({
  site: 'https://draftlawresearch.org',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { smartypants: true },
});
