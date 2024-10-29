/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const canEat = function (candiesCount, queries) {
  const prfixCandiesCount = [0];

  for (const [index, element] of candiesCount.entries()) {
    prfixCandiesCount.push(prfixCandiesCount[index] + element);
  }

  return queries.map(([type, day, cap]) => {
    const minDay = Math.floor(prfixCandiesCount[type] / cap);
    const maxDay = prfixCandiesCount[type + 1] - 1;

    return minDay <= day && maxDay >= day;
  });
};
