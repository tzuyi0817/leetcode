/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const firstStableIndex = function (nums, k) {
  const n = nums.length;
  const suffixMin = Array.from({ length: n + 1 }, () => Number.MAX_SAFE_INTEGER);
  let currentMax = 0;

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    suffixMin[index] = Math.min(num, suffixMin[index + 1]);
  }

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    currentMax = Math.max(num, currentMax);

    const score = currentMax - suffixMin[index];

    if (score <= k) return index;
  }

  return -1;
};
