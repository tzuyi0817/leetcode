/**
 * @param {number} n
 * @return {number}
 */
const countCommas = function (n) {
  const BASE = 1000;
  let current = BASE;
  let result = 0;

  while (current <= n) {
    result += n - current + 1;
    current *= BASE;
  }

  return result;
};
