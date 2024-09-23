import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'LeetCode Solutions',
  description:
    'Solutions to LeetCode in JavaScript. The purpose is to provide good readability and consistent style to the code.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Solutions',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/tzuyi0817/leetcode' }],
  },
});
