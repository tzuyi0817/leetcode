/**
 * @param {string[]} words
 * @return {number}
 */
const countPrefixSuffixPairs = function (words) {
  const n = words.length;
  let result = 0;

  for (let a = 0; a < n - 1; a++) {
    const wordA = words[a];

    for (let b = a + 1; b < n; b++) {
      const wordB = words[b];

      if (!wordB.startsWith(wordA) || !wordB.endsWith(wordA)) continue;

      result += 1;
    }
  }
  return result;
};
