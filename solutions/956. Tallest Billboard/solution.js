/**
 * @param {number[]} rods
 * @return {number}
 */
const tallestBillboard = function (rods) {
  const sumRods = rods.reduce((result, rod) => result + rod);
  const dp = Array(sumRods + 1).fill(-1);

  dp[0] = 0;

  for (const rod of rods) {
    const previous = [...dp];

    for (let h = 0; h <= sumRods - rod; h++) {
      if (previous[h] < 0) continue;
      const diff = Math.abs(h - rod);

      dp[h] = Math.max(dp[h], previous[h]);
      dp[h + rod] = Math.max(dp[h + rod], previous[h]);
      dp[diff] = Math.max(dp[diff], previous[h] + Math.min(rod, h));
    }
  }
  return dp[0];
};
