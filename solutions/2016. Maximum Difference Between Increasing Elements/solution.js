/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumDifference = function (nums) {
  const n = nums.length;
  let result = -1;
  let minNum = nums[0];

  for (let index = 1; index < n; index++) {
    const num = nums[index];

    if (num > minNum) {
      result = Math.max(num - minNum, result);
    } else {
      minNum = num;
    }
  }

  return result;
};
