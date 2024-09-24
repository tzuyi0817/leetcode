/**
 * @param {number} n
 * @return {number}
 */
const concatenatedBinary = function (n) {
  const MODULO = 10 ** 9 + 7;
  let result = 0;

  for (let value = 1; value <= n; value++) {
    result *= 1 << value.toString(2).length;
    result = (result + value) % MODULO;
  }
  return result;
};
