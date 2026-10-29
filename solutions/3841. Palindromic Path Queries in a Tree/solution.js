/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */
const palindromePath = function (n, edges, s, queries) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const graph = Array.from({ length: n }, () => []);
  const bit = new BIT(n);
  const starts = Array.from({ length: n }, () => 0);
  const ends = Array.from({ length: n }, () => 0);
  const depths = Array.from({ length: n }, () => 0);
  const chars = [...s];
  const MAX_LOG = 32 - Math.clz32(n);
  const ancestors = Array.from({ length: n }, () => new Array(MAX_LOG).fill(0));
  const result = [];
  let timer = 0;

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const dfs = (node, prev) => {
    timer += 1;
    starts[node] = timer;
    ancestors[node][0] = prev;

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      depths[neighbor] = depths[node] + 1;
      dfs(neighbor, node);
    }

    ends[node] = timer;
  };

  dfs(0, 0);

  for (let node = 0; node < n; node++) {
    const code = s[node].charCodeAt(0) - BASE_CODE;

    bit.updateRange(starts[node], ends[node], 1 << code);
  }

  for (let log = 1; log < MAX_LOG; log++) {
    for (let node = 0; node < n; node++) {
      const ancestor = ancestors[node][log - 1];

      ancestors[node][log] = ancestors[ancestor][log - 1];
    }
  }

  const lca = (u, v) => {
    if (depths[u] < depths[v]) {
      [u, v] = [v, u];
    }

    const diff = depths[u] - depths[v];

    for (let log = 0; log < MAX_LOG; log++) {
      if ((diff >> log) & 1) {
        u = ancestors[u][log];
      }
    }

    if (u === v) return u;

    for (let log = MAX_LOG - 1; log >= 0; log--) {
      if (ancestors[u][log] !== ancestors[v][log]) {
        u = ancestors[u][log];
        v = ancestors[v][log];
      }
    }

    return ancestors[u][0];
  };

  for (const query of queries) {
    const [type, u, v] = query.split(' ');

    if (type === 'update') {
      const prevCode = chars[u].charCodeAt(0) - BASE_CODE;
      const code = v.charCodeAt(0) - BASE_CODE;
      const delta = (1 << prevCode) ^ (1 << code);

      bit.updateRange(starts[u], ends[u], delta);
      chars[u] = v;
    } else {
      const ancestor = lca(Number(u), Number(v));
      const code = chars[ancestor].charCodeAt(0) - BASE_CODE;
      const maskU = bit.query(starts[u]);
      const maskV = bit.query(starts[v]);
      const mask = maskU ^ maskV ^ (1 << code);
      const isValid = popcount(mask) <= 1;

      result.push(isValid);
    }
  }

  return result;
};

class BIT {
  constructor(n) {
    this.n = n + 1;
    this.tree = Array.from({ length: this.n }, () => 0);
  }

  update(index, delta) {
    while (index < this.n) {
      this.tree[index] ^= delta;
      index += index & -index;
    }
  }

  query(index) {
    let result = 0;

    while (index > 0) {
      result ^= this.tree[index];
      index -= index & -index;
    }

    return result;
  }

  updateRange(l, r, delta) {
    this.update(l, delta);
    this.update(r + 1, delta);
  }
}

function popcount(x) {
  let result = 0;

  while (x) {
    x &= x - 1;
    result += 1;
  }

  return result;
}
