/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canTraverseAllPairs = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);

  const sieveEratosthenes = n => {
    const primeFactors = Array.from({ length: n + 1 }, (_, index) => index);

    for (let num = 2; num <= n; num++) {
      if (primeFactors[num] !== num) continue;

      for (let factor = num * num; factor <= n; factor += num) {
        if (primeFactors[factor] === factor) {
          primeFactors[factor] = num;
        }
      }
    }

    return primeFactors;
  };

  const primeFactors = sieveEratosthenes(maxNum);
  const factorMap = new Map();
  const uf = new UnionFind(n);

  const getPrimeFactors = num => {
    const factors = [];

    while (num > 1) {
      const divisor = primeFactors[num];

      factors.push(divisor);

      while (num % divisor === 0) {
        num = Math.floor(num / divisor);
      }
    }

    return factors;
  };

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const factors = getPrimeFactors(num);

    for (const factor of factors) {
      if (factorMap.has(factor)) {
        uf.union(factorMap.get(factor), index);
      } else {
        factorMap.set(factor, index);
      }
    }
  }

  return uf.maxSize === n;
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.sizes = Array.from({ length: n }, () => 1);
    this.maxSize = 1;
  }

  find(x) {
    if (this.groups[x] === x) return x;

    this.groups[x] = this.find(this.groups[x]);

    return this.groups[x];
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) return false;

    if (this.sizes[groupX] >= this.sizes[groupY]) {
      this.groups[groupY] = groupX;
      this.sizes[groupX] += this.sizes[groupY];
      this.maxSize = Math.max(this.sizes[groupX], this.maxSize);
    } else {
      this.groups[groupX] = groupY;
      this.sizes[groupY] += this.sizes[groupX];
      this.maxSize = Math.max(this.sizes[groupY], this.maxSize);
    }

    return true;
  }
}
