import { resolve } from 'node:path';
import { defineConfig } from 'vitepress';
import { search } from './search';
import { generateSidebar } from './sidebar';

const base = '/leetcode/';
export const solutionsPath = resolve(__dirname, '..', '..', '..', 'solutions');

export default defineConfig({
  title: 'LeetCode Solutions',
  description: 'Solutions to LeetCode in JavaScript.',

  base,
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['link', { rel: 'icon', type: 'image/png', href: `${base}logo.png` }],
    ['meta', { property: 'og:title', content: 'LeetCode Solutions' }],
    ['meta', { property: 'og:description', content: 'Solutions to LeetCode in JavaScript.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],

  sitemap: {
    hostname: 'https://tzuyi0817.github.io/leetcode/',
  },

  markdown: {
    theme: {
      light: 'light-plus',
      dark: 'dark-plus',
    },
  },

  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Solutions', link: '/solutions/4. Median of Two Sorted Arrays', activeMatch: '^/solutions/' },
    ],

    sidebar: generateSidebar(solutionsPath),
    socialLinks: [{ icon: 'github', link: 'https://github.com/tzuyi0817/leetcode' }],
    search,

    footer: {
      message: 'Released under the MIT license',
      copyright: `Copyright © 2024-present Tzuyi`,
    },
  },
});
