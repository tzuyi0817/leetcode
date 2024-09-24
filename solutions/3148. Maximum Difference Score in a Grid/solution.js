/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxScore = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let dp = [];
  let result = Number.MIN_SAFE_INTEGER;

  for (let row = 0; row < m; row++) {
    const current = [];

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      let min = value;

      if (row > 0) {
        result = Math.max(result, value - dp[col]);
        min = Math.min(min, dp[col]);
      }
      if (col > 0) {
        result = Math.max(result, value - current[col - 1]);
        min = Math.min(min, current[col - 1]);
      }
      current.push(min);
    }
    dp = current;
  }
  return result;
};
