/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
const sortMatrix = function (grid) {
  const n = grid.length;
  const matrixMap = new Map();

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const pos = row - col;

      if (!matrixMap.has(pos)) {
        matrixMap.set(pos, []);
      }

      matrixMap.get(pos).push(grid[row][col]);
    }
  }

  for (const [pos, values] of matrixMap) {
    values.sort((a, b) => (pos >= 0 ? a - b : b - a));
  }

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const pos = row - col;
      const values = matrixMap.get(pos);

      grid[row][col] = values.pop();
    }
  }

  return grid;
};
