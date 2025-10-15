/**
 * @param {number} n
 * @param {number[]} batteries
 * @return {number}
 */
const maxRunTime = function (n, batteries) {
  let totalPower = batteries.reduce((sum, power) => sum + power);

  batteries.sort((a, b) => a - b);

  while (batteries.at(-1) > totalPower / n) {
    totalPower -= batteries.pop();
    n -= 1;
  }

  return Math.floor(totalPower / n);
};
