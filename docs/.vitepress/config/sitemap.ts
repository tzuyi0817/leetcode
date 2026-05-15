import { extractSolutionSerial, getSolutionLastModISO, hostname } from './helper';
import type { DefaultTheme, UserConfig } from 'vitepress';

export const sitemap: UserConfig<DefaultTheme.Config>['sitemap'] = {
  hostname,
  transformItems(items) {
    return items.map(item => {
      const { pathname } = new URL(item.url, hostname);
      const serial = extractSolutionSerial(pathname);
      const lastmod = serial ? getSolutionLastModISO(serial) : undefined;

      if (lastmod && !item.lastmod) {
        item.lastmod = lastmod;
      }

      item.changefreq = serial ? 'monthly' : 'weekly';

      return item;
    });
  },
};
