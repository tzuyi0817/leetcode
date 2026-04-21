/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
const minimumHammingDistance = function (source, target, allowedSwaps) {
  const n = source.length;
  const uf = new UnionFind(n);
  const sourceMap = new Map();
  let result = 0;

  for (const [a, b] of allowedSwaps) {
    uf.union(a, b);
  }

  for (let index = 0; index < n; index++) {
    const group = uf.find(index);

    if (!sourceMap.has(group)) {
      sourceMap.set(group, new Map());
    }

    const valueMap = sourceMap.get(group);
    const value = source[index];
    const count = valueMap.get(value) ?? 0;

    valueMap.set(value, count + 1);
  }

  for (let index = 0; index < n; index++) {
    const group = uf.find(index);
    const valueMap = sourceMap.get(group);
    const value = target[index];
    const count = valueMap.get(value);

    if (count) {
      valueMap.set(value, count - 1);
    } else {
      result += 1;
    }
  }

  return result;
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
