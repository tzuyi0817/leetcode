/**
 * @param {number[][]} grid
 * @return {boolean}
 */
const canPartitionGrid = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const valueMap = new Map();
  const rowSum = Array.from({ length: m }, () => 0);
  const colSum = Array.from({ length: n }, () => 0);
  let topSum = 0;
  let leftSum = 0;
  let totalSum = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      totalSum += value;
      rowSum[row] += value;
      colSum[col] += value;

      if (valueMap.has(value)) {
        const range = valueMap.get(value);

        range.minRow = Math.min(row, range.minRow);
        range.maxRow = Math.max(row, range.maxRow);
        range.minCol = Math.min(col, range.minCol);
        range.maxCol = Math.max(col, range.maxCol);
      } else {
        valueMap.set(value, {
          minRow: row,
          maxRow: row,
          minCol: col,
          maxCol: col,
        });
      }
    }
  }

  const isConnected = (row1, col1, row2, col2, value) => {
    if (!valueMap.has(value)) return false;

    const { minRow, maxRow, minCol, maxCol } = valueMap.get(value);
    const rows = row2 - row1 + 1;
    const cols = col2 - col1 + 1;

    if (rows === 1 || cols === 1) {
      return grid[row1][col1] === value || grid[row2][col2] === value;
    }

    return minRow <= row2 && maxRow >= row1 && minCol <= col2 && maxCol >= col1;
  };

  for (let row = 0; row < m; row++) {
    topSum += rowSum[row];

    const bottomSum = totalSum - topSum;

    if (topSum === bottomSum) return true;

    if (isConnected(0, 0, row, n - 1, topSum - bottomSum)) return true;

    if (isConnected(row + 1, 0, m - 1, n - 1, bottomSum - topSum)) return true;
  }

  for (let col = 0; col < n; col++) {
    leftSum += colSum[col];

    const rightSum = totalSum - leftSum;

    if (leftSum === rightSum) return true;

    if (isConnected(0, 0, m - 1, col, leftSum - rightSum)) return true;

    if (isConnected(0, col + 1, m - 1, n - 1, rightSum - leftSum)) return true;
  }

  return false;
};
