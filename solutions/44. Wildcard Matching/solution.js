/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  const n = s.length;
  const m = p.length;
  const dp = Array(n + 1)
    .fill('')
    .map(_ => Array(m + 1).fill(false));

  dp[0][0] = true;

  for (let index = 0; index < m; index++) {
    if (p[index] !== '*') continue;
    dp[0][index + 1] = dp[0][index];
  }
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= m; b++) {
      const str = s[a - 1];
      const pattern = p[b - 1];

      if (pattern === '*') {
        dp[a][b] = dp[a - 1][b] || dp[a][b - 1];
        continue;
      }
      if (str !== pattern && pattern !== '?') continue;
      dp[a][b] = dp[a - 1][b - 1];
    }
  }
  return dp[n][m];
};
