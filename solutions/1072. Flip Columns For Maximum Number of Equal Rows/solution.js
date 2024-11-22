/**
 * @param {number[][]} matrix
 * @return {number}
 */
const maxEqualRowsAfterFlips = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const rowMap = new Map();
  let result = 0;

  for (let row = 0; row < m; row++) {
    const isFlip = matrix[row][0];
    let current = '';

    for (let col = 0; col < n; col++) {
      const value = matrix[row][col];
      const flipValue = isFlip ? value ^ 1 : value;

      current += `${flipValue}`;
    }
    const sameRowCount = rowMap.get(current) ?? 0;

    rowMap.set(current, sameRowCount + 1);
    result = Math.max(sameRowCount + 1, result);
  }
  return result;
};
