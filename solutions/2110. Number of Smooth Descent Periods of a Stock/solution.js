/**
 * @param {number[]} prices
 * @return {number}
 */
const getDescentPeriods = function (prices) {
  const n = prices.length;
  let result = 1;
  let contiguous = 1;

  for (let index = 1; index < n; index++) {
    const diff = prices[index - 1] - prices[index];

    contiguous = diff === 1 ? contiguous + 1 : 1;
    result += contiguous;
  }

  return result;
};
