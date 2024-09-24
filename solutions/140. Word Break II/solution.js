/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
const wordBreak = function (s, wordDict) {
  const n = s.length;
  const wordDictSet = new Set(wordDict);
  const subStrMap = new Map();
  const result = [];
  const breakWord = (start, current) => {
    if (start === n) {
      result.push(current.trimEnd());
      return;
    }
    for (let index = start; index < n; index++) {
      const key = `${start},${index + 1}`;
      const memoSubStr = subStrMap.get(key);
      const subStr = memoSubStr ?? s.slice(start, index + 1);

      if (!memoSubStr) subStrMap.set(key, subStr);
      if (!wordDictSet.has(subStr)) continue;
      breakWord(index + 1, `${current}${subStr} `);
    }
  };

  breakWord(0, '');
  return result;
};
