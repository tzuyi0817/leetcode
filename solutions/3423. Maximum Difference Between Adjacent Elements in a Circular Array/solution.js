/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAdjacentDistance = function (nums) {
  const n = nums.length;
  let result = Number.MIN_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const nextNum = nums[(index + 1) % n];
    const diff = Math.abs(num - nextNum);

    result = Math.max(diff, result);
  }

  return result;
};
