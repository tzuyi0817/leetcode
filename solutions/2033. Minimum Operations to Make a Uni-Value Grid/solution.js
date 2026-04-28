/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
const minOperations = function (grid, x) {
  const values = grid.flat();

  if (values.some(value => (value - values[0]) % x)) return -1;

  const middle = Math.floor(values.length / 2);
  let result = 0;

  values.sort((a, b) => a - b);

  for (const value of values) {
    const diff = Math.abs(value - values[middle]);

    result += diff / x;
  }

  return result;
};
