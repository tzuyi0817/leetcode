/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
const numOfArrays = function (n, m, k) {
  if (k === 0) return 0;
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: n }, () => {
    return new Array(m + 1).fill('').map(_ => new Array(k + 1).fill(-1));
  });

  const findArrays = (index, maximum, searchCost) => {
    if (index >= n) return searchCost === k ? 1 : 0;
    if (n - index + 1 + searchCost < k) return 0;
    if (dp[index][maximum][searchCost] !== -1) return dp[index][maximum][searchCost];
    const maxNum = searchCost === k ? maximum : m;
    const minCount = findArrays(index + 1, maximum, searchCost) * maximum;
    let result = minCount % MODULO;

    for (let num = maximum + 1; num <= maxNum; num++) {
      const count = findArrays(index + 1, num, searchCost + 1);

      result = (result + count) % MODULO;
    }

    dp[index][maximum][searchCost] = result;

    return result;
  };

  return findArrays(0, 0, 0);
};
