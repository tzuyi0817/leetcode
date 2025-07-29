/**
 * @param {number[]} nums
 * @return {number[]}
 */
const smallestSubarrays = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const bits = Math.ceil(Math.log2(maxNum));
  const closest = Array.from({ length: bits + 1 }, () => 0);
  const result = Array.from({ length: n }, () => 1);

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    for (let bit = 0; bit <= bits; bit++) {
      if ((num >> bit) & 1) {
        closest[bit] = index;
      }

      result[index] = Math.max(closest[bit] - index + 1, result[index]);
    }
  }

  return result;
};
