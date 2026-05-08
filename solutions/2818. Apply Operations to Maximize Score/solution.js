/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumScore = function (nums, k) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const sieve = Array.from({ length: maxNum + 1 }, (_, index) => index);

  for (let a = 2; a * a <= maxNum; a++) {
    if (sieve[a] !== a) continue;

    for (let b = a * a; b <= maxNum; b += a) {
      if (sieve[b] === b) {
        sieve[b] = a;
      }
    }
  }

  const getPrimeScore = num => {
    let score = 0;

    while (num > 1) {
      const prime = sieve[num];

      score += 1;

      while (num % prime === 0) {
        num /= prime;
      }
    }

    return score;
  };

  const primeScores = nums.map(getPrimeScore);
  const left = Array.from({ length: n }, () => -1);
  const right = Array.from({ length: n }, () => n);
  let stack = [];

  for (let index = 0; index < n; index++) {
    const score = primeScores[index];

    while (stack.length && primeScores[stack.at(-1)] < score) {
      stack.pop();
    }

    if (stack.length) {
      left[index] = stack.at(-1);
    }

    stack.push(index);
  }

  stack = [];

  for (let index = n - 1; index >= 0; index--) {
    const score = primeScores[index];

    while (stack.length && primeScores[stack.at(-1)] <= score) {
      stack.pop();
    }

    if (stack.length) {
      right[index] = stack.at(-1);
    }

    stack.push(index);
  }

  const numToIndices = nums.map((num, index) => ({ num, index }));
  let remainingK = k;
  let result = 1n;

  numToIndices.sort((a, b) => b.num - a.num);

  for (const { num, index } of numToIndices) {
    const count = (index - left[index]) * (right[index] - index);
    const actualCount = Math.min(remainingK, count);

    remainingK -= actualCount;
    result *= modPow(BigInt(num), BigInt(actualCount), MODULO);
    result %= MODULO;

    if (remainingK < 1n) return Number(result);
  }

  return Number(result);
};

function modPow(base, exp, mod) {
  let result = 1n;

  base %= mod;

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
