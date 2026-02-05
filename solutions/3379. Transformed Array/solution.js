/**
 * @param {number[]} nums
 * @return {number[]}
 */
const constructTransformedArray = function (nums) {
  const n = nums.length;
  const result = [];

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const pos = (((index + num) % n) + n) % n;

    result.push(nums[pos]);
  }

  return result;
};
