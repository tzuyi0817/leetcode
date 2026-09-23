/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
const minOperations = function (nums, x) {
  const n = nums.length;
  const total = nums.reduce((result, num) => result + num);

  if (x > total) return -1;

  if (x === total) return n;

  const target = total - x;
  let sum = 0;
  let left = 0;
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    sum += nums[index];

    while (left < index && sum > target) {
      sum -= nums[left];
      left += 1;
    }

    if (sum !== target) continue;

    const len = index - left + 1;

    result = Math.min(n - len, result);
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
