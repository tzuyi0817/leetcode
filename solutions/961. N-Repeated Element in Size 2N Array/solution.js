/**
 * @param {number[]} nums
 * @return {number}
 */
const repeatedNTimes = function (nums) {
  const n = nums.length;

  for (let index = 2; index < n; index++) {
    const num = nums[index];

    if (num === nums[index - 1] || num === nums[index - 2]) {
      return num;
    }
  }

  return nums[n - 1];
};
