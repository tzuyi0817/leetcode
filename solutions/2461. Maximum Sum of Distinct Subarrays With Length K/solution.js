/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumSubarraySum = function (nums, k) {
  const n = nums.length;
  const memo = new Set();
  let left = 0;
  let sum = 0;
  let length = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    sum += num;
    length += 1;

    while (memo.has(num) || length > k) {
      sum -= nums[left];
      length -= 1;
      memo.delete(nums[left]);
      left += 1;
    }
    memo.add(num);
    if (length < k) continue;

    result = Math.max(sum, result);
  }
  return result;
};
