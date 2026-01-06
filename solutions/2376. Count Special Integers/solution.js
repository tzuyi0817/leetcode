/**
 * @param {number} n
 * @return {number}
 */
const countSpecialNumbers = function (n) {
  const nums = `${n}`.split('').map(Number);
  const m = nums.length;
  const dp = Array.from({ length: m }, () => {
    return new Array(1 << 10).fill(-1);
  });

  const countSpecial = (index, isTight, mask) => {
    if (index >= m) return mask ? 1 : 0;

    if (!isTight && dp[index][mask] !== -1) {
      return dp[index][mask];
    }

    const limit = isTight ? nums[index] : 9;
    let result = 0;

    for (let num = 0; num <= limit; num++) {
      if (mask & (1 << num)) continue;

      if (mask === 0 && num === 0) {
        result += countSpecial(index + 1, false, mask);
        continue;
      }

      const nextTight = isTight && num === limit;
      const nextMask = mask | (1 << num);

      result += countSpecial(index + 1, nextTight, nextMask);
    }

    if (!isTight) {
      dp[index][mask] = result;
    }

    return result;
  };

  return countSpecial(0, true, 0);
};
