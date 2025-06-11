/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const longestPalindrome = function (word1, word2) {
  const m = word1.length;
  const word = `${word1}${word2}`;
  const n = word.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));
  let result = 0;

  for (let index = 0; index < n; index++) {
    dp[index][index] = 1;
  }

  for (let length = 2; length <= n; length++) {
    for (let start = 0; start + length - 1 < n; start++) {
      const end = start + length - 1;

      if (word[start] === word[end]) {
        dp[start][end] = dp[start + 1][end - 1] + 2;

        if (start < m && end >= m) {
          result = Math.max(dp[start][end], result);
        }
      } else {
        dp[start][end] = Math.max(dp[start + 1][end], dp[start][end - 1]);
      }
    }
  }

  return result;
};
