/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOperations = function (nums, k) {
  const xor = nums.reduce((result, num) => result ^ num);
  let xorBinaryBits = xor.toString(2);
  let kBinaryBits = k.toString(2);
  const maxSize = Math.max(xorBinaryBits.length, kBinaryBits.length);
  let result = 0;

  xorBinaryBits = xorBinaryBits.padStart(maxSize, '0');
  kBinaryBits = kBinaryBits.padStart(maxSize, '0');

  for (let index = 0; index < maxSize; index++) {
    if (xorBinaryBits[index] !== kBinaryBits[index]) result += 1;
  }
  return result;
};
