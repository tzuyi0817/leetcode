/**
 * @param {character[][]} grid
 * @return {boolean}
 */
const containsCycle = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = new Set();
  const isCycle = (row, col, preRow, preCol, value) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return false;
    const current = grid[row][col];
    if (current !== value) return false;
    if (visited.has(`${row}_${col}`)) return true;
    visited.add(`${row}_${col}`);

    for (const move of [1, -1]) {
      const moveRow = row + move;
      const moveCol = col + move;

      if (moveRow !== preRow && isCycle(moveRow, col, row, col, value)) return true;
      if (moveCol !== preCol && isCycle(row, moveCol, row, col, value)) return true;
    }
    return false;
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (visited.has(`${row}_${col}`)) continue;
      const value = grid[row][col];

      if (isCycle(row, col, -1, -1, value)) return true;
    }
  }
  return false;
};
