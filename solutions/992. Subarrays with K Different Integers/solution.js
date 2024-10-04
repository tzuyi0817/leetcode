/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysWithKDistinct = function (nums, k) {
  const n = nums.length;

  const subarraysWithMostDistinct = m => {
    const counts = Array(n + 1).fill(0);
    let left = 0;
    let result = 0;

    for (let index = 0; index < n; index++) {
      const num = nums[index];

      counts[num] += 1;
      if (counts[num] === 1) m -= 1;

      while (m < 0) {
        counts[nums[left]] -= 1;
        if (!counts[nums[left]]) m += 1;

        left += 1;
      }
      result += index - left + 1;
    }
    return result;
  };

  return subarraysWithMostDistinct(k) - subarraysWithMostDistinct(k - 1);
};
