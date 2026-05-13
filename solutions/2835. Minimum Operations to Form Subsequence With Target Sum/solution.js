/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const minOperations = function (nums, target) {
  const BIT_MAX = 31;
  const counts = Array.from({ length: BIT_MAX }, () => 0);
  let minMissingBit = BIT_MAX;
  let result = 0;

  for (const num of nums) {
    const bit = Math.log2(num);

    counts[bit] += 1;
  }

  for (let bit = 0; bit < BIT_MAX; bit++) {
    if ((target >> bit) & 1) {
      if (counts[bit]) {
        counts[bit] -= 1;
      } else {
        minMissingBit = Math.min(bit, minMissingBit);
      }
    }

    if (minMissingBit !== BIT_MAX && counts[bit]) {
      counts[bit] -= 1;
      result += bit - minMissingBit;
      minMissingBit = BIT_MAX;
    }

    counts[bit + 1] += Math.floor(counts[bit] / 2);
  }

  return minMissingBit === BIT_MAX ? result : -1;
};
