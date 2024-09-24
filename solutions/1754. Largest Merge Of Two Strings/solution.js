/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
const largestMerge = function (word1, word2) {
  let a = (b = 0);
  let result = '';

  while (a < word1.length && b < word2.length) {
    result += a < word1.length && word1.slice(a) > word2.slice(b) ? word1[a++] : word2[b++];
  }
  result += word1.slice(a);
  result += word2.slice(b);
  return result;
};
