import type { DefaultTheme } from 'vitepress';

export const search: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    // detailedView: true,

    _render(src, env, md) {
      const html = md.render(src, env);
      const h1MatchArray = html.match(/<h1[^>]*>(.*?)<\/h1>/);

      if (!h1MatchArray || !h1MatchArray.length) return '';
      const [h1] = h1MatchArray;
      const titleMatchArray = h1.match(/<h1\b[^>]*><a\b[^>]*>([^<]+)<\/a>/);
      const title = titleMatchArray?.[1] ?? '';

      return h1.replace(/<a[^>]*>(.*?)<\/a>/, '$1') + title;
    },
  },
};
