/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @return {number}
 */
const numberOfGoodPaths = function (vals, edges) {
  const n = vals.length;
  const uf = new UnionFind(n);
  const graph = Array.from({ length: n }, () => []);
  const valToNodes = new Map();

  for (const [a, b] of edges) {
    if (vals[a] <= vals[b]) {
      graph[b].push(a);
    }

    if (vals[a] >= vals[b]) {
      graph[a].push(b);
    }
  }

  for (let node = 0; node < n; node++) {
    const val = vals[node];

    if (!valToNodes.has(val)) {
      valToNodes.set(val, []);
    }

    valToNodes.get(val).push(node);
  }

  const sortedVals = [...valToNodes.keys()].toSorted((a, b) => a - b);
  let result = n;

  for (const val of sortedVals) {
    const nodes = valToNodes.get(val);

    for (const node of nodes) {
      for (const neighbor of graph[node]) {
        uf.union(node, neighbor);
      }
    }

    const countMap = new Map();

    for (const node of nodes) {
      const group = uf.find(node);
      const count = countMap.get(group) ?? 0;

      countMap.set(group, count + 1);
    }

    for (const count of countMap.values()) {
      result += (count * (count - 1)) / 2;
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
    const groupA = this.find(x);
    const groupB = this.find(y);

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
