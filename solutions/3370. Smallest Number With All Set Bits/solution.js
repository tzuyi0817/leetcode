/**
 * @param {number} n
 * @return {number}
 */
const smallestNumber = function (n) {
  const bits = Math.floor(Math.log2(n)) + 1;

  return (1 << bits) - 1;
};
