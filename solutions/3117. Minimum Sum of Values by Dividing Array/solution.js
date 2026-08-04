/**
 * @param {number[]} nums
 * @param {number[]} andValues
 * @return {number}
 */
const minimumValueSum = function (nums, andValues) {
  const n = nums.length;
  const m = andValues.length;
  const maxNum = Math.max(...nums);
  const log = 32 - Math.clz32(maxNum);
  const MAX_MASK = (1 << log) - 1;
  const dp = Array.from({ length: n }, () => {
    return new Array(m).fill('').map(() => new Map());
  });

  const getMinSumValues = (i, j, mask) => {
    if (i >= n && j >= m) return 0;

    if (i >= n || j >= m) return Number.MAX_SAFE_INTEGER;

    if (dp[i][j].has(mask)) return dp[i][j].get(mask);

    const num = nums[i];
    const nextMask = mask & num;
    const target = andValues[j];

    if (nextMask < target) return Number.MAX_SAFE_INTEGER;

    let result = getMinSumValues(i + 1, j, nextMask);

    if (nextMask === target) {
      const sum = num + getMinSumValues(i + 1, j + 1, MAX_MASK);

      result = Math.min(sum, result);
    }

    dp[i][j].set(mask, result);

    return result;
  };

  const sum = getMinSumValues(0, 0, MAX_MASK);

  return sum === Number.MAX_SAFE_INTEGER ? -1 : sum;
};
