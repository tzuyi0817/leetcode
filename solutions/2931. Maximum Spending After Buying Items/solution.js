/**
 * @param {number[][]} values
 * @return {number}
 */
const maxSpending = function (values) {
  const prices = values.flat();

  prices.sort((a, b) => a - b);

  return prices.reduce((result, price, index) => {
    const day = index + 1;

    return result + day * price;
  }, 0);
};
