/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minimumIncompatibility = function (nums, k) {
  const n = nums.length;
  const totalMask = 1 << n;
  const subsetSize = n / k;
  const subsetMap = new Map();
  const dp = Array.from({ length: totalMask }, () => -1);

  const isValidSubsetSize = mask => {
    let count = 0;

    while (mask) {
      count += mask & 1;

      if (count > subsetSize) return false;

      mask >>= 1;
    }

    return count === subsetSize;
  };

  const getIncompatibility = mask => {
    if (!isValidSubsetSize(mask)) return -1;
    const visited = new Set();
    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;

    for (let index = 0; index < n; index++) {
      if ((mask & (1 << index)) === 0) continue;
      const num = nums[index];

      if (visited.has(num)) return -1;

      visited.add(num);
      min = Math.min(num, min);
      max = Math.max(num, max);
    }

    return max - min;
  };

  for (let mask = 0; mask < totalMask; mask++) {
    const incompatibility = getIncompatibility(mask);

    if (incompatibility === -1) continue;

    subsetMap.set(mask, incompatibility);
  }

  const distributeSubset = mask => {
    if (mask === totalMask - 1) return 0;
    if (dp[mask] !== -1) return dp[mask];
    let result = Number.MAX_SAFE_INTEGER;

    for (const [subset, incompatibility] of subsetMap) {
      if (subset & mask) continue;
      const sum = incompatibility + distributeSubset(mask | subset);

      result = Math.min(sum, result);
    }

    dp[mask] = result;

    return result;
  };

  const result = distributeSubset(0);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
