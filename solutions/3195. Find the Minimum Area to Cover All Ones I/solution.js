/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumArea = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let minRow = m - 1;
  let maxRow = 0;
  let minCol = n - 1;
  let maxCol = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;

      minRow = Math.min(row, minRow);
      maxRow = Math.max(row, maxRow);
      minCol = Math.min(col, minCol);
      maxCol = Math.max(col, maxCol);
    }
  }

  return (maxRow - minRow + 1) * (maxCol - minCol + 1);
};
