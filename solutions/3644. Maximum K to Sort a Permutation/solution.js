/**
 * @param {number[]} nums
 * @return {number}
 */
const sortPermutation = function (nums) {
  const n = nums.length;
  const maxBit = 32 - Math.clz32(n - 1);
  const maxMask = (1 << maxBit) - 1;
  let mask = maxMask;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num === index) continue;

    mask &= num;
  }

  return mask === maxMask ? 0 : mask;
};
