/**
 * @param {number[][]} items
 * @param {number} k
 * @return {number}
 */
const findMaximumElegance = function (items, k) {
  const n = items.length;
  const seenCategories = new Set();
  const duplicateProfits = [];
  let totalProfit = 0;

  items.sort((a, b) => b[0] - a[0]);

  for (let index = 0; index < k; index++) {
    const [profit, category] = items[index];

    totalProfit += profit;

    if (seenCategories.has(category)) {
      duplicateProfits.push(profit);
    } else {
      seenCategories.add(category);
    }
  }

  let distinctCount = seenCategories.size;
  let result = totalProfit + distinctCount ** 2;

  for (let index = k; index < n; index++) {
    const [profit, category] = items[index];

    if (!duplicateProfits.length) return result;

    if (!seenCategories.has(category)) {
      const minProfit = duplicateProfits.pop();

      distinctCount += 1;
      totalProfit += profit - minProfit;
      seenCategories.add(category);

      const currentElegance = totalProfit + distinctCount ** 2;

      result = Math.max(currentElegance, result);
    }
  }

  return result;
};
