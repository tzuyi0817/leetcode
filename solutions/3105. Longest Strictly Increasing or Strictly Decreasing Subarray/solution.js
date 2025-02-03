/**
 * @param {number[]} nums
 * @return {number}
 */
const longestMonotonicSubarray = function (nums) {
  const n = nums.length;
  let state = '';
  let length = 1;
  let result = 1;

  for (let index = 1; index < n; index++) {
    const prevNum = nums[index - 1];
    const num = nums[index];

    if (num === prevNum) {
      length = 1;
      state = '';
    } else if (num > prevNum) {
      length = state === 'increase' ? length + 1 : 2;
      state = 'increase';
    } else {
      length = state === 'decrease' ? length + 1 : 2;
      state = 'decrease';
    }
    result = Math.max(length, result);
  }
  return result;
};
