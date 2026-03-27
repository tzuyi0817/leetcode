/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {boolean}
 */
const areSimilar = function (mat, k) {
  const m = mat.length;
  const n = mat[0].length;

  for (let row = 0; row < m; row++) {
    const isOddRow = row % 2;

    for (let col = 0; col < n; col++) {
      const value = mat[row][col];
      const shiftCol = isOddRow ? (col + k) % n : (col - (k % n) + n) % n;

      if (value !== mat[row][shiftCol]) return false;
    }
  }

  return true;
};
