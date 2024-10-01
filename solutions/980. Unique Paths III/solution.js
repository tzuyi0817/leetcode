/**
 * @param {number[][]} grid
 * @return {number}
 */
const uniquePathsIII = function (grid) {
  const START = 1;
  const END = 2;
  const OBSTACLE = -1;
  const m = grid.length;
  const n = grid[0].length;
  const totalCell = m * n;
  const startPoint = { row: -1, col: -1 };
  let obstacles = 0;

  const walkGrid = (row, col, step) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return 0;
    const value = grid[row][col];

    if (value === END) {
      return step === totalCell - obstacles ? 1 : 0;
    }
    if (value === '.' || value === OBSTACLE) return 0;

    const nextStep = step + 1;

    grid[row][col] = '.';

    const left = walkGrid(row, col - 1, nextStep);
    const right = walkGrid(row, col + 1, nextStep);
    const up = walkGrid(row - 1, col, nextStep);
    const down = walkGrid(row + 1, col, nextStep);

    grid[row][col] = value;

    return left + right + up + down;
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (value === OBSTACLE) {
        obstacles += 1;
      }
      if (value === START) {
        startPoint.row = row;
        startPoint.col = col;
      }
    }
  }
  return walkGrid(startPoint.row, startPoint.col, 1);
};
