/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxFrequencyScore = function (nums, k) {
  const n = nums.length;
  let left = 0;
  let operations = 0;
  let result = 0;

  nums.sort((a, b) => a - b);

  for (let index = 0; index < n; index++) {
    const mid = Math.floor((index + left) / 2);

    operations += nums[index] - nums[mid];

    while (operations > k) {
      left += 1;

      const mid = Math.floor((index + left) / 2);

      operations -= nums[mid] - nums[left - 1];
    }

    const len = index - left + 1;

    result = Math.max(len, result);
  }

  return result;
};
