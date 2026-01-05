/**
 * @param {number[][]} matrix
 * @return {number}
 */
const maxMatrixSum = function (matrix) {
  const n = matrix.length;
  let sum = 0;
  let minValue = Number.MAX_SAFE_INTEGER;
  let negativeCount = 0;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (matrix[row][col] < 0) {
        negativeCount += 1;
      }

      const value = Math.abs(matrix[row][col]);

      sum += value;
      minValue = Math.min(value, minValue);
    }
  }

  return negativeCount % 2 ? sum - minValue * 2 : sum;
};
