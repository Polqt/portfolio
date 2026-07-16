import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import pagefind from 'astro-pagefind';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  adapter: vercel(),
  devToolbar: { enabled: false },
  integrations: [
    expressiveCode({
      customizeTheme(theme) {
        theme.name = theme.type;
      },
      defaultProps: { wrap: true },
      themes: ['github-light', 'github-dark'],
    }),
    mdx(),
    pagefind(),
    sitemap({ filter: (page) => !page.includes('/api/') }),
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append', properties: { class: 'heading-anchor', ariaHidden: true, tabIndex: -1 }, content: { type: 'text', value: ' #' } }],
    ],
  },
  output: 'static',
  site: 'https://janpolhidalgo.dev',
  vite: {
    optimizeDeps: { include: ['mermaid', 'motion'] },
    plugins: [tailwindcss()],
  },
});
