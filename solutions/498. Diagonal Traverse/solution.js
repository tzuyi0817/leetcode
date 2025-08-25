/**
 * @param {number[][]} mat
 * @return {number[]}
 */
const findDiagonalOrder = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const result = [];
  let row = 0;
  let col = 0;
  let direction = 1;

  for (let index = 0; index < m * n; index++) {
    let nextRow = row - direction;
    let nextCol = col + direction;

    if (nextCol < 0) {
      nextCol = nextRow > m - 1 ? 1 : 0;
      nextRow = Math.min(m - 1, nextRow);
      direction *= -1;
    } else if (nextCol >= n) {
      nextCol = n - 1;
      nextRow = row + 1;
      direction *= -1;
    } else if (nextRow < 0) {
      nextRow = 0;
      direction *= -1;
    } else if (nextRow >= m) {
      nextRow = m - 1;
      nextCol = col + 1;
      direction *= -1;
    }

    result[index] = mat[row][col];
    row = nextRow;
    col = nextCol;
  }

  return result;
};
