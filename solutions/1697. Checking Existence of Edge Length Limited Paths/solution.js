/**
 * @param {number} n
 * @param {number[][]} edgeList
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const distanceLimitedPathsExist = function (n, edgeList, queries) {
  const m = queries.length;
  const indexedQueries = queries.map((query, index) => ({ query, index }));
  const uf = new UnionFind(n);
  const result = Array.from({ length: m }, () => false);
  let edge = 0;

  edgeList.sort((a, b) => a[2] - b[2]);
  indexedQueries.sort((a, b) => a.query[2] - b.query[2]);

  for (const { query, index } of indexedQueries) {
    const [p, q, limit] = query;

    while (edge < edgeList.length && edgeList[edge][2] < limit) {
      const [u, v] = edgeList[edge];

      uf.union(u, v);
      edge += 1;
    }

    if (uf.find(p) === uf.find(q)) {
      result[index] = true;
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
    const group = this.find(this.groups[x]);

    this.groups[x] = group;

    return group;
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
