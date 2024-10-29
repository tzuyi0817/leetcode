/**
 * @param {number[]} rowSum
 * @param {number[]} colSum
 * @return {number[][]}
 */
const restoreMatrix = function (rowSum, colSum) {
  const m = rowSum.length;
  const n = colSum.length;
  const result = new Array(m).fill('').map(_ => new Array(n));

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = Math.min(rowSum[row], colSum[col]);

      result[row][col] = value;
      rowSum[row] -= value;
      colSum[col] -= value;
    }
  }
  return result;
};
