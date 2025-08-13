/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfThree = function (n) {
  if (n === 1) return true;
  if (n <= 0) return false;
  const num = n / 3;

  if (num % 1 !== 0) return false;

  return isPowerOfThree(num);
};
