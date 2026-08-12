/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxSubarrayLength = function (nums, k) {
  const n = nums.length;
  const countMap = new Map();
  let left = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = countMap.get(num) ?? 0;

    countMap.set(num, count + 1);

    while (countMap.get(num) > k) {
      const leftNum = nums[left];
      const leftCount = countMap.get(leftNum);

      if (leftCount === 1) {
        countMap.delete(leftNum);
      } else {
        countMap.set(leftNum, leftCount - 1);
      }

      left += 1;
    }

    const len = index - left + 1;

    result = Math.max(len, result);
  }

  return result;
};
