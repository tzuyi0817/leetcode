/**
 * @param {number[][]} lcp
 * @return {string}
 */
const findTheString = function (lcp) {
  const n = lcp.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const words = Array.from({ length: n }, () => '');
  let code = 0;

  for (let a = 0; a < n; a++) {
    if (words[a]) continue;

    if (code >= 26) return '';

    const char = String.fromCharCode(BASE_CODE + code);

    code += 1;

    for (let b = a; b < n; b++) {
      if (lcp[a][b]) {
        words[b] = char;
      }
    }
  }

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      const nextLcp = lcp[a + 1]?.[b + 1] ?? 0;
      const currentLcp = words[a] === words[b] ? 1 + nextLcp : 0;

      if (currentLcp !== lcp[a][b]) return '';
    }
  }

  return words.join('');
};
