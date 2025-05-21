/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const isFirstRowZero = matrix[0].includes(0);
  const isFirstColZero = matrix.some(row => row[0] === 0);

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      if (matrix[row][col]) continue;

      matrix[row][0] = 0;
      matrix[0][col] = 0;
    }
  }

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  if (isFirstRowZero) {
    for (let col = 0; col < n; col++) {
      matrix[0][col] = 0;
    }
  }

  if (isFirstColZero) {
    for (let row = 0; row < m; row++) {
      matrix[row][0] = 0;
    }
  }
};
