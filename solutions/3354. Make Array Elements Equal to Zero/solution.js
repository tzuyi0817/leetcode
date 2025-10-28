/**
 * @param {number[]} nums
 * @return {number}
 */
const countValidSelections = function (nums) {
  const n = nums.length;
  let prefixSum = 0;
  let suffixSum = nums.reduce((sum, num) => sum + num);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    prefixSum += num;
    suffixSum -= num;

    if (num) continue;
    if (prefixSum === suffixSum) {
      result += 2;
    }

    if (Math.abs(prefixSum - suffixSum) === 1) {
      result += 1;
    }
  }

  return result;
};
