/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const longestSubsequence = function (s, k) {
  const n = s.length;
  let power = 1;
  let current = 0;
  let result = 0;

  for (let index = n - 1; index >= 0; index--) {
    if (s[index] === '0') {
      result += 1;
    } else if (current + power <= k) {
      current += power;
      result += 1;
    }

    power *= 2;
  }

  return result;
};
