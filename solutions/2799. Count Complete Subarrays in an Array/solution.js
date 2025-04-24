/**
 * @param {number[]} nums
 * @return {number}
 */
const countCompleteSubarrays = function (nums) {
  const n = nums.length;
  const distinctCount = new Set(nums).size;
  const numMap = new Map();
  let left = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = numMap.get(num) ?? 0;

    numMap.set(num, count + 1);

    while (numMap.size === distinctCount) {
      const leftNum = nums[left];
      const leftCount = numMap.get(leftNum);

      result += n - index;

      if (leftCount === 1) {
        numMap.delete(leftNum);
      } else {
        numMap.set(leftNum, leftCount - 1);
      }

      left += 1;
    }
  }

  return result;
};
