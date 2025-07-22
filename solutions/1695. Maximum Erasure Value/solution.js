/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumUniqueSubarray = function (nums) {
  const n = nums.length;
  const numSet = new Set();
  let left = 0;
  let sum = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    while (left < index && numSet.has(num)) {
      const leftNum = nums[left];

      numSet.delete(leftNum);
      sum -= leftNum;
      left += 1;
    }

    numSet.add(num);
    sum += num;
    result = Math.max(sum, result);
  }

  return result;
};
