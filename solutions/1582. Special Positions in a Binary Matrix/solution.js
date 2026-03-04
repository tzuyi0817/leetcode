/**
 * @param {number[][]} mat
 * @return {number}
 */
const numSpecial = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const rows = Array.from({ length: m }, () => 0);
  const cols = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = mat[row][col];

      rows[row] += value;
      cols[col] += value;
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = mat[row][col];

      if (value === 1 && rows[row] === 1 && cols[col] === 1) {
        result += 1;
      }
    }
  }

  return result;
};
