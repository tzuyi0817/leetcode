/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
  const wordsMap = words.reduce((map, word) => {
    const count = map.get(word) ?? 0;

    return map.set(word, count + 1);
  }, new Map());
  const currentMap = new Map();
  const n = s.length;
  const length = words[0].length;
  const result = [];
  const getSubStrCount = str => currentMap.get(str) ?? 0;

  for (let start = 0; start < length; start++) {
    let left = start;
    let currentCount = 0;

    for (let index = start; index <= n - length; index += length) {
      const subStr = s.slice(index, index + length);
      const count = wordsMap.get(subStr);

      if (count) {
        currentMap.set(subStr, getSubStrCount(subStr) + 1);
        if (getSubStrCount(subStr) <= count) currentCount += 1;
        else {
          while (getSubStrCount(subStr) > count) {
            const leftSubStr = s.slice(left, left + length);

            currentMap.set(leftSubStr, getSubStrCount(leftSubStr) - 1);
            left += length;
            if (getSubStrCount(leftSubStr) >= wordsMap.get(leftSubStr)) continue;
            currentCount -= 1;
          }
        }
        if (currentCount === words.length) {
          const leftSubStr = s.slice(left, left + length);

          result.push(left);
          currentMap.set(leftSubStr, getSubStrCount(leftSubStr) - 1);
          currentCount -= 1;
          left += length;
        }
        continue;
      }
      currentCount = 0;
      currentMap.clear();
      left = index + length;
    }
    currentMap.clear();
  }
  return result;
};
