/**
 * @param {number[]} nums
 * @return {number}
 */
const incremovableSubarrayCount = function (nums) {
  const n = nums.length;

  const findStartIndex = () => {
    for (let index = n - 2; index >= 0; index--) {
      if (nums[index] >= nums[index + 1]) {
        return index + 1;
      }
    }

    return 0;
  };

  const startIndex = findStartIndex();

  if (startIndex === 0) return (n * (n + 1)) / 2;

  let right = startIndex;
  let result = n - startIndex + 1;

  for (let index = 0; index < startIndex; index++) {
    if (index && nums[index] <= nums[index - 1]) {
      return result;
    }

    while (right < n && nums[index] >= nums[right]) {
      right += 1;
    }

    result += n - right + 1;
  }

  return result;
};
