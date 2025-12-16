/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} prices
 * @return {number}
 */
const sellingWood = function (m, n, prices) {
  const dp = Array.from({ length: m + 1 }, () => {
    return new Array(n + 1).fill(0);
  });

  for (const [h, w, price] of prices) {
    dp[h][w] = price;
  }

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      for (let h = 1; h <= row / 2; h++) {
        dp[row][col] = Math.max(dp[row - h][col] + dp[h][col], dp[row][col]);
      }

      for (let w = 1; w <= col / 2; w++) {
        dp[row][col] = Math.max(dp[row][col - w] + dp[row][w], dp[row][col]);
      }
    }
  }

  return dp[m][n];
};
