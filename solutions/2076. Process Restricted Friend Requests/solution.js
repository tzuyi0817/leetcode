/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @param {number[][]} requests
 * @return {boolean[]}
 */
const friendRequests = function (n, restrictions, requests) {
  const uf = new UnionFind(n);

  const isValidRequest = (u, v) => {
    const groupU = uf.find(u);
    const groupV = uf.find(v);

    if (groupU === groupV) return true;

    for (const [x, y] of restrictions) {
      const groupX = uf.find(x);
      const groupY = uf.find(y);

      if (groupU === groupX && groupV === groupY) return false;
      if (groupU === groupY && groupV === groupX) return false;
    }

    return true;
  };

  return requests.map(([u, v]) => {
    if (isValidRequest(u, v)) {
      uf.union(u, v);

      return true;
    }

    return false;
  });
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
