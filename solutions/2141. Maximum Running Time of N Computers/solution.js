/**
 * @param {number} n
 * @param {number[]} batteries
 * @return {number}
 */
const maxRunTime = function (n, batteries) {
  let totalBattery = batteries.reduce((total, battery) => total + battery);
  let index = 0;

  batteries.sort((a, b) => b - a);

  while (batteries[index] > totalBattery / n) {
    totalBattery -= batteries[index];
    index += 1;
    n -= 1;
  }

  return Math.floor(totalBattery / n);
};
