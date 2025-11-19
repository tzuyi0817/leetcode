/**
 * @param {number[]} nums
 * @param {number} maximumBit
 * @return {number[]}
 */
const getMaximumXor = function (nums, maximumBit) {
  const max = (1 << maximumBit) - 1;
  let current = 0;

  return nums
    .map(num => {
      current ^= num;
      return max ^ current;
    })
    .toReversed();
};
