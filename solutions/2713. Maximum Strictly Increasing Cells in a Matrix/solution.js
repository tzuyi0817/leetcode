/**
 * @param {number[][]} mat
 * @return {number}
 */
const maxIncreasingCells = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const valueMap = new Map();
  const valueSet = new Set();
  const rows = Array.from({ length: m }, () => 0);
  const cols = Array.from({ length: n }, () => 0);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = mat[row][col];

      if (!valueMap.has(value)) {
        valueMap.set(value, []);
      }

      valueMap.get(value).push({ row, col });
      valueSet.add(value);
    }
  }

  const values = [...valueSet].toSorted((a, b) => b - a);
  const currentMaxPaths = [];

  for (const value of values) {
    const positions = valueMap.get(value);

    for (const [index, { row, col }] of positions.entries()) {
      currentMaxPaths[index] = Math.max(rows[row], cols[col]) + 1;
    }

    for (const [index, { row, col }] of positions.entries()) {
      const paths = currentMaxPaths[index];

      rows[row] = Math.max(rows[row], paths);
      cols[col] = Math.max(cols[col], paths);
    }
  }

  return Math.max(...rows, ...cols);
};
