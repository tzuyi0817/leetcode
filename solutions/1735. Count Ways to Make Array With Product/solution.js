/**
 * @param {number[][]} queries
 * @return {number[]}
 */
const waysToFillArray = function (queries) {
  let maxN = 0;
  let maxK = 0;

  for (const [n, k] of queries) {
    maxN = Math.max(n, maxN);
    maxK = Math.max(k, maxK);
  }

  const MODULO = BigInt(10 ** 9 + 7);
  const minPrimeSieve = Array.from({ length: maxK + 1 }, (_, index) => index);
  const duplicateN = Math.ceil(Math.log2(maxN));
  const totalN = maxN + duplicateN;
  const nCk = Array.from({ length: totalN + 1 }, () => new Array(duplicateN + 1).fill(1n));

  minPrimeSieve[0] = 0;
  minPrimeSieve[1] = 0;

  for (let num = 2; num ** 2 <= maxK; num++) {
    if (minPrimeSieve[num] !== num) continue;

    for (let factor = num ** 2; factor <= maxK; factor += num) {
      minPrimeSieve[factor] = num;
    }
  }

  for (let a = 2; a <= totalN; a++) {
    for (let b = 1; b < Math.min(duplicateN + 1, a); b++) {
      nCk[a][b] = nCk[a - 1][b - 1] + nCk[a - 1][b];
    }
  }

  const getPrimeCountMap = num => {
    const result = new Map();

    while (num > 1) {
      const prime = minPrimeSieve[num];
      let count = 0;

      while (num % prime === 0) {
        num /= prime;
        count += 1;
      }

      result.set(prime, count);
    }

    return result;
  };

  return queries.map(([n, k]) => {
    const primeCountMap = getPrimeCountMap(k);
    let ways = 1n;

    for (const count of primeCountMap.values()) {
      ways = (ways * nCk[n + count - 1][count]) % MODULO;
    }

    return Number(ways);
  });
};
