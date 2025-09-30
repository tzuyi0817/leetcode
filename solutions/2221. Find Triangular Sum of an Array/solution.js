/**
 * @param {number[]} nums
 * @return {number}
 */
const triangularSum = function (nums) {
  const n = nums.length;

  for (let operator = 1; operator < n; operator++) {
    for (let index = 0; index < n - operator; index++) {
      const sum = nums[index] + nums[index + 1];

      nums[index] = sum % 10;
    }
  }

  return nums[0];
};
