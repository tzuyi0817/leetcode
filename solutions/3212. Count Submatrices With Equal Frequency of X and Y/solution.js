/**
 * @param {character[][]} grid
 * @return {number}
 */
const numberOfSubmatrices = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let prevRowX = Array.from({ length: n }, () => 0);
  let prevRowY = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let row = 0; row < m; row++) {
    const currentRowX = new Array(n).fill(0);
    const currentRowY = new Array(n).fill(0);

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const topX = prevRowX[col];
      const leftX = currentRowX[col - 1] ?? 0;
      const cornerX = prevRowX[col - 1] ?? 0;
      const topY = prevRowY[col];
      const leftY = currentRowY[col - 1] ?? 0;
      const cornerY = prevRowY[col - 1] ?? 0;

      currentRowX[col] = topX + leftX - cornerX + (value === 'X' ? 1 : 0);
      currentRowY[col] = topY + leftY - cornerY + (value === 'Y' ? 1 : 0);

      if (currentRowX[col] && currentRowX[col] === currentRowY[col]) {
        result += 1;
      }
    }

    prevRowX = currentRowX;
    prevRowY = currentRowY;
  }

  return result;
};
