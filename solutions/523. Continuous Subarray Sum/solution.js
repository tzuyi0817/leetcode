/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const checkSubarraySum = function (nums, k) {
  const n = nums.length;

  if (n < 2) return false;
  const remainderMap = new Map([[0, -1]]);
  let sum = 0;

  for (let index = 0; index < n; index++) {
    sum += nums[index];
    const remainder = sum % k;

    if (remainderMap.has(remainder)) {
      if (index - remainderMap.get(remainder) > 1) return true;
      continue;
    }
    remainderMap.set(remainder, index);
  }
  return false;
};
