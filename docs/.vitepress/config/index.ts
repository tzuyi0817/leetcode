import { resolve } from 'node:path';
import { defineConfig } from 'vitepress';
import { generateSidebar } from './sidebar';

export const solutionsPath = resolve(__dirname, '..', '..', '..', 'solutions');

export default defineConfig({
  title: 'LeetCode Solutions',
  description:
    'Solutions to LeetCode in JavaScript. The purpose is to provide good readability and consistent style to the code.',
  cleanUrls: true,

  themeConfig: {
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: generateSidebar(),

    socialLinks: [{ icon: 'github', link: 'https://github.com/tzuyi0817/leetcode' }],

    footer: {
      message: 'Released under the MIT license',
      copyright: `Copyright © 2024-present Tzuyi`,
    },
  },
});