/**
 * @param {string} s
 * @return {string}
 */
const longestDupSubstring = function (s) {
  const MODULO = 2 ** 47 - 1;
  const BASE_HASH = 26;
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const codes = [...s].map(letter => letter.charCodeAt(0) - BASE_CODE);

  let left = 1;
  let right = n;
  let start = -1;
  let end = -1;

  const rollingHash = length => {
    const seen = new Set();
    let hash = 0;
    let power = 1;

    for (let index = 0; index < length; index++) {
      const code = codes[index];

      hash = (hash * BASE_HASH + code) % MODULO;
      power = (power * BASE_HASH) % MODULO;
    }
    seen.add(hash);

    for (let last = length; last < n; last++) {
      const removeCode = codes[last - length];
      const code = codes[last];

      hash = (hash * BASE_HASH) % MODULO;
      hash = (((hash - power * removeCode) % MODULO) + MODULO) % MODULO;
      hash = (hash + code) % MODULO;

      if (seen.has(hash)) {
        return { start: last - length + 1, end: last + 1 };
      }
      seen.add(hash);
    }
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const range = rollingHash(mid);

    if (range) {
      start = range.start;
      end = range.end;
    }
    range ? (left = mid + 1) : (right = mid);
  }
  return s.slice(start, end);
};
