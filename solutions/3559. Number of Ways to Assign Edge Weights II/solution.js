/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
const assignEdgeWeights = function (edges, queries) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = edges.length + 1;
  const maxLog = 32 - Math.clz32(n);
  const depth = Array.from({ length: n + 1 }, () => 0);
  const graph = Array.from({ length: n + 1 }, () => []);
  const parent = Array.from({ length: maxLog }, () => {
    return new Array(n + 1).fill(-1);
  });

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const dfs = (node, prev) => {
    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      parent[0][neighbor] = node;
      depth[neighbor] = depth[node] + 1;
      dfs(neighbor, node);
    }
  };

  dfs(1, -1);

  for (let log = 1; log < maxLog; log++) {
    for (let node = 1; node <= n; node++) {
      const prev = parent[log - 1][node];

      if (prev === -1) continue;

      parent[log][node] = parent[log - 1][prev];
    }
  }

  const lca = (a, b) => {
    if (depth[a] < depth[b]) {
      return lca(b, a);
    }

    for (let log = maxLog - 1; log >= 0; log--) {
      const prev = parent[log][a];

      if (prev !== -1 && depth[prev] >= depth[b]) {
        a = prev;
      }
    }

    if (a === b) return b;

    for (let log = maxLog - 1; log >= 0; log--) {
      if (parent[log][a] !== -1 && parent[log][a] !== parent[log][b]) {
        a = parent[log][a];
        b = parent[log][b];
      }
    }

    return parent[0][a];
  };

  return queries.map(([u, v]) => {
    if (u === v) return 0;

    const ancestor = lca(u, v);
    const d = depth[u] + depth[v] - 2 * depth[ancestor];

    return modPow(2, d - 1, MODULO);
  });
};

function modPow(base, exp, mod) {
  let result = 1n;

  base = BigInt(base);
  exp = BigInt(exp);

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return Number(result);
}
