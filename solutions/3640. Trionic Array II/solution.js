/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSumTrionic = function (nums) {
  const n = nums.length;
  let index = 0;
  let result = Number.MIN_SAFE_INTEGER;

  while (index < n) {
    let l = index + 1;
    let sum = 0;

    while (l < n && nums[l - 1] < nums[l]) {
      l += 1;
    }

    const p = l - 1;

    if (p === index) {
      index += 1;
      continue;
    }

    sum += nums[p] + nums[p - 1];

    while (l < n && nums[l - 1] > nums[l]) {
      sum += nums[l];
      l += 1;
    }

    const q = l - 1;

    if (q === p || q === n - 1 || (l < n && nums[l] === nums[q])) {
      index = q + 1;
      continue;
    }

    sum += nums[q + 1];

    let segmentSum = 0;
    let maxSum = 0;

    for (let k = q + 2; k < n; k++) {
      if (nums[k] <= nums[k - 1]) break;

      segmentSum += nums[k];
      maxSum = Math.max(segmentSum, maxSum);
    }

    sum += maxSum;
    segmentSum = 0;
    maxSum = 0;

    for (let k = p - 2; k >= index; k--) {
      segmentSum += nums[k];
      maxSum = Math.max(segmentSum, maxSum);
    }

    sum += maxSum;
    result = Math.max(sum, result);
    index = q;
  }

  return result;
};
