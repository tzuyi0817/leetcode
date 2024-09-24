/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
const kthLargestValue = function (matrix, k) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = Array(m + 1)
    .fill('')
    .map(_ => Array(n + 1).fill(0));
  const result = [];

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      dp[row][col] = dp[row - 1][col] ^ dp[row][col - 1] ^ dp[row - 1][col - 1] ^ matrix[row - 1][col - 1];

      result.push(dp[row][col]);
    }
  }
  result.sort((a, b) => b - a);
  return result[k - 1];
};
