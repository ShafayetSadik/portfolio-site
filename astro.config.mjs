// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Served from GitHub Pages at https://shafayetsadik.github.io/portfolio-site/
// If the repo is ever renamed to `shafayetsadik.github.io`, set base to '/'.
export default defineConfig({
  site: 'https://shafayetsadik.github.io',
  base: '/portfolio-site',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
