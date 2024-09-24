/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxFrequency = function (nums, k) {
  let sum = (left = result = 0);

  nums.sort((a, b) => a - b);

  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];

    sum += num;
    while (sum + k < num * (index - left + 1)) {
      sum -= nums[left];
      left += 1;
    }
    result = Math.max(index - left + 1, result);
  }
  return result;
};
