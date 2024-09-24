/**
 * @param {number[]} coins
 * @return {number}
 */
const getMaximumConsecutive = function (coins) {
  let result = 1;

  coins.sort((a, b) => a - b);

  for (const coin of coins) {
    if (coin > result) return result;
    result += coin;
  }
  return result;
};
