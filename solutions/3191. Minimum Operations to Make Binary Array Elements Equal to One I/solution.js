/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function (nums) {
  const n = nums.length;
  let result = 0;

  for (let index = 0; index < n - 2; index++) {
    if (nums[index]) continue;

    nums[index + 1] ^= 1;
    nums[index + 2] ^= 1;
    result += 1;
  }

  return !nums[n - 2] || !nums[n - 1] ? -1 : result;
};
