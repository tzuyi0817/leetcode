/**
 * @param {number[][]} grid
 * @return {number}
 */
const minSwaps = function (grid) {
  const n = grid.length;
  const zeroSuffixCounts = grid.map(row => n - row.lastIndexOf(1) - 1);
  let result = 0;

  for (let row = 0; row < n; row++) {
    const targetZeroSuffixCounts = n - row - 1;
    let swapRow = row;

    while (swapRow < n && zeroSuffixCounts[swapRow] < targetZeroSuffixCounts) swapRow += 1;
    if (swapRow === n) return -1;
    for (let currentRow = swapRow; currentRow > row; currentRow--) {
      [zeroSuffixCounts[currentRow], zeroSuffixCounts[currentRow - 1]] = [
        zeroSuffixCounts[currentRow - 1],
        zeroSuffixCounts[currentRow],
      ];
      result += 1;
    }
  }
  return result;
};
