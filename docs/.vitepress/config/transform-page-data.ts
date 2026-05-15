import { extractSolutionSerial, getSolutionLastModISO, hostname } from './helper';
import type { PageData } from 'vitepress';

export function transformPageData(pageData: PageData) {
  const canonicalUrl = toCanonicalUrl(pageData.relativePath);

  pageData.frontmatter.head ??= [];
  pageData.frontmatter.head.push(
    ['link', { rel: 'canonical', href: canonicalUrl }],
    ['meta', { property: 'og:url', content: canonicalUrl }],
  );

  // 讓 default theme 在頁面底部正常渲染「最後更新」區塊
  const serial = extractSolutionSerial(pageData.relativePath);

  if (!serial) return;

  const lastmodISO = getSolutionLastModISO(serial);

  if (lastmodISO) {
    pageData.lastUpdated = Date.parse(lastmodISO);
  }
}

/** 將 docs srcDir 相對路徑轉成正規網址（去除 `.md` 與 index 後綴） */
function toCanonicalUrl(relativePath: string) {
  const cleaned = relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1');

  return `${hostname}${cleaned}`;
}
