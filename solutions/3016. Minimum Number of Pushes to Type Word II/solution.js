/**
 * @param {string} word
 * @return {number}
 */
const minimumPushes = function (word) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const KEYS = 8;
  const counts = Array.from({ length: 26 }).fill(0);
  let result = 0;

  for (const letter of word) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }
  counts.sort((a, b) => b - a);

  for (const [index, count] of counts.entries()) {
    result += count * (Math.floor(index / KEYS) + 1);
  }
  return result;
};
