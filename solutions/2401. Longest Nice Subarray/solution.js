/**
 * @param {number[]} nums
 * @return {number}
 */
const longestNiceSubarray = function (nums) {
  const n = nums.length;
  let left = 0;
  let xor = 0;
  let result = 1;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    while (left < index && (xor & num) !== 0) {
      xor ^= nums[left];
      left += 1;
    }

    xor ^= num;
    result = Math.max(index - left + 1, result);
  }

  return result;
};
