/**
 * @param {number} n
 * @return {number}
 */
const countVowelStrings = function (n) {
  const dp = Array(5).fill(1);

  for (let count = 2; count <= n; count++) {
    let sum = 0;
    for (let index = 0; index < 5; index++) {
      sum += dp[index];
      dp[index] = sum;
    }
  }
  return dp.reduce((result, count) => result + count);
};
