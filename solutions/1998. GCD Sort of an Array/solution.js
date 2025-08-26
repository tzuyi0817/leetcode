/**
 * @param {number[]} nums
 * @return {boolean}
 */
const gcdSort = function (nums) {
  const maxNum = Math.max(...nums);
  const sortedNums = [...nums].sort((a, b) => a - b);
  const uf = new UnionFind(maxNum + 1);
  const minPrimeSieve = Array.from({ length: maxNum + 1 }, (_, index) => index);

  minPrimeSieve[0] = 0;
  minPrimeSieve[1] = 0;

  const getPrimeFactors = num => {
    const result = [];

    while (num > 1) {
      const prime = minPrimeSieve[num];

      result.push(prime);

      while (num % prime === 0) {
        num /= prime;
      }
    }

    return result;
  };

  for (let num = 2; num * num <= maxNum; num++) {
    if (minPrimeSieve[num] !== num) continue;

    for (let factor = num * num; factor <= maxNum; factor += num) {
      minPrimeSieve[factor] = num;
    }
  }

  for (const num of nums) {
    const primeFactors = getPrimeFactors(num);

    for (const factor of primeFactors) {
      uf.union(num, factor);
    }
  }

  return nums.every((num, index) => uf.find(num) === uf.find(sortedNums[index]));
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = Array.from({ length: n }, () => 0);
  }

  find(node) {
    if (this.groups[node] === node) return node;
    const group = this.find(this.groups[node]);

    this.groups[node] = group;
    return group;
  }

  union(a, b) {
    const groupA = this.find(a);
    const groupB = this.find(b);

    if (groupA === groupB) return false;
    if (this.ranks[groupA] > this.ranks[groupB]) {
      this.groups[groupB] = groupA;
    } else if (this.ranks[groupA] < this.ranks[groupB]) {
      this.groups[groupA] = groupB;
    } else {
      this.groups[groupB] = groupA;
      this.ranks[groupA] += 1;
    }

    return true;
  }
}
