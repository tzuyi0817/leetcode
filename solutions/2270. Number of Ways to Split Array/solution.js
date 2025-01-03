/**
 * @param {number[]} nums
 * @return {number}
 */
const waysToSplitArray = function (nums) {
  const n = nums.length;
  let prefixSum = 0;
  let suffixSum = nums.reduce((sum, num) => sum + num);
  let result = 0;

  for (let index = 0; index < n - 1; index++) {
    const num = nums[index];

    prefixSum += num;
    suffixSum -= num;

    if (prefixSum >= suffixSum) result += 1;
  }
  return result;
};
