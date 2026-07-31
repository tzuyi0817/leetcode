/**
 * @param {string} word
 * @return {number}
 */
const minimumPushes = function (word) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const KEYPADS = 8;
  const counts = Array.from({ length: 26 }, () => 0);
  let result = 0;

  for (const letter of word) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    counts[code] += 1;
  }

  counts.sort((a, b) => b - a);

  for (let index = 0; index < 26; index++) {
    const count = counts[index];
    const times = Math.floor(index / KEYPADS) + 1;

    result += times * count;
  }

  return result;
};
