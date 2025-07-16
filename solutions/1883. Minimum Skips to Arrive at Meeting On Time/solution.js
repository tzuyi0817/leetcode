/**
 * @param {number[]} dist
 * @param {number} speed
 * @param {number} hoursBefore
 * @return {number}
 */
const minSkips = function (dist, speed, hoursBefore) {
  const n = dist.length;
  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  const getSpendHours = (index, skip) => {
    if (index >= n) return 0;
    if (dp[index][skip] !== -1) return dp[index][skip];
    const hours = dist[index] / speed;
    let result = Math.ceil(hours + getSpendHours(index + 1, skip) - 1e-9);

    if (skip) {
      const totalHours = hours + getSpendHours(index + 1, skip - 1);

      result = Math.min(result, totalHours);
    }

    dp[index][skip] = result;

    return result;
  };

  for (let skip = 0; skip <= n; skip++) {
    const hours = getSpendHours(0, skip);

    if (hours <= hoursBefore) return skip;
  }

  return -1;
};
