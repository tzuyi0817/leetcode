/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const minCharacters = function (a, b) {
  const CODE_BASE = 'a'.charCodeAt(0);
  const m = a.length;
  const n = b.length;
  const countA = Array(26).fill(0);
  const countB = Array(26).fill(0);
  let result = m + n;

  for (const char of a) countA[char.charCodeAt(0) - CODE_BASE] += 1;
  for (const char of b) countB[char.charCodeAt(0) - CODE_BASE] += 1;
  for (let index = 0; index < 26; index++) {
    result = Math.min(m + n - countA[index] - countB[index], result);

    if (index > 0) {
      countA[index] += countA[index - 1];
      countB[index] += countB[index - 1];
    }
    if (index >= 25) continue;
    result = Math.min(m - countA[index] + countB[index], result);
    result = Math.min(n + countA[index] - countB[index], result);
  }
  return result;
};
