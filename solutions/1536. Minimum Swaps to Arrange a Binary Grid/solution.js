/**
 * @param {number[][]} grid
 * @return {number}
 */
const minSwaps = function (grid) {
  const n = grid.length;
  const rows = grid.map(row => n - row.lastIndexOf(1) - 1);
  let result = 0;

  const findSwapRow = (row, needZeros) => {
    for (let index = row; index < n; index++) {
      if (rows[index] >= needZeros) {
        return index;
      }
    }

    return -1;
  };

  for (let row = 0; row < n - 1; row++) {
    const needZeros = n - row - 1;
    const swapRow = findSwapRow(row, needZeros);

    if (swapRow === -1) return -1;

    for (let index = swapRow; index > row; index--) {
      [rows[index - 1], rows[index]] = [rows[index], rows[index - 1]];
      result += 1;
    }
  }

  return result;
};
