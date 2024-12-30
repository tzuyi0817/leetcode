/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
const countGoodStrings = function (low, high, zero, one) {
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: high + 1 }, () => 0);
  let result = 0;

  dp[0] = 1;

  for (let length = 1; length <= high; length++) {
    if (length >= zero) {
      dp[length] = (dp[length] + dp[length - zero]) % MODULO;
    }
    if (length >= one) {
      dp[length] = (dp[length] + dp[length - one]) % MODULO;
    }
    if (length < low) continue;
    result = (result + dp[length]) % MODULO;
  }
  return result;
};
