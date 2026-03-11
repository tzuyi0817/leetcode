/**
 * @param {number} n
 * @return {number}
 */
const bitwiseComplement = function (n) {
  if (n === 0) return 1;

  const bits = Math.floor(Math.log2(n)) + 1;
  const mask = (1 << bits) - 1;

  return n ^ mask;
};
