/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
const shiftGrid = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const result = Array.from({ length: m }, () => new Array(n));

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const nextCol = col + k;
      const nextRow = Math.floor(nextCol / n) + row;

      result[nextRow % m][nextCol % n] = value;
    }
  }

  return result;
};
