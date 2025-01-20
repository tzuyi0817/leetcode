/**
 * @param {number[]} arr
 * @param {number[][]} mat
 * @return {number}
 */
const firstCompleteIndex = function (arr, mat) {
  const m = mat.length;
  const n = mat[0].length;
  const rows = Array.from({ length: m }, () => 0);
  const cols = Array.from({ length: n }, () => 0);
  const matMap = new Map();

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = mat[row][col];

      matMap.set(value, { row, col });
    }
  }

  for (let index = 0; index < m * n; index++) {
    const value = arr[index];
    const { row, col } = matMap.get(value);

    rows[row] += 1;
    cols[col] += 1;

    if (rows[row] === n || cols[col] === m) return index;
  }
  return -1;
};
