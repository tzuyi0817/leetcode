/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumMountainRemovals = function (nums) {
  const n = nums.length;

  const findFirstLargeIndex = (elements, target) => {
    let left = 0;
    let right = elements.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      elements[mid] >= target ? (right = mid) : (left = mid + 1);
    }
    return left;
  };

  const lengthOfLIS = elements => {
    const result = new Array(n).fill(0);
    const current = [];

    for (let index = 0; index < n; index++) {
      const element = elements[index];
      const firstIndex = findFirstLargeIndex(current, element);

      current[firstIndex] = element;
      result[index] = current.length;
    }
    return result;
  };

  const leftLengthOfLIS = lengthOfLIS(nums);
  const rightLengthOfLIS = lengthOfLIS([...nums].reverse()).reverse();
  let result = 0;

  for (let index = 0; index < n; index++) {
    const left = leftLengthOfLIS[index];
    const right = rightLengthOfLIS[index];

    if (left < 2 || right < 2) continue;

    result = Math.max(left + right - 1, result);
  }
  return n - result;
};
