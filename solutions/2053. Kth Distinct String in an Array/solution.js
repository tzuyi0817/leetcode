/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 */
const kthDistinct = function (arr, k) {
  const wordsMap = new Map();
  let current = 0;

  for (const word of arr) {
    const count = wordsMap.get(word) ?? 0;

    wordsMap.set(word, count + 1);
  }
  for (const [word, count] of wordsMap) {
    if (count === 1) current += 1;
    if (current === k) return word;
  }
  return '';
};
