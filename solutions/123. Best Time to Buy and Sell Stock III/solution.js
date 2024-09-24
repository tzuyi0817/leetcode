/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  const first = { sell: 0, buy: Number.MIN_SAFE_INTEGER };
  const second = { sell: 0, buy: Number.MIN_SAFE_INTEGER };

  for (const price of prices) {
    second.sell = Math.max(second.sell, second.buy + price);
    second.buy = Math.max(second.buy, first.sell - price);
    first.sell = Math.max(first.sell, first.buy + price);
    first.buy = Math.max(first.buy, -price);
  }
  return second.sell;
};
