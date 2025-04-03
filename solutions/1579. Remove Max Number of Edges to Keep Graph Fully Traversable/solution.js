/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const maxNumEdgesToRemove = function (n, edges) {
  const ALICE = 1;
  const BOB = 2;
  const BOTH = 3;
  const alice = new UnionFind(n);
  const bob = new UnionFind(n);
  let result = 0;

  for (const [type, u, v] of edges) {
    if (type !== BOTH) continue;
    const aliceUnion = alice.union(u, v);
    const bobUnion = bob.union(u, v);

    if (aliceUnion && bobUnion) continue;

    result += 1;
  }

  for (const [type, u, v] of edges) {
    if (type === ALICE && !alice.union(u, v)) {
      result += 1;
    }

    if (type === BOB && !bob.union(u, v)) {
      result += 1;
    }
  }

  if (alice.n !== 1 || bob.n !== 1) return -1;

  return result;
};

class UnionFind {
  constructor(n) {
    this.n = n;
    this.groups = Array.from({ length: n + 1 }, (_, index) => index);
    this.ranks = Array.from({ length: n + 1 }, () => 0);
  }

  find(node) {
    if (this.groups[node] === node) return node;

    this.groups[node] = this.find(this.groups[node]);

    return this.groups[node];
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

    this.n -= 1;

    return true;
  }
}
