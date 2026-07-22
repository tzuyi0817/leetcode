/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumStrength = function (nums, k) {
  const SAFE_MIN = Number.MIN_SAFE_INTEGER;
  const n = nums.length;
  const dp = Array.from({ length: n }, () => {
    return new Array(2).fill('').map(() => new Array(k + 1).fill(null));
  });

  const getMaxStrength = (index, kth, isStart) => {
    if (n - index < kth) return SAFE_MIN;
    if (index === n) return kth ? SAFE_MIN : 0;
    if (kth === 0) return 0;

    const s = Number(isStart);

    if (dp[index][s][kth] !== null) return dp[index][s][kth];

    const num = nums[index];
    const skip = isStart ? getMaxStrength(index + 1, kth, true) : SAFE_MIN;
    const strength = kth * (kth % 2 ? 1 : -1) * num;
    const includeNum = getMaxStrength(index + 1, kth, false) + strength;
    const startSub = getMaxStrength(index + 1, kth - 1, true) + strength;
    const result = Math.max(skip, includeNum, startSub);

    dp[index][s][kth] = result;

    return result;
  };

  return getMaxStrength(0, k, true);
};
