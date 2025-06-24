/**
 * @param {number[]} nums
 * @param {number} key
 * @param {number} k
 * @return {number[]}
 */
const findKDistantIndices = function (nums, key, k) {
  const n = nums.length;
  const result = [];
  let right = 0;

  for (let index = 0; index < n; index++) {
    while (right < n && (nums[right] !== key || right < index - k)) {
      right += 1;
    }

    if (right === n) return result;

    if (Math.abs(index - right) <= k) {
      result.push(index);
    }
  }

  return result;
};
