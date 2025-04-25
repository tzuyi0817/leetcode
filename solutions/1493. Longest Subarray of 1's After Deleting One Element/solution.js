/**
 * @param {number[]} nums
 * @return {number}
 */
const longestSubarray = function (nums) {
  let left = 0;
  let currentSize = 0;
  let result = 0;
  let isDelete = false;

  for (const [index, value] of nums.entries()) {
    if (value) currentSize += 1;
    else {
      isDelete ? (currentSize = index - left - 1) : (isDelete = true);

      left = index;
    }
    result = Math.max(result, currentSize);
  }
  return isDelete ? result : result - 1;
};
