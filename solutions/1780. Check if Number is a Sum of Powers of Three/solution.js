/**
 * @param {number} n
 * @return {boolean}
 */
var checkPowersOfThree = function (n) {
  if (n <= 1) return true;
  const baseLog = Math.floor(Math.log(n) / Math.log(3));
  const power = Math.pow(3, baseLog);
  const nextN = n - power;

  if (nextN >= power) return false;

  return checkPowersOfThree(nextN);
};
