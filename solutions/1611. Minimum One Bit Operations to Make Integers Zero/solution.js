/**
 * @param {number} n
 * @return {number}
 */
const minimumOneBitOperations = function (n) {
  if (n <= 1) return n;
  let bit = 0;

  while (1 << bit <= n) {
    bit += 1;
  }

  // operations = (2 ** (n - 1)) - 1
  return (1 << bit) - 1 - minimumOneBitOperations(n - (1 << (bit - 1)));
};
