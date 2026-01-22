/**
 * @param {string} s
 * @return {number}
 */
const deleteString = function (s) {
  const n = s.length;
  const lcp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  const dp = Array.from({ length: n }, () => 1);

  for (let a = n - 1; a >= 0; a--) {
    for (let b = n - 1; b > a; b--) {
      if (s[a] === s[b]) {
        lcp[a][b] = lcp[a + 1][b + 1] + 1;
      }

      if (lcp[a][b] >= b - a) {
        dp[a] = Math.max(dp[b] + 1, dp[a]);
      }
    }
  }

  return dp[0];
};
