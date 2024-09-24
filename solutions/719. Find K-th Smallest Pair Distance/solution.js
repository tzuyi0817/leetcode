/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const smallestDistancePair = function (nums, k) {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  let left = 0;
  let right = nums[n - 1] - nums[0];

  const getKth = distance => {
    let result = 0;
    let left = 0;
    let right = 1;

    while (right < n) {
      const num = nums[right];

      while (left < right && num - nums[left] > distance) {
        left += 1;
      }
      result += right - left;
      right += 1;
    }
    return result;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const kth = getKth(mid);

    kth >= k ? (right = mid) : (left = mid + 1);
  }
  return left;
};
