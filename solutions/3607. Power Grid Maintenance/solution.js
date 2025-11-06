/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
const processQueries = function (c, connections, queries) {
  const OFFLINE = 2;
  const uf = new UnionFind(c + 1);
  const connected = Array.from({ length: c + 1 }, () => true);
  const powerGrids = Array.from({ length: c + 1 }, () => []);
  const girdPointer = Array.from({ length: c + 1 }, () => 0);
  const result = [];

  for (const [u, v] of connections) {
    uf.union(u, v);
  }

  for (let station = 1; station <= c; station++) {
    const group = uf.find(station);

    powerGrids[group].push(station);
  }

  for (const [type, station] of queries) {
    if (type === OFFLINE) {
      connected[station] = false;
      continue;
    }

    if (connected[station]) {
      result.push(station);
    } else {
      const group = uf.find(station);
      const powerGrid = powerGrids[group];
      let index = girdPointer[group];

      while (index < powerGrid.length && !connected[powerGrid[index]]) {
        index += 1;
      }

      girdPointer[group] = index;
      result.push(powerGrid[index] ?? -1);
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
    const groupsX = this.find(x);
    const groupsY = this.find(y);

    if (groupsX === groupsY) return false;
    if (this.ranks[groupsX] > this.ranks[groupsY]) {
      this.groups[groupsY] = groupsX;
    } else if (this.ranks[groupsX] < this.ranks[groupsY]) {
      this.groups[groupsX] = groupsY;
    } else {
      this.groups[groupsY] = groupsX;
      this.ranks[groupsX] += 1;
    }

    return true;
  }
}
