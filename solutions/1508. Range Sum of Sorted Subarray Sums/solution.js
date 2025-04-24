/**
 * @param {number[]} nums
 * @param {number} n
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
const rangeSum = function (nums, n, left, right) {
  const MODULO = 10 ** 9 + 7;
  const minSum = Math.min(...nums);
  const maxSum = nums.reduce((sum, num) => sum + num);
  const getTargetSum = target => {
    let count = 0;
    let result = 0;
    let sum = 0;
    let current = 0;
    let left = 0;

    for (let index = 0; index < n; index++) {
      current += nums[index];
      sum += nums[index] * (index - left + 1);
      while (current > target) {
        sum -= current;
        current -= nums[left];
        left += 1;
      }
      count += index - left + 1;
      result += sum;
    }
    return { count, result };
  };
  const getSubarraySum = k => {
    let left = minSum;
    let right = maxSum;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const { count } = getTargetSum(mid);

      count < k ? (left = mid + 1) : (right = mid);
    }
    const { count, result } = getTargetSum(left);

    return result - left * (count - k);
  };
  return (getSubarraySum(right) - getSubarraySum(left - 1)) % MODULO;
};
