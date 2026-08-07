/**
 * @param {number[][]} queries
 * @return {number[]}
 */
const findProductsOfElements = function (queries) {
  return queries.map(([from, to, mod]) => {
    const bigForm = BigInt(from);
    const bigTo = BigInt(to);
    const bigMod = BigInt(mod);
    const powers = getSumPowersK(bigTo + 1n) - getSumPowersK(bigForm);

    return Number(modPow(2n, powers, bigMod));
  });
};

function getSumPowers(num) {
  const len = BigInt(num.toString(2).length);
  let sum = 0n;
  let powerTwo = 1n;

  for (let bit = 0n; bit < len; bit++) {
    const base = powerTwo * 2n;
    const others = (num % base) + 1n - powerTwo;

    sum += (num / base) * powerTwo * bit;

    if (others > 0n) {
      sum += others * bit;
    }

    powerTwo *= 2n;
  }

  return sum;
}

function getSumBits(num) {
  let bits = 0n;

  for (let powerTwo = 1n; powerTwo <= num; powerTwo *= 2n) {
    const base = powerTwo * 2n;
    const others = (num % base) + 1n - powerTwo;

    bits += (num / base) * powerTwo;

    if (others > 0n) {
      bits += others;
    }
  }

  return bits;
}

function findFirstGreaterEqualSumBits(k) {
  let left = 1n;
  let right = k;

  while (left <= right) {
    const mid = (left + right) / 2n;

    getSumBits(mid) >= k ? (right = mid - 1n) : (left = mid + 1n);
  }

  return left;
}

function getSumPowersK(k) {
  const num = findFirstGreaterEqualSumBits(k);
  const len = BigInt(num.toString(2).length);
  let sumPowers = getSumPowers(num - 1n);
  let remainBitCount = k - getSumBits(num - 1n);

  for (let bit = 0n; bit < len; bit++) {
    if ((num >> bit) & 1n) {
      sumPowers += bit;
      remainBitCount -= 1n;
    }

    if (!remainBitCount) return sumPowers;
  }

  return sumPowers;
}

function modPow(base, exp, mod) {
  if (mod === 1n) return 0n;

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
