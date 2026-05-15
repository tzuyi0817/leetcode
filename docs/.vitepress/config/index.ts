import { defineConfig } from 'vitepress';
import { search } from './search';
import { generateSidebar } from './sidebar';
import { sitemap } from './sitemap';
import { transformPageData } from './transform-page-data';

const base = '/leetcode/';

export default defineConfig({
  title: 'LeetCode Solutions',
  description: 'Solutions to LeetCode in JavaScript.',

  base,
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'google-site-verification', content: 'WitgswW5V-dUPvl-xy8a79Fz-OK6iJa1R_JMPTgzp6s' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['link', { rel: 'icon', type: 'image/png', href: `${base}logo.png` }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { property: 'og:title', content: 'LeetCode Solutions' }],
    ['meta', { property: 'og:description', content: 'Solutions to LeetCode in JavaScript.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],

  sitemap,
  transformPageData,

  markdown: {
    theme: {
      light: 'light-plus',
      dark: 'dark-plus',
    },
  },

  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },
    lastUpdated: {
      formatOptions: { dateStyle: 'long', timeStyle: 'medium' },
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Solutions', link: '/solutions/4', activeMatch: '^/solutions/' },
    ],

    sidebar: generateSidebar(),
    socialLinks: [{ icon: 'github', link: 'https://github.com/tzuyi0817/leetcode' }],
    search,

    footer: {
      message: 'Released under the MIT license',
      copyright: `Copyright © 2024-present Tzuyi`,
    },
  },
});
