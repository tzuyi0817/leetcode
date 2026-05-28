/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxSum = function (nums, k) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const maxBit = Math.ceil(Math.log2(maxNum));
  const operatedNums = Array.from({ length: n }, () => 0);
  const bitIndices = Array.from({ length: maxBit + 1 }, () => 0);
  let result = 0n;

  for (const num of nums) {
    for (let bit = 0; bit <= maxBit; bit++) {
      if ((num >> bit) & 1) {
        const index = bitIndices[bit];

        operatedNums[index] |= 1 << bit;
        bitIndices[bit] += 1;
      }
    }
  }

  for (let index = 0; index < k; index++) {
    const num = BigInt(operatedNums[index]);

    result = (result + num * num) % MODULO;
  }

  return Number(result);
};
