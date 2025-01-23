/**
 * @param {number[][]} grid
 * @return {number}
 */
const countServers = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const serversRow = Array.from({ length: m }, () => 0);
  const serversCol = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;

      serversRow[row] += 1;
      serversCol[col] += 1;
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;
      if (serversRow[row] > 1 || serversCol[col] > 1) {
        result += 1;
      }
    }
  }
  return result;
};
