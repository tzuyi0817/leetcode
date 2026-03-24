/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
const constructProductMatrix = function (grid) {
  const MODULO = 12345;
  const m = grid.length;
  const n = grid[0].length;
  const prefixProduct = Array.from({ length: m * n }, () => 1);
  const result = Array.from({ length: m }, () => new Array(n).fill(0));
  let suffixProduct = 1;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const pos = row * n + col;
      const prevProduct = prefixProduct[pos - 1] ?? 1;

      prefixProduct[pos] = (prevProduct * value) % MODULO;
    }
  }

  for (let row = m - 1; row >= 0; row--) {
    for (let col = n - 1; col >= 0; col--) {
      const value = grid[row][col];
      const pos = row * n + col;
      const prefix = prefixProduct[pos - 1] ?? 1;

      result[row][col] = (prefix * suffixProduct) % MODULO;
      suffixProduct = (suffixProduct * value) % MODULO;
    }
  }

  return result;
};
