/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const shortestBeautifulSubstring = function (s, k) {
  const n = s.length;
  let left = 0;
  let ones = 0;
  let result = '';

  for (let index = 0; index < n; index++) {
    const char = s[index];

    if (char === '1') {
      ones += 1;
    }

    while (ones > k || (ones === k && s[left] === '0')) {
      const leftChar = s[left];

      if (leftChar === '1') {
        ones -= 1;
      }

      left += 1;
    }

    if (ones !== k) continue;

    const m = result.length;
    const len = index - left + 1;

    if (!m || len < m) {
      result = s.slice(left, index + 1);
    }

    if (len !== m) continue;

    const str = s.slice(left, index + 1);

    if (str < result) {
      result = str;
    }
  }

  return result;
};
