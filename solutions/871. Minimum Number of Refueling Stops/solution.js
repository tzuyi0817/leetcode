/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
const minRefuelStops = function (target, startFuel, stations) {
  const n = stations.length;
  const dp = new Array(n + 1).fill(startFuel);

  for (let index = 0; index < n; index++) {
    const [position, fuel] = stations[index];

    for (let count = index + 1; count > 0; count--) {
      if (dp[count - 1] < position) continue;

      dp[count] = Math.max(dp[count - 1] + fuel, dp[count]);
    }
  }

  for (const [index, element] of dp.entries()) {
    if (element >= target) return index;
  }
  return -1;
};
