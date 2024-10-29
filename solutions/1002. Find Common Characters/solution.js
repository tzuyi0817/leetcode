/**
 * @param {string[]} words
 * @return {string[]}
 */
const commonChars = function (words) {
  const BASE_CHAR_CODE = 'a'.charCodeAt(0);
  const result = [];
  const counts = Array.from({ length: 26 }).fill(Number.MAX_SAFE_INTEGER);

  for (const word of words) {
    const currentCounts = Array.from({ length: 26 }).fill(0);

    for (const char of word) {
      const index = char.charCodeAt(0) - BASE_CHAR_CODE;

      currentCounts[index] += 1;
    }
    for (let index = 0; index < 26; index++) {
      counts[index] = Math.min(currentCounts[index], counts[index]);
    }
  }
  for (let index = 0; index < 26; index++) {
    const char = String.fromCharCode(BASE_CHAR_CODE + index);
    const count = counts[index];

    result.push(...char.repeat(count));
  }
  return result;
};
