/**
 * @param {number[]} stoneValue
 * @return {number}
 */
const stoneGameV = function (stoneValue) {
  const n = stoneValue.length;
  const prefixScore = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

  for (let index = 1; index <= n; index++) {
    prefixScore[index] = prefixScore[index - 1] + stoneValue[index - 1];
  }

  const getMaxScore = (left, right) => {
    if (left >= right) return 0;
    if (dp[left][right] !== -1) return dp[left][right];
    let result = 0;

    for (let index = left; index < right; index++) {
      const heap1 = prefixScore[index + 1] - prefixScore[left];
      const heap2 = prefixScore[right + 1] - prefixScore[index + 1];

      if (heap1 > heap2) {
        const score = heap2 + getMaxScore(index + 1, right);

        result = Math.max(score, result);
      } else if (heap1 < heap2) {
        const score = heap1 + getMaxScore(left, index);

        result = Math.max(score, result);
      } else {
        const score1 = heap2 + getMaxScore(index + 1, right);
        const score2 = heap1 + getMaxScore(left, index);

        result = Math.max(result, score1, score2);
      }
    }

    dp[left][right] = result;

    return result;
  };

  return getMaxScore(0, n - 1);
};
