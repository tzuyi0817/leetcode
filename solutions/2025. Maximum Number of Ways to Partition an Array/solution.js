/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const waysToPartition = function (nums, k) {
  const n = nums.length;
  const sum = nums.reduce((result, num) => result + num);
  const leftMap = new Map();
  const rightMap = new Map();
  let prefix = nums[0];

  for (let pivot = 1; pivot < n; pivot++) {
    const suffix = sum - prefix;
    const diff = prefix - suffix;
    const count = rightMap.get(diff) ?? 0;

    rightMap.set(diff, count + 1);
    prefix += nums[pivot];
  }

  let result = rightMap.get(0) ?? 0;

  prefix = 0;

  for (const num of nums) {
    const delta = k - num;
    const leftCount = leftMap.get(delta) ?? 0;
    const rightCount = rightMap.get(-delta) ?? 0;

    result = Math.max(leftCount + rightCount, result);
    prefix += num;

    const suffix = sum - prefix;
    const diff = prefix - suffix;
    const leftDiffCount = leftMap.get(diff) ?? 0;
    const rightDiffCount = rightMap.get(diff) ?? 0;

    leftMap.set(diff, leftDiffCount + 1);
    rightMap.set(diff, rightDiffCount - 1);
  }

  return result;
};
