/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
const maxValueOfCoins = function (piles, k) {
  const n = piles.length;
  const dp = Array.from({ length: n }, () => {
    return new Array(k + 1).fill(-1);
  });

  const chooseCoin = (index, needCoins) => {
    if (index >= n || !needCoins) return 0;
    if (dp[index][needCoins] !== -1) return dp[index][needCoins];

    const coins = Math.min(needCoins, piles[index].length);
    let prefixSum = 0;
    let result = chooseCoin(index + 1, needCoins);

    for (let count = 1; count <= coins; count++) {
      prefixSum += piles[index][count - 1];

      const total = prefixSum + chooseCoin(index + 1, needCoins - count);

      result = Math.max(total, result);
    }

    dp[index][needCoins] = result;

    return result;
  };

  return chooseCoin(0, k);
};
