/**
 * @param {number[]} prices
 * @param {number} k
 * @return {number}
 */
const maximumProfit = function (prices, k) {
  const n = prices.length;
  const SKIP = 0;
  const NORMAL = 1;
  const SHORT_SELLING = 2;
  const dp = Array.from({ length: n }, () => {
    return new Array(k + 1).fill('').map(() => new Array(3).fill(-1));
  });

  const transactionStock = (index, times, state) => {
    if (!times) return 0;

    const price = prices[index];

    if (!index) {
      if (state === SKIP) return 0;

      return state === NORMAL ? -price : price;
    }

    if (dp[index][times][state] > -1) return dp[index][times][state];

    let result = transactionStock(index - 1, times, state);

    if (state === SKIP) {
      const normalProfit = transactionStock(index - 1, times, NORMAL) + price;
      const shortSellingProfit = transactionStock(index - 1, times, SHORT_SELLING) - price;

      result = Math.max(normalProfit, shortSellingProfit, result);
    } else if (state === NORMAL) {
      const profit = transactionStock(index - 1, times - 1, SKIP) - price;

      result = Math.max(profit, result);
    } else {
      const profit = transactionStock(index - 1, times - 1, SKIP) + price;

      result = Math.max(profit, result);
    }

    dp[index][times][state] = result;

    return result;
  };

  return transactionStock(n - 1, k, SKIP);
};
