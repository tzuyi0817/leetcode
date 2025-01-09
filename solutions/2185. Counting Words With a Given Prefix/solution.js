/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
const prefixCount = function (words, pref) {
  let result = 0;

  for (const word of words) {
    if (word.startsWith(pref)) {
      result += 1;
    }
  }
  return result;
};
