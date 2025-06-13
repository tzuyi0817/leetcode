/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
const minimizeMax = function (nums, p) {
  const n = nums.length;

  nums.sort((a, b) => a - b);

  let left = 0;
  let right = nums[n - 1] - nums[0];

  const pairsCount = diff => {
    let index = 1;
    let count = 0;

    while (index < n) {
      const current = nums[index] - nums[index - 1];

      if (current <= diff) {
        count += 1;
        index += 2;
      } else {
        index += 1;
      }
    }

    return count;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    pairsCount(mid) >= p ? (right = mid) : (left = mid + 1);
  }

  return left;
};
