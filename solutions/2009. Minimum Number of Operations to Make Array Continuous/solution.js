/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function (nums) {
  const n = nums.length;
  const uniqueNums = [...new Set(nums)];
  let left = 0;

  uniqueNums.sort((a, b) => a - b);

  for (let index = 0; index < uniqueNums.length; index++) {
    if (uniqueNums[index] - uniqueNums[left] > n - 1) {
      left += 1;
    }
  }

  return n - (uniqueNums.length - left);
};
