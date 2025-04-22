/**
 * @param {number} n
 * @param {number} threshold
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const areConnected = function (n, threshold, queries) {
  const graph = new UnionFind(n + 1);

  for (let factor = threshold + 1; factor <= n; factor++) {
    for (let value = factor * 2; value <= n; value += factor) {
      graph.union(factor, value);
    }
  }

  return queries.map(([a, b]) => graph.find(a) === graph.find(b));
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = Array.from({ length: n }, () => 0);
  }

  find(node) {
    if (this.groups[node] === node) return node;

    this.groups[node] = this.find(this.groups[node]);

    return this.groups[node];
  }

  union(a, b) {
    const groupA = this.find(a);
    const groupB = this.find(b);

    if (groupA === groupB) return false;
    if (this.ranks[groupA] > this.ranks[groupB]) {
      this.groups[groupB] = groupA;
    } else if (this.ranks[groupB] > this.ranks[groupA]) {
      this.groups[groupA] = groupB;
    } else {
      this.groups[groupB] = groupA;
      this.ranks[groupA] += 1;
    }

    return true;
  }
}
