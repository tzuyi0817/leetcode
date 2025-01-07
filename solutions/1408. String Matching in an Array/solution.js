/**
 * @param {string[]} words
 * @return {string[]}
 */
const stringMatching = function (words) {
  const n = words.length;
  const memo = [];
  const result = new Set();

  words.sort((a, b) => b.length - a.length);

  for (const word of words) {
    for (const memoWord of memo) {
      if (word.length === memoWord.length || !memoWord.includes(word)) continue;

      result.add(word);
    }
    memo.push(word);
  }
  return [...result];
};
