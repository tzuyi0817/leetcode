/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
const jobScheduling = function (startTime, endTime, profit) {
  const size = startTime.length;
  const dp = new Array(size + 1).fill(0);
  const jobs = startTime.map((start, index) => {
    return { start, end: endTime[index], profit: profit[index] };
  });

  jobs.sort((a, b) => a.end - b.end);
  const findMaxProfit = (target, right) => {
    let left = 0;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      jobs[mid].end > target ? (right = mid) : (left = mid + 1);
    }
    return dp[left];
  };

  for (let index = 0; index < size; index++) {
    const { start, profit } = jobs[index];
    const current = findMaxProfit(start, index) + profit;

    dp[index + 1] = Math.max(current, dp[index]);
  }
  return dp.at(-1);
};
