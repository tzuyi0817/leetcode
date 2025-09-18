/**
 * @param {number[][]} grid
 * @return {number}
 */
const countPyramids = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const getPyramidCount = (inverse = false) => {
    const land = inverse ? grid.reverse().map(row => row.reverse()) : grid;
    const dp = land.map(row => [...row]);
    let result = 0;

    for (let row = m - 2; row >= 0; row--) {
      for (let col = 1; col + 1 < n; col++) {
        if (dp[row][col] !== 1) continue;

        const leftLower = dp[row + 1][col - 1];
        const lower = dp[row + 1][col];
        const rightLower = dp[row + 1][col + 1];

        dp[row][col] = Math.min(leftLower, lower, rightLower) + 1;
        result += dp[row][col] - 1;
      }
    }

    return result;
  };

  return getPyramidCount() + getPyramidCount(true);
};
