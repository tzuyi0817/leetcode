/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAscendingSum = function (nums) {
  const n = nums.length;
  let sum = nums[0];
  let result = nums[0];

  for (let index = 1; index < n; index++) {
    const prevNum = nums[index - 1];
    const num = nums[index];

    sum = num > prevNum ? sum + num : num;
    result = Math.max(sum, result);
  }
  return result;
};
