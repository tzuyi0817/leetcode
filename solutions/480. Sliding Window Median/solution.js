/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const medianSlidingWindow = function (nums, k) {
  const n = nums.length;
  const result = [];
  const slidWindow = [];
  const half = Math.floor(k / 2);
  const binarySearch = value => {
    let left = 0;
    let right = slidWindow.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      slidWindow[mid] >= value ? (right = mid) : (left = mid + 1);
    }
    return left;
  };
  const insertToWindow = num => {
    slidWindow.splice(binarySearch(num), 0, num);
  };

  for (let index = 0; index < k; index++) {
    insertToWindow(nums[index]);
  }
  for (let index = k; index <= n; index++) {
    const median = k % 2 ? slidWindow[half] : (slidWindow[half - 1] + slidWindow[half]) / 2;

    result.push(median);
    if (index === n) break;
    const removeNum = nums[index - k];
    const removeIndex = binarySearch(removeNum);

    slidWindow.splice(removeIndex, 1);
    insertToWindow(nums[index]);
  }
  return result;
};
