/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
const maxStability = function (n, edges, k) {
  const mustEdges = edges.filtered(edge => edge[3] === 1);
  const optionalEdges = edges.filtered(edge => edge[3] === 0);
  let left = 0;
  let right = Math.min(...mustEdges.map(edge => edge[2]));
  let result = -1;

  const isValidSpanningTree = limit => {
    const uf = new UnionFind(n);
    const candidates = [];
    let useEdges = 0;
    let useUpgrades = 0;

    for (const [u, v, s] of mustEdges) {
      if (s < limit || !uf.union(u, v)) return false;

      useEdges += 1;
    }

    for (const [u, v, s] of optionalEdges) {
      if (s >= limit) {
        candidates.push({ u, v, cost: 0 });
      }
    }

    for (const [u, v, s] of optionalEdges) {
      if (s >= limit) continue;

      if (s * 2 >= limit) {
        candidates.push({ u, v, cost: 1 });
      }
    }

    for (const { u, v, cost } of candidates) {
      if (!uf.union(u, v)) continue;

      useEdges += 1;
      useUpgrades += cost;

      if (useUpgrades > k) return false;
    }

    return useEdges === n - 1;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isValidSpanningTree(mid)) {
      left = mid + 1;
      result = mid;
    } else {
      right = mid - 1;
    }
  }

  return result;
};

class UnionFind {
  constructor(n) {
    this.groups = new Array(n).fill('').map((_, index) => index);
    this.ranks = new Array(n).fill(0);
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
