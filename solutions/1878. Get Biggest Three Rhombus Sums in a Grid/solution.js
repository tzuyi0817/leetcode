/**
 * @param {number[][]} grid
 * @return {number[]}
 */
const getBiggestThree = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const maxLen = Math.floor(Math.max(m, n) / 2);
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;

  const getRhombusSum = (row, col, len) => {
    if (!len) return grid[row][col];

    if (row - len < 0 || row + len >= m || col - len < 0 || col + len >= n) return 0;

    const top = grid[row - len][col];
    const left = grid[row][col - len];
    const right = grid[row][col + len];
    const bottom = grid[row + len][col];

    let sum = top + left + right + bottom;

    for (let index = 1; index < len; index++) {
      const spreadL1 = grid[row - len + index][col - index];
      const spreadL2 = grid[row + len - index][col - index];
      const spreadR1 = grid[row - len + index][col + index];
      const spreadR2 = grid[row + len - index][col + index];

      sum += spreadL1 + spreadL2 + spreadR1 + spreadR2;
    }

    return sum;
  };

  for (let index = 0; index <= maxLen; index++) {
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        const sum = getRhombusSum(row, col, index);

        if (sum === sum1 || sum === sum2 || sum === sum3) continue;

        if (sum > sum1) {
          sum3 = sum2;
          sum2 = sum1;
          sum1 = sum;
        } else if (sum > sum2) {
          sum3 = sum2;
          sum2 = sum;
        } else if (sum > sum3) {
          sum3 = sum;
        }
      }
    }
  }

  if (sum3) return [sum1, sum2, sum3];

  if (sum2) return [sum1, sum2];

  return [sum1];
};
