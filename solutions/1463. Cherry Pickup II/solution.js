/**
 * @param {number[][]} grid
 * @return {number}
 */
const cherryPickup = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n).fill('').map(_ => new Array(n).fill(-1));
  });

  const collectCherry = (row, col1, col2) => {
    if (row >= m || col1 < 0 || col1 >= n || col2 < 0 || col2 >= n) return 0;
    if (dp[row][col1][col2] !== -1) return dp[row][col1][col2];
    const robot1 = grid[row][col1];
    const robot2 = grid[row][col2];
    const cherries = col1 === col2 ? robot1 : robot1 + robot2;
    let result = cherries;

    for (let moveCol1 = -1; moveCol1 <= 1; moveCol1++) {
      const nextCol1 = col1 + moveCol1;

      for (let moveCol2 = -1; moveCol2 <= 1; moveCol2++) {
        const nextCol2 = col2 + moveCol2;
        const nextCherries = collectCherry(row + 1, nextCol1, nextCol2);

        result = Math.max(cherries + nextCherries, result);
      }
    }

    dp[row][col1][col2] = result;

    return result;
  };

  return collectCherry(0, 0, n - 1);
};
