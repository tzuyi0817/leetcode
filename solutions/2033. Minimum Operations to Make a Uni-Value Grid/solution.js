/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
const minOperations = function (grid, x) {
  const m = grid.length;
  const n = grid[0].length;
  const values = grid.flat();

  if (values.some(value => (values[0] - value) % x)) return -1;

  values.sort((a, b) => a - b);

  const middleValue = values[Math.floor((m * n) / 2)];

  return values.reduce((result, value) => {
    return result + Math.abs(middleValue - value) / x;
  }, 0);
};
