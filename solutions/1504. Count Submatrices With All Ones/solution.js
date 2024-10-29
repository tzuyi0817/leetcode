/**
 * @param {number[][]} mat
 * @return {number}
 */
const numSubmat = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const dp = new Array(m + 1).fill('').map(_ => new Array(n + 1).fill(0));
  let result = 0;

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      const value = mat[row - 1][col - 1];

      dp[row][col] = value ? dp[row][col - 1] + value : 0;
    }
  }

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      if (!dp[row][col]) continue;
      let minW = dp[row][col];

      for (let k = row; k >= 0; k--) {
        if (!dp[k][col]) break;
        minW = Math.min(minW, dp[k][col]);
        result += minW;
      }
    }
  }
  return result;
};
