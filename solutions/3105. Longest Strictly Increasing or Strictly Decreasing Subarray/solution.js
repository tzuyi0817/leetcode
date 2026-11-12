/**
 * @param {number[]} nums
 * @return {number}
 */
const longestMonotonicSubarray = function (nums) {
  const n = nums.length;
  let increase = 1;
  let decrease = 1;
  let result = 1;

  for (let index = 1; index < n; index++) {
    const num = nums[index];
    const prev = nums[index - 1];

    if (num > prev) {
      increase += 1;
      decrease = 1;
    } else if (num < prev) {
      increase = 1;
      decrease += 1;
    } else {
      increase = 1;
      decrease = 1;
    }

    result = Math.max(increase, decrease, result);
  }

  return result;
};
