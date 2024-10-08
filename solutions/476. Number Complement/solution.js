/**
 * @param {number} num
 * @return {number}
 */
const findComplement = function (num) {
  const binary = num.toString(2);
  const bitMask = (1 << binary.length) - 1;

  return num ^ bitMask;
};
