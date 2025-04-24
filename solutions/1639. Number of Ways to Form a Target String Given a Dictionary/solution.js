/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
const numWays = function (words, target) {
  const m = words[0].length;
  const n = target.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const BASE_CODE = 'a'.charCodeAt(0);
  const charCounts = Array.from({ length: m }, () => new Array(26).fill(0n));
  const dp = Array.from({ length: m }, () => new Array(n).fill(-1));

  for (const word of words) {
    for (let index = 0; index < m; index++) {
      const code = word[index].charCodeAt(0) - BASE_CODE;

      charCounts[index][code] += 1n;
    }
  }

  const getFormedCount = (wordIndex, targetIndex) => {
    if (targetIndex >= n) return 1n;
    if (wordIndex >= m || m - wordIndex < n - targetIndex) return 0n;
    if (dp[wordIndex][targetIndex] !== -1) return dp[wordIndex][targetIndex];
    const targetCode = target[targetIndex].charCodeAt(0) - BASE_CODE;
    const charCount = charCounts[wordIndex][targetCode];
    let result = getFormedCount(wordIndex + 1, targetIndex);

    if (charCount) {
      const count = charCount * getFormedCount(wordIndex + 1, targetIndex + 1);

      result = (result + count) % MODULO;
    }

    dp[wordIndex][targetIndex] = result;

    return result;
  };

  return Number(getFormedCount(0, 0));
};
