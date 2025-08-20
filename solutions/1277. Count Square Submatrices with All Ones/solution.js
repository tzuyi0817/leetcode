/**
 * @param {number[][]} matrix
 * @return {number}
 */
const countSquares = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let result = 0;

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      if (!matrix[row][col]) continue;

      const topCount = matrix[row - 1][col];
      const leftCount = matrix[row][col - 1];
      const cornerCount = matrix[row - 1][col - 1];

      matrix[row][col] += Math.min(topCount, leftCount, cornerCount);
    }
  }

  for (let row = 0; row < m; row++) {
    result += matrix[row].reduce((total, count) => total + count);
  }

  return result;
};
