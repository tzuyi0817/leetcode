/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
const maximumRobots = function (chargeTimes, runningCosts, budget) {
  const n = chargeTimes.length;
  const deque = [];
  let left = 0;
  let totalCost = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const chargeTime = chargeTimes[index];
    const cost = runningCosts[index];

    while (deque.length && chargeTimes[deque.at(-1)] <= chargeTime) {
      deque.pop();
    }

    deque.push(index);
    totalCost += cost;

    let totalBudget = totalCost * (index - left + 1) + chargeTimes[deque[0]];

    while (deque.length && totalBudget > budget) {
      if (deque[0] === left) {
        deque.shift();
      }

      totalCost -= runningCosts[left];
      left += 1;
      totalBudget = totalCost * (index - left + 1) + chargeTimes[deque[0]];
    }

    result = Math.max(index - left + 1, result);
  }

  return result;
};
