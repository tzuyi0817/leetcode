/**
 * @param {number[]} stoneValue
 * @return {number}
 */
const stoneGameV = function (stoneValue) {
  const n = stoneValue.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

  for (let index = 1; index <= n; index++) {
    const value = stoneValue[index - 1];

    prefixSum[index] = prefixSum[index - 1] + value;
  }

  const getMaxScore = (l, r) => {
    if (l === r) return 0;

    if (dp[l][r] !== -1) return dp[l][r];

    let result = 0;

    for (let index = l; index < r; index++) {
      const mid = index + 1;
      const leftValue = prefixSum[mid] - prefixSum[l];
      const rightValue = prefixSum[r + 1] - prefixSum[mid];

      if (leftValue > rightValue) {
        const sum = rightValue + getMaxScore(mid, r);

        result = Math.max(sum, result);
      } else if (leftValue < rightValue) {
        const sum = leftValue + getMaxScore(l, index);

        result = Math.max(sum, result);
      } else {
        const rightSum = rightValue + getMaxScore(mid, r);
        const leftSum = leftValue + getMaxScore(l, index);

        result = Math.max(leftSum, rightSum, result);
      }
    }

    dp[l][r] = result;

    return result;
  };

  return getMaxScore(0, n - 1);
};
