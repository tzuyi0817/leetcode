/**
 * @param {string} word
 * @return {number}
 */
const minimumPushes = function (word) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const KEYS = 8;
  const counts = Array(26).fill(0);
  let result = 0;

  for (const letter of word) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }
  counts.sort((a, b) => b - a);

  for (let index = 0; index < counts.length; index++) {
    result += counts[index] * (Math.floor(index / KEYS) + 1);
  }
  return result;
};
