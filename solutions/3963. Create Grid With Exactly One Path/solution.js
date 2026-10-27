/**
 * @param {number} m
 * @param {number} n
 * @return {string[]}
 */
const createGrid = function (m, n) {
  const grid = Array.from({ length: m }, () => new Array(n).fill('#'));

  for (let row = 0; row < m; row++) {
    grid[row][0] = '.';
  }

  for (let col = 0; col < n; col++) {
    grid[m - 1][col] = '.';
  }

  return grid.map(row => row.join(''));
};
