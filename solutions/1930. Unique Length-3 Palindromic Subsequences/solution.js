/**
 * @param {string} s
 * @return {number}
 */
const countPalindromicSubsequence = function (s) {
  const n = s.length;
  const BASE_CODE = 'a'.charCodeAt(0);
  const starts = Array.from({ length: 26 }, () => n);
  const ends = Array.from({ length: 26 }, () => -1);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const code = s[index].charCodeAt(0) - BASE_CODE;

    starts[code] = Math.min(starts[code], index);
    ends[code] = Math.max(ends[code], index);
  }

  for (let code = 0; code < 26; code++) {
    const start = starts[code];
    const end = ends[code];

    if (start === n || end === -1 || start === end) continue;

    const visited = new Array(26).fill(false);

    for (let index = start + 1; index < end; index++) {
      const targetCode = s[index].charCodeAt(0) - BASE_CODE;

      if (visited[targetCode]) continue;

      result += 1;
      visited[targetCode] = true;
    }
  }

  return result;
};
