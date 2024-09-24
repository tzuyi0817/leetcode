/**
 * @param {number} n
 * @return {number}
 */
const minSteps = function (n) {
  const dp = Array(n + 1).fill(0);

  for (let index = 2; index <= n; index++) {
    let operations = index;

    for (let num = Math.floor(index / 2); num > 1; num--) {
      if (index % num) continue;
      const times = index / num;

      operations = dp[num] + times;
      break;
    }
    dp[index] = operations;
  }
  return dp[n];
};
