/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 */
const countWords = function (words1, words2) {
  const wordMap = words1.reduce((map, word) => {
    const count = map.get(word) ?? 0;

    return map.set(word, count + 1);
  }, new Map());
  let result = 0;

  for (const word of words2) {
    const count = wordMap.get(word) ?? 0;

    if (count > 1 || count < 0) continue;
    wordMap.set(word, count - 1);
  }
  for (const count of wordMap.values()) {
    if (count === 0) result += 1;
  }
  return result;
};
