/**
 * @param {number} n
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const numberOfWays = function (n, x, y) {
  const MODULO = BigInt(10 ** 9 + 7);
  const maxStages = Math.min(n, x);
  const { fact, invFact } = getFactAndInvFact(Math.max(n, x), MODULO);
  const stirling = getStirling(n, maxStages, MODULO);
  let result = 0n;

  for (let stages = 1; stages <= maxStages; stages++) {
    let events = nCk(x, stages, fact, invFact, MODULO);

    events = (events * stirling[n][stages]) % MODULO;
    events = (events * fact[stages]) % MODULO;
    events = (events * modPow(BigInt(y), BigInt(stages), MODULO)) % MODULO;
    result = (result + events) % MODULO;
  }

  return Number(result);
};

function getFactAndInvFact(n, mod) {
  const fact = Array.from({ length: n + 1 }, () => 0n);
  const inv = Array.from({ length: n + 1 }, () => 0n);
  const invFact = Array.from({ length: n + 1 }, () => 0n);

  fact[0] = 1n;
  inv[0] = 1n;
  inv[1] = 1n;
  invFact[0] = 1n;

  for (let index = 1; index <= n; index++) {
    const bigIndex = BigInt(index);

    if (index >= 2) {
      const mult = mod / bigIndex;
      const remainder = Number(mod % bigIndex);

      inv[index] = mod - ((mult * inv[remainder]) % mod);
    }

    fact[index] = (fact[index - 1] * bigIndex) % mod;
    invFact[index] = (invFact[index - 1] * inv[index]) % mod;
  }

  return { fact, invFact };
}

function getStirling(n, k, mod) {
  const stirling = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0n));

  stirling[0][0] = 1n;

  for (let a = 1; a <= n; a++) {
    stirling[a][1] = 1n;

    for (let b = 2; b <= Math.min(a, k); b++) {
      stirling[a][b] = (stirling[a - 1][b] * BigInt(b)) % mod;
      stirling[a][b] = (stirling[a][b] + stirling[a - 1][b - 1]) % mod;
    }
  }

  return stirling;
}

function nCk(n, k, fact, invFact, mod) {
  return (((fact[n] * invFact[k]) % mod) * invFact[n - k]) % mod;
}

function modPow(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
