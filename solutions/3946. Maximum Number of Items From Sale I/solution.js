/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
const maximumSaleItems = function (items, budget) {
  const n = items.length;
  const factors = Array.from({ length: n }, () => 0);

  for (let a = 0; a < n; a++) {
    const factorA = items[a][0];

    for (let b = 0; b < n; b++) {
      if (a === b) continue;

      const factorB = items[b][0];

      if (factorB % factorA === 0) {
        factors[a] += 1;
      }
    }
  }

  const dp = Array.from({ length: n }, () => {
    return new Array(2).fill('').map(() => new Array(budget + 1).fill(-1));
  });

  const getMaxCopies = (index, remaining, bought) => {
    if (index >= n || !remaining) return 0;

    const key = Number(bought);

    if (dp[index][key][remaining] !== -1) {
      return dp[index][key][remaining];
    }

    const price = items[index][1];
    let result = getMaxCopies(index + 1, remaining, false);

    if (price <= remaining) {
      const free = bought ? 0 : factors[index];
      const nextRemaining = remaining - price;
      const copies = 1 + free + getMaxCopies(index, nextRemaining, true);

      result = Math.max(copies, result);
    }

    dp[index][key][remaining] = result;

    return result;
  };

  return getMaxCopies(0, budget, false);
};
