/**
 * @param {number[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = function (matrix) {
  const MIN_VALUE = Number.MIN_SAFE_INTEGER;
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = new Array(m).fill('').map(_ => new Array(n).fill(MIN_VALUE));
  const dfsPath = (row, col, previous = MIN_VALUE, step = 0) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return step;
    const value = matrix[row][col];

    if (previous >= value) return step;
    if (dp[row][col] > MIN_VALUE) return dp[row][col] + step;
    const left = dfsPath(row, col - 1, value, step + 1);
    const right = dfsPath(row, col + 1, value, step + 1);
    const up = dfsPath(row - 1, col, value, step + 1);
    const down = dfsPath(row + 1, col, value, step + 1);
    const maxStep = Math.max(left, right, up, down);

    dp[row][col] = maxStep - step;
    return maxStep;
  };
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const step = dfsPath(row, col);

      result = Math.max(step, result);
    }
  }
  return result;
};
