/**
 * @param {number} n
 * @return {number}
 */
const reverseBits = function (n) {
  let result = 0;

  for (let index = 0; index < 32; index++) {
    result <<= 1;
    result |= n % 2;
    n >>= 1;
  }

  return result;
};
