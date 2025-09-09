/**
 * @param {number} n
 * @param {number} delay
 * @param {number} forget
 * @return {number}
 */
const peopleAwareOfSecret = function (n, delay, forget) {
  const MODULO = BigInt(10 ** 9 + 7);
  const dp = Array.from({ length: n + 1 }, () => 0n);
  let shares = 0n;
  let result = 0n;

  dp[1] = 1n;

  for (let day = 2; day <= n; day++) {
    if (forget <= day) {
      shares -= dp[day - forget];
    }

    if (delay <= day) {
      shares += dp[day - delay];
    }

    dp[day] = shares;
  }

  for (let day = n - forget + 1; day <= n; day++) {
    result = (result + dp[day]) % MODULO;
  }

  return Number(result);
};
