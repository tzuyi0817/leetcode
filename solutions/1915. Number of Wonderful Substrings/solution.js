/**
 * @param {string} word
 * @return {number}
 */
const wonderfulSubstrings = function (word) {
  const BASE_CHAR_CODE = 'a'.charCodeAt(0);
  const CHARS = 'abcdefghij'.length;
  const BIT = 2 ** CHARS;
  const counts = Array(BIT).fill(0);
  let result = (current = 0);

  counts[0] = 1;

  for (const char of word) {
    current ^= 1 << (char.charCodeAt(0) - BASE_CHAR_CODE);
    result += counts[current];

    for (let index = 0; index < CHARS; index++) {
      result += counts[current ^ (1 << index)];
    }
    counts[current] += 1;
  }
  return result;
};
