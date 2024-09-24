/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
const countSubIslands = function (grid1, grid2) {
  const m = grid1.length;
  const n = grid1[0].length;
  const isSubIsland = (row, col) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return true;
    const cell = grid2[row][col];

    if (cell === 0 || cell === 'x') return true;
    if (cell !== grid1[row][col]) return false;
    grid2[row][col] = 'x';
    const top = isSubIsland(row - 1, col);
    const bottom = isSubIsland(row + 1, col);
    const left = isSubIsland(row, col - 1);
    const right = isSubIsland(row, col + 1);

    return top && bottom && left && right;
  };
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid2[row][col] !== 1 || !isSubIsland(row, col)) continue;
      result += 1;
    }
  }
  return result;
};
