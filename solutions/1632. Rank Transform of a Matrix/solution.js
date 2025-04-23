/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
const matrixRankTransform = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const valueMap = new Map();

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = matrix[row][col];

      if (!valueMap.has(value)) {
        valueMap.set(value, []);
      }

      valueMap.get(value).push({ row, col });
    }
  }

  const sortedValues = [...valueMap.keys()].sort((a, b) => a - b);
  const ranks = Array.from({ length: m + n }, () => 0);
  const result = Array.from({ length: m }, () => new Array(n).fill(0));

  for (const value of sortedValues) {
    const uf = new UnionFind();

    for (const { row, col } of valueMap.get(value)) {
      uf.union(row, col + m);
    }
    const groups = uf.getGroups();

    for (const ids of groups.values()) {
      let maxRank = 0;

      for (const id of ids) {
        maxRank = Math.max(ranks[id], maxRank);
      }

      for (const id of ids) {
        ranks[id] = maxRank + 1;
      }
    }

    for (const { row, col } of valueMap.get(value)) {
      result[row][col] = ranks[row];
    }
  }

  return result;
};

class UnionFind {
  constructor() {
    this.groupMap = new Map();
  }

  find(x) {
    if (!this.groupMap.has(x)) {
      this.groupMap.set(x, x);
    }

    if (this.groupMap.get(x) !== x) {
      const group = this.groupMap.get(x);

      this.groupMap.set(x, this.find(group));
    }

    return this.groupMap.get(x);
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) return false;

    this.groupMap.set(groupX, groupY);

    return true;
  }

  getGroups() {
    const groups = new Map();

    for (const x of this.groupMap.keys()) {
      const group = this.find(x);

      if (!groups.has(group)) {
        groups.set(group, []);
      }

      groups.get(group).push(x);
    }

    return groups;
  }
}
