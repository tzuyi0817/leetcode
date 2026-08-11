/**
 * @param {number[]} nums
 * @return {number}
 */
const missingInteger = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const numSet = new Set(nums);
  let prefixSum = nums[0];
  let index = 1;

  while (index < n && nums[index] - nums[index - 1] === 1) {
    prefixSum += nums[index];
    index += 1;
  }

  for (let num = prefixSum; num < maxNum; num++) {
    if (!numSet.has(num)) return num;
  }

  return Math.max(maxNum + 1, prefixSum);
};
