/**
 * @param {number[]} slices
 * @return {number}
 */
const maxSizeSlices = function (slices) {
  const n = slices.length;
  const k = n / 3;

  const pickPizza = (index, end, groups, dp) => {
    if (end - index < groups * 2 - 1) return Number.MIN_SAFE_INTEGER;

    if (groups === 1) {
      return Math.max(...slices.slice(index, end));
    }

    if (dp[index][groups]) return dp[index][groups];
    const pick = slices[index] + pickPizza(index + 2, end, groups - 1, dp);
    const unPick = pickPizza(index + 1, end, groups, dp);
    const result = Math.max(pick, unPick);

    dp[index][groups] = result;

    return result;
  };

  const dp1 = Array.from({ length: n }, () => new Array(k + 1).fill(0));
  const dp2 = Array.from({ length: n }, () => new Array(k + 1).fill(0));
  const startFirst = pickPizza(0, n - 1, k, dp1);
  const startSecond = pickPizza(1, n, k, dp2);

  return Math.max(startFirst, startSecond);
};
