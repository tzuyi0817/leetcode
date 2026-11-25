/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
const countComponents = function (nums, threshold) {
  const uf = new UnionFind(threshold + 1);
  const groupSet = new Set();

  for (const num of nums) {
    for (let multiple = num * 2; multiple <= threshold; multiple += num) {
      uf.union(num, multiple);
    }
  }

  for (const num of nums) {
    const group = uf.find(num) ?? num;

    groupSet.add(group);
  }

  return groupSet.size;
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = Array.from({ length: n }, () => 0);
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

    if (this.ranks[groupX] > this.ranks[groupY]) {
      this.groups[groupY] = groupX;
    } else if (this.ranks[groupX] < this.ranks[groupY]) {
      this.groups[groupX] = groupY;
    } else {
      this.groups[groupY] = groupX;
      this.ranks[groupX] += 1;
    }

    return true;
  }
}
