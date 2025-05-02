/**
 * @param {string} s
 * @return {number}
 */
const minimumDeletions = function (s) {
  let a = 0;
  let b = 0;

  for (const char of s) {
    char === 'a' ? (a = Math.min(b, a + 1)) : (b += 1);
  }
  return Math.min(a, b);
};
