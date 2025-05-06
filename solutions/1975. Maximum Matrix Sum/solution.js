/**
 * @param {number[][]} matrix
 * @return {number}
 */
const maxMatrixSum = function (matrix) {
  const n = matrix.length;
  let result = 0;
  let negative = 0;
  let min = Number.MAX_SAFE_INTEGER;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const value = matrix[row][col];

      if (value < 0) negative += 1;
      min = Math.min(Math.abs(value), min);
      result += Math.abs(value);
    }
  }
  const adjustment = negative % 2 ? min * 2 : 0;

  return result - adjustment;
};
