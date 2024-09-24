/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const findIsland = (row, col) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return;
    if (grid[row][col] !== '1') return;
    grid[row][col] = '#';
    findIsland(row - 1, col);
    findIsland(row + 1, col);
    findIsland(row, col - 1);
    findIsland(row, col + 1);
  };
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] !== '1') continue;
      findIsland(row, col);
      result += 1;
    }
  }
  return result;
};
