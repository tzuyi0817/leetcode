/**
 * @param {number[]} nums
 * @param {number[]} removeQueries
 * @return {number[]}
 */
const maximumSegmentSum = function (nums, removeQueries) {
  const n = nums.length;
  const sums = Array.from({ length: n }, () => 0);
  const counts = Array.from({ length: n }, () => 0);
  const result = Array.from({ length: n });
  let maxSum = 0;

  for (let index = n - 1; index >= 0; index--) {
    result[index] = maxSum;

    const pos = removeQueries[index];
    const leftSum = pos > 0 ? sums[pos - 1] : 0;
    const rightSum = pos < n - 1 ? sums[pos + 1] : 0;
    const segmentSum = nums[pos] + leftSum + rightSum;

    const leftCount = pos > 0 ? counts[pos - 1] : 0;
    const rightCount = pos < n - 1 ? counts[pos + 1] : 0;
    const segmentCount = 1 + leftCount + rightCount;
    const left = pos - leftCount;
    const right = pos + rightCount;

    sums[left] = segmentSum;
    sums[right] = segmentSum;
    counts[left] = segmentCount;
    counts[right] = segmentCount;
    maxSum = Math.max(segmentSum, maxSum);
  }

  return result;
};
