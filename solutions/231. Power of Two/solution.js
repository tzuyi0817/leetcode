/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfTwo = function (n) {
  return Number.isInteger(Math.log2(n));
};
