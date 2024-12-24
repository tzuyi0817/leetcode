/**
 * @param {string} s
 * @return {number}
 */
const minInsertions = function (s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let index = 0; index < n; index++) {
    dp[index][index] = 1;
  }

  for (let length = 2; length <= n; length++) {
    for (let start = 0; start + length - 1 < n; start++) {
      const end = start + length - 1;

      if (s[start] === s[end]) {
        dp[start][end] = 2 + dp[start + 1][end - 1];
      } else {
        dp[start][end] = Math.max(dp[start + 1][end], dp[start][end - 1]);
      }
    }
  }
  return n - dp[0][n - 1];
};
