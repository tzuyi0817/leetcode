/**
 * @param {number} n
 * @return {number}
 */
const countCommas = function (n) {
  const NO_COMMAS_COUNT = 999;

  return Math.max(n - NO_COMMAS_COUNT, 0);
};
