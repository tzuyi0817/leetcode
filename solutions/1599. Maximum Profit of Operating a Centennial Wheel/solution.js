/**
 * @param {number[]} customers
 * @param {number} boardingCost
 * @param {number} runningCost
 * @return {number}
 */
const minOperationsMaxProfit = function (customers, boardingCost, runningCost) {
  const result = { rotate: -1, profit: 0 };
  let wait = (profit = rotate = 0);

  for (const customer of customers) {
    wait += customer;
    runningWheel();
  }
  while (wait > 0) runningWheel();

  return result.rotate;

  function runningWheel() {
    rotate += 1;
    profit += wait >= 4 ? 4 * boardingCost - runningCost : wait * boardingCost - runningCost;

    wait = Math.max(wait - 4, 0);
    if (profit < 0 || result.profit >= profit) return;
    result.rotate = rotate;
    result.profit = profit;
  }
};
