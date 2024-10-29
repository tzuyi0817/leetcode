/**
 * @param {number[]} arr
 * @return {number}
 */
const numOfSubarrays = function (arr) {
  const MODULO = 10 ** 9 + 7;
  const size = arr.length;
  const dp = new Array(size + 1).fill('').map(_ => ({ odd: 0, even: 0 }));
  let result = 0;

  for (let index = 1; index <= size; index++) {
    const value = arr[index - 1];

    if (value % 2) {
      dp[index].odd = dp[index - 1].even + 1;
      dp[index].even = dp[index - 1].odd;
    } else {
      dp[index].odd = dp[index - 1].odd;
      dp[index].even = dp[index - 1].even + 1;
    }
    result += dp[index].odd;
  }
  return result % MODULO;
};
