const MODULO = BigInt(10 ** 9 + 7);
const MAX_LEN = 10 ** 5;
const inv = Array.from({ length: MAX_LEN + 1 }, () => 1n);
const fact = Array.from({ length: MAX_LEN + 1 }, () => 1n);
const invFact = Array.from({ length: MAX_LEN + 1 }, () => 1n);

for (let num = 2; num <= MAX_LEN; num++) {
  const value = BigInt(num);
  const multiple = MODULO / value;
  const remainder = Number(MODULO % value);

  inv[num] = MODULO - ((multiple * inv[remainder]) % MODULO);
}

for (let num = 2; num <= MAX_LEN; num++) {
  const value = BigInt(num);

  fact[num] = (fact[num - 1] * value) % MODULO;
  invFact[num] = (invFact[num - 1] * inv[num]) % MODULO;
}

/**
 * @param {number} n
 * @param {number[]} sick
 * @return {number}
 */
const numberOfSequence = function (n, sick) {
  const uninfectedPersons = n - sick.length;
  let prevSick = -1;
  let result = fact[uninfectedPersons];

  for (const index of sick) {
    const uninfected = index - prevSick - 1;

    result = (result * invFact[uninfected]) % MODULO;

    if (uninfected && prevSick > -1) {
      result = (result * modPow(2, uninfected - 1, MODULO)) % MODULO;
    }

    prevSick = index;
  }

  result = (result * invFact[n - prevSick - 1]) % MODULO;

  return Number(result);
};

function modPow(base, exp, mod) {
  let result = 1n;

  base = BigInt(base);
  exp = BigInt(exp);

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
