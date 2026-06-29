/**
 * @param {string[]} patterns
 * @param {string} word
 * @return {number}
 */
const numOfStrings = function (patterns, word) {
  return patterns.reduce((result, str) => {
    return result + (word.includes(str) ? 1 : 0);
  }, 0);
};
