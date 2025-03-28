/**
 * @param {number[][]} grid
 * @return {number}
 */
const minDays = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dfsGrid = (row, col, visited) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return;
    if (visited[row][col]) return;
    const cell = grid[row][col];

    if (cell === 0) return;

    visited[row][col] = true;
    dfsGrid(row - 1, col, visited);
    dfsGrid(row + 1, col, visited);
    dfsGrid(row, col - 1, visited);
    dfsGrid(row, col + 1, visited);
  };

  const isDisconnected = () => {
    const visited = new Array(m).fill('').map(() => new Array(n).fill(false));
    let islands = 0;

    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        const cell = grid[row][col];

        if (cell === 0 || visited[row][col]) continue;

        islands += 1;

        if (islands > 1) return true;

        dfsGrid(row, col, visited);
      }
    }

    return islands !== 1;
  };

  if (isDisconnected()) return 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === 0) continue;

      grid[row][col] = 0;

      if (isDisconnected()) return 1;

      grid[row][col] = 1;
    }
  }

  return 2;
};
