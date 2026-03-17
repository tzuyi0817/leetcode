/**
 * @param {number[]} nums
 * @return {number}
 */
const findValidSplit = function (nums) {
  const n = nums.length;
  const leftPrimeFactors = new Set();
  const rightPrimeMap = new Map();

  const getPrimeFactors = num => {
    const factorMap = new Map();

    for (let x = 2; x ** 2 <= num; x++) {
      while (num % x === 0) {
        const count = factorMap.get(x) ?? 0;

        factorMap.set(x, count + 1);
        num /= x;
      }
    }

    if (num > 1) {
      const count = factorMap.get(num) ?? 0;

      factorMap.set(num, count + 1);
    }

    return factorMap;
  };

  for (const num of nums) {
    const factorMap = getPrimeFactors(num);

    for (const [prime, count] of factorMap) {
      const primeCount = rightPrimeMap.get(prime) ?? 0;

      rightPrimeMap.set(prime, primeCount + count);
    }
  }

  for (let index = 0; index < n - 1; index++) {
    const num = nums[index];
    const factorMap = getPrimeFactors(num);

    for (const [prime, count] of factorMap) {
      const primeCount = rightPrimeMap.get(prime) ?? 0;

      if (count >= primeCount) {
        rightPrimeMap.delete(prime);
        leftPrimeFactors.delete(prime);
      } else {
        rightPrimeMap.set(prime, primeCount - count);
        leftPrimeFactors.add(prime);
      }
    }

    if (!leftPrimeFactors.size) return index;
  }

  return -1;
};
