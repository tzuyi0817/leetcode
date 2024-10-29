/**
 * @param {number[][]} grid
 * @return {number}
 */
const cherryPickup = function (grid) {
  const n = grid.length;
  const dp = new Array(n).fill('').map(_ => new Array(n).fill('').map(_ => new Array(n).fill(-1)));

  const cherryPick = (row1, col1, row2) => {
    const col2 = row1 + col1 - row2;

    if (row1 >= n || col1 >= n || row2 >= n || col2 >= n) return Number.MIN_SAFE_INTEGER;
    if (grid[row1][col1] === -1 || grid[row2][col2] === -1) return Number.MIN_SAFE_INTEGER;
    if (row1 === n - 1 && col1 === n - 1) return grid[row1][col1];
    if (dp[row1][col1][row2] !== -1) return dp[row1][col1][row2];

    let result = grid[row1][col1];

    if (row1 !== row2) result += grid[row2][col2];

    result += Math.max(
      cherryPick(row1 + 1, col1, row2),
      cherryPick(row1 + 1, col1, row2 + 1),
      cherryPick(row1, col1 + 1, row2),
      cherryPick(row1, col1 + 1, row2 + 1),
    );
    return (dp[row1][col1][row2] = result);
  };

  return Math.max(cherryPick(0, 0, 0), 0);
};
