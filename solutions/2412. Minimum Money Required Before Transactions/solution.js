/**
 * @param {number[][]} transactions
 * @return {number}
 */
const minimumMoney = function (transactions) {
  let maxCost = 0;
  let maxCashback = 0;
  let losses = 0;

  for (const transaction of transactions) {
    const [cost, cashback] = transaction;

    if (cost > cashback) {
      losses += cost - cashback;
      maxCashback = Math.max(cashback, maxCashback);
    } else {
      maxCost = Math.max(cost, maxCost);
    }
  }

  return losses + Math.max(maxCashback, maxCost);
};
