/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfFour = function (n) {
  if (n === 0) return false;
  if (n === 1) return true;
  if (n % 4 !== 0) return false;

  return isPowerOfFour(n / 4);
};
