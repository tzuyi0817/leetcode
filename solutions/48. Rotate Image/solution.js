/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  const n = matrix.length;

  matrix.reverse();

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < row; col++) {
      [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
    }
  }
};
