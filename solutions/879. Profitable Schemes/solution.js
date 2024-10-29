/**
 * @param {number} n
 * @param {number} minProfit
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
const profitableSchemes = function (n, minProfit, group, profit) {
  const MODULO = 10 ** 9 + 7;
  const groups = group.length;
  const dp = new Array(groups + 1)
    .fill('')
    .map(_ => new Array(n + 1).fill('').map(_ => new Array(minProfit + 1).fill(-1)));

  const commitCrimes = (index, currentProfit, members) => {
    if (index >= groups) return currentProfit >= minProfit ? 1 : 0;
    if (dp[index][members][currentProfit] !== -1) return dp[index][members][currentProfit];

    let result = commitCrimes(index + 1, currentProfit, members);

    if (members >= group[index]) {
      const newProfit = Math.min(minProfit, currentProfit + profit[index]);

      result += commitCrimes(index + 1, newProfit, members - group[index]);
      result %= MODULO;
    }
    return (dp[index][members][currentProfit] = result);
  };

  return commitCrimes(0, 0, n);
};
