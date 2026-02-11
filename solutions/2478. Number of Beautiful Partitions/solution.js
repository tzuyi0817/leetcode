/**
 * @param {string} s
 * @param {number} k
 * @param {number} minLength
 * @return {number}
 */
const beautifulPartitions = function (s, k, minLength) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  const primes = new Set(['2', '3', '5', '7']);

  if (!primes.has(s[0]) || primes.has(s[n - 1])) return 0;

  const dp = Array.from({ length: n }, () => new Array(k).fill(-1));

  const getPartitions = (index, parts) => {
    if (index <= n && parts === 0) return 1;

    if (index >= n) return 0;

    if (dp[index][parts] !== -1) return dp[index][parts];

    const isPrevPrime = primes.has(s[index - 1]);
    const isPrime = primes.has(s[index]);
    let result = getPartitions(index + 1, parts);

    if (isPrime && !isPrevPrime) {
      const count = getPartitions(index + minLength, parts - 1);

      result = (result + count) % MODULO;
    }

    dp[index][parts] = result;

    return result;
  };

  return getPartitions(minLength, k - 1);
};
