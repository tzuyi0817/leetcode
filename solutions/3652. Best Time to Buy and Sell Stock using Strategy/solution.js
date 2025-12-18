/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
const maxProfit = function (prices, strategy, k) {
  const n = prices.length;
  const prefixPrice = Array.from({ length: n + 1 }, () => 0);
  const prefixProfit = Array.from({ length: n + 1 }, () => 0);

  for (let index = 1; index <= n; index++) {
    const profit = prices[index - 1] * strategy[index - 1];

    prefixProfit[index] = profit + prefixProfit[index - 1];
    prefixPrice[index] = prices[index - 1] + prefixPrice[index - 1];
  }

  let result = prefixProfit[n];

  for (let index = k; index <= n; index++) {
    const preProfit = prefixProfit[index - k];
    const sufProfit = prefixProfit[n] - prefixProfit[index];
    const sell = prefixPrice[index] - prefixPrice[index - k / 2];

    result = Math.max(preProfit + sufProfit + sell, result);
  }

  return result;
};
