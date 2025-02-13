/**
 * @param {number[]} cost
 * @param {number} target
 * @return {string}
 */
const largestNumber = function (cost, target) {
  const n = cost.length;
  const dp = Array.from({ length: target + 1 }, () => '');

  const paintDigit = spendCost => {
    if (spendCost === target) return '';
    if (dp[spendCost] !== '') return dp[spendCost];
    let result = '0';

    for (let index = n - 1; index >= 0; index--) {
      const nextCost = spendCost + cost[index];

      if (nextCost > target) continue;
      const nextInteger = paintDigit(nextCost);

      if (nextInteger === '0') continue;
      const digit = `${index + 1}`;
      const integer = `${digit}${nextInteger}`;

      if (integer.length < result.length) continue;
      if (integer.length === result.length && integer <= result) continue;

      result = integer;
    }

    dp[spendCost] = result;

    return result;
  };

  return paintDigit(0);
};
