/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumReplacement = function (nums) {
  const n = nums.length;
  let prev = nums[n - 1];
  let result = 0;

  for (let index = n - 2; index >= 0; index--) {
    const num = nums[index];
    const operations = Math.floor((num - 1) / prev);

    result += operations;
    prev = Math.floor(num / (operations + 1));
  }

  return result;
};
