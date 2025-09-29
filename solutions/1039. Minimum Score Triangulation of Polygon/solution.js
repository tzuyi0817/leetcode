/**
 * @param {number[]} values
 * @return {number}
 */
const minScoreTriangulation = function (values) {
  const n = values.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let a = 2; a < n; a++) {
    for (let b = a - 2; b >= 0; b--) {
      dp[a][b] = Number.MAX_SAFE_INTEGER;

      for (let c = b + 1; c < a; c++) {
        const score = dp[a][c] + values[a] * values[b] * values[c] + dp[c][b];

        dp[a][b] = Math.min(score, dp[a][b]);
      }
    }
  }

  return dp[n - 1][0];
};
