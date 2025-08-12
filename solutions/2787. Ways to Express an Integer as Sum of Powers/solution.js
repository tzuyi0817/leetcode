/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
const numberOfWays = function (n, x) {
  const MODULO = BigInt(10 ** 9 + 7);
  const powers = [];

  for (let base = 1; Math.pow(base, x) <= n; base++) {
    const power = Math.pow(base, x);

    powers.push(power);
  }

  const dp = Array.from({ length: n + 1 }, () => {
    return new Array(powers.length + 1).fill(-1);
  });

  const sumPower = (index, remainder) => {
    if (remainder === 0) return 1n;
    if (remainder < 0 || index >= powers.length) return 0n;
    if (dp[remainder][index] !== -1) return dp[remainder][index];
    let result = sumPower(index + 1, remainder);

    if (powers[index] <= remainder) {
      const nextRemainder = remainder - powers[index];

      result = (result + sumPower(index + 1, nextRemainder)) % MODULO;
    }

    dp[remainder][index] = result;

    return result;
  };

  return Number(sumPower(0, n));
};
