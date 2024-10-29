/**
 * @param {number[][]} grid
 * @param {number[][]} hits
 * @return {number[]}
 */
const hitBricks = function (grid, hits) {
  const m = grid.length;
  const n = grid[0].length;

  for (const [row, col] of hits) {
    grid[row][col] -= 1;
  }
  const bricks = new Set();
  const checkGrid = (row, col) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return;
    const key = row * n + col;

    if (bricks.has(key) || grid[row][col] !== 1) return;
    bricks.add(key);
    checkGrid(row - 1, col);
    checkGrid(row + 1, col);
    checkGrid(row, col - 1);
    checkGrid(row, col + 1);
  };

  for (let col = 0; col < n; col++) {
    checkGrid(0, col);
  }
  const result = Array.from({ length: hits.length }).fill(0);

  for (let index = hits.length - 1; index >= 0; index--) {
    const [row, col] = hits[index];

    grid[row][col] += 1;

    if (grid[row][col] !== 1) continue;
    const top = row - 1 >= 0 && bricks.has((row - 1) * n + col);
    const bottom = row + 1 < m && bricks.has((row + 1) * n + col);
    const left = col - 1 >= 0 && bricks.has(row * n + col - 1);
    const right = col + 1 < n && bricks.has(row * n + col + 1);

    if (!top && !bottom && !left && !right && row) continue;
    const previousCount = bricks.size;

    checkGrid(row, col);
    result[index] = bricks.size - previousCount - 1;
  }
  return result;
};
