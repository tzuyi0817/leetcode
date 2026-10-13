/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAlternatingSum = function (nums) {
  const n = nums.length;
  const half = Math.ceil(n / 2);
  let result = 0;

  nums.sort((a, b) => Math.abs(b) - Math.abs(a));

  for (let index = 0; index < half; index++) {
    const pair = n - index - 1;
    const a = nums[index] ** 2;
    const b = index === pair ? 0 : nums[pair] ** 2;

    result += a - b;
  }

  return result;
};
