/**
 * @param {number[]} cost
 * @return {number}
 */
const minimumCost = function (cost) {
  const n = cost.length;
  let result = 0;

  cost.sort((a, b) => b - a);

  for (let index = 2; index < n; index += 3) {
    result += cost[index - 1] + cost[index - 2];
  }

  let remainder = n % 3;

  while (remainder) {
    result += cost[n - remainder];
    remainder -= 1;
  }

  return result;
};
