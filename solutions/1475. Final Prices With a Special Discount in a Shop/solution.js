/**
 * @param {number[]} prices
 * @return {number[]}
 */
const finalPrices = function (prices) {
  const n = prices.length;
  const stack = [];
  const result = [...prices];

  for (let index = 0; index < n; index++) {
    const price = prices[index];

    while (stack.length && prices[stack.at(-1)] >= price) {
      result[stack.pop()] -= price;
    }
    stack.push(index);
  }
  return result;
};
