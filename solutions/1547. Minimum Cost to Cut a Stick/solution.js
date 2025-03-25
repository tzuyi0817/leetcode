/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
const minCost = function (n, cuts) {
  cuts.push(0, n);
  cuts.sort((a, b) => a - b);

  const m = cuts.length;
  const dp = Array.from({ length: m }, () => new Array(m).fill(Number.MAX_SAFE_INTEGER));

  const getCutCost = (left, right) => {
    if (right - left <= 1) return 0;
    if (dp[left][right] !== Number.MAX_SAFE_INTEGER) return dp[left][right];
    const cost = cuts[right] - cuts[left];
    let result = Number.MAX_SAFE_INTEGER;

    for (let index = left + 1; index < right; index++) {
      const totalCost = cost + getCutCost(left, index) + getCutCost(index, right);

      result = Math.min(totalCost, result);
    }

    dp[left][right] = result;

    return result;
  };

  return getCutCost(0, m - 1);
};
