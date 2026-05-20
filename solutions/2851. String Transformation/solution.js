/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {number}
 */
const numberOfWays = function (s, t, k) {
  const kMod = BigInt(10 ** 9 + 7);
  const n = s.length;
  const BigK = BigInt(k);
  const BigN = BigInt(n);
  const negOnePowK = BigK % 2n === 0n ? 1n : -1n;
  const z = zFunction(s + t + t);
  const indices = getIndices(z, n);
  const dp = [0, 0];
  let dp1 = (modPow(BigN - 1n, BigK, kMod) - negOnePowK + kMod) % kMod;
  let result = 0n;

  dp1 = (dp1 * modPow(BigN, kMod - 2n, kMod)) % kMod;
  dp[1] = dp1;
  dp[0] = (dp[1] + negOnePowK + kMod) % kMod;

  for (const index of indices) {
    result = (result + dp[index === 0 ? 0 : 1]) % kMod;
  }

  return Number(result);
};

function modPow(base, exp, kMod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % kMod;
    }

    base = (base * base) % kMod;
    exp /= 2n;
  }

  return result;
}

function zFunction(s) {
  const n = s.length;
  const z = Array.from({ length: n }, () => 0);
  let l = 0;
  let r = 0;

  for (let index = 1; index < n; index++) {
    if (index < r) {
      z[index] = Math.min(r - index, z[index - l]);
    }

    while (index + z[index] < n && s[z[index]] === s[index + z[index]]) {
      z[index] += 1;
    }

    if (index + z[index] > r) {
      l = index;
      r = index + z[index];
    }
  }

  return z;
}

function getIndices(z, n) {
  const indices = [];

  for (let index = n; index < n + n; index++) {
    if (z[index] >= n) {
      indices.push(index - n);
    }
  }

  return indices;
}
