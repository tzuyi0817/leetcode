/**
 * @param {string[]} words
 * @return {string[]}
 */
const findAllConcatenatedWordsInADict = function (words) {
  const wordsSet = new Set(words);
  const memo = new Map();
  const result = [];

  const isConcatenatedWord = word => {
    if (memo.has(word)) return memo.get(word);

    for (let index = 0; index < word.length; index++) {
      const prefix = word.slice(0, index + 1);

      if (!wordsSet.has(prefix)) continue;
      const suffix = word.slice(index + 1);

      if (wordsSet.has(suffix) || isConcatenatedWord(suffix)) {
        memo.set(word, true);
        return true;
      }
    }
    memo.set(word, false);
    return false;
  };

  for (const word of words) {
    if (!isConcatenatedWord(word)) continue;
    result.push(word);
  }
  return result;
};
