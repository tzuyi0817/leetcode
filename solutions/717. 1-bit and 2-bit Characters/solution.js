/**
 * @param {number[]} bits
 * @return {boolean}
 */
const isOneBitCharacter = function (bits) {
  const n = bits.length;
  let index = 0;

  while (index < n - 1) {
    index += bits[index] ? 2 : 1;
  }

  return bits[index] === 0;
};
