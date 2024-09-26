import { resolve } from 'node:path';
import { defineConfig } from 'vitepress';
import { generateSidebar } from './sidebar';

const base = '/leetcode/';
export const solutionsPath = resolve(__dirname, '..', '..', '..', 'solutions');

export default defineConfig({
  title: 'LeetCode Solutions',
  description:
    'Solutions to LeetCode in JavaScript. The purpose is to provide good readability and consistent style to the code.',

  base,
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['link', { rel: 'icon', type: 'image/png', href: `${base}logo.png` }],
  ],

  // sitemap: {
  //   hostname: 'https://tzuyi0817.github.io/leetcode/',
  // },

  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },
    nav: [{ text: 'Home', link: '/' }],
    sidebar: generateSidebar(),
    socialLinks: [{ icon: 'github', link: 'https://github.com/tzuyi0817/leetcode' }],

    search: {
      provider: 'local',
      options: {
        // detailedView: true,

        _render(src, env, md) {
          const html = md.render(src, env);

          return html.replace(/<a[^>]*>(.*?)<\/a>/, '$1');
        },
      },
    },

    footer: {
      message: 'Released under the MIT license',
      copyright: `Copyright © 2024-present Tzuyi`,
    },
  },
});
