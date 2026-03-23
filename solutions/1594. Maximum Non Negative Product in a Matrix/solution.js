/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxProductPath = function (grid) {
  const MODULO = 10 ** 9 + 7;
  const m = grid.length;
  const n = grid[0].length;
  let prevMax = Array.from({ length: n + 1 }, () => 1);
  let prevMin = Array.from({ length: n + 1 }, () => 1);

  for (let row = 0; row < m; row++) {
    const currentMax = new Array(n + 1).fill(1);
    const currentMin = new Array(n + 1).fill(1);

    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const upMax = prevMax[col + 1] * value;
      const upMin = prevMin[col + 1] * value;
      const leftMax = currentMax[col] * value;
      const leftMin = currentMin[col] * value;
      const candidates = [];

      if (row === 0 && col === 0) {
        candidates.push(value);
      } else if (row === 0) {
        candidates.push(leftMax, leftMin);
      } else if (col === 0) {
        candidates.push(upMax, upMin);
      } else {
        candidates.push(upMax, upMin, leftMax, leftMin);
      }

      currentMax[col + 1] = Math.max(...candidates);
      currentMin[col + 1] = Math.min(...candidates);
    }

    prevMax = currentMax;
    prevMin = currentMin;
  }

  return Math.max(prevMax[n], -1) % MODULO;
};
