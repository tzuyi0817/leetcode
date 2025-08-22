/**
 * @param {number[]} nums
 * @return {number}
 */
const numberOfGoodSubsets = function (nums) {
  const MOD = BigInt(10 ** 9 + 7);
  const freq = Array.from({ length: 31 }, () => 0n);
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const masks = Array.from({ length: 31 }, () => -1);

  for (const num of nums) {
    freq[num] += 1n;
  }

  for (let num = 2; num <= 30; num++) {
    let mask = 0;
    let current = num;
    let valid = true;

    for (const [index, prime] of primes.entries()) {
      let count = 0;

      while (current % prime === 0) {
        current /= prime;
        count++;
      }

      if (count > 1) {
        valid = false;
        break;
      }

      if (count === 1) {
        mask |= 1 << index;
      }
    }

    if (valid) {
      masks[num] = mask;
    }
  }

  const dp = Array.from({ length: 1 << primes.length }, () => 0n);

  dp[0] = 1n;

  for (let num = 2; num <= 30; num++) {
    if (freq[num] === 0n || masks[num] === -1) continue;

    const mask = masks[num];

    for (let state = (1 << primes.length) - 1; state >= 0; state--) {
      if ((state & mask) === 0) {
        dp[state | mask] = (dp[state | mask] + dp[state] * freq[num]) % MOD;
      }
    }
  }

  let result = 0n;

  for (let state = 1; state < 1 << primes.length; state++) {
    result = (result + dp[state]) % MOD;
  }

  if (freq[1] > 0n) {
    result = (result * modPow(2n, freq[1], MOD)) % MOD;
  }

  return Number(result);
};

function modPow(base, exp, mod) {
  let res = 1n;

  while (exp > 0n) {
    if (exp & 1n) {
      res = (res * base) % mod;
    }

    base = (base * base) % mod;
    exp >>= 1n;
  }

  return res;
}
