/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumLength = function (nums, k) {
  const dp = Array.from({ length: k + 1 }, () => new Map());
  const maxLen = Array.from({ length: k + 1 }, () => 0);

  for (const num of nums) {
    for (let count = k; count >= 0; count--) {
      const countMap = dp[count];
      let len = 1 + (countMap.get(num) ?? 0);

      if (count > 0) {
        len = Math.max(len, 1 + maxLen[count - 1]);
      }

      countMap.set(num, len);
      maxLen[count] = Math.max(len, maxLen[count]);
    }
  }

  return maxLen[k];
};
