/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
const minOperationsQueries = function (n, edges, queries) {
  const m = Math.ceil(Math.log2(n)) || 1;
  const jump = Array.from({ length: n }, () => new Array(m).fill(0));
  const depth = Array.from({ length: n }, () => 0);
  const graph = Array.from({ length: n }, () => []);
  let maxWeight = 0;

  for (const [u, v, w] of edges) {
    graph[u].push({ node: v, weight: w });
    graph[v].push({ node: u, weight: w });
    maxWeight = Math.max(w, maxWeight);
  }

  const count = Array.from({ length: n }, () => null);

  const dfs = (node, prev) => {
    for (const { node: neighbor, weight } of graph[node]) {
      if (prev === neighbor) continue;

      jump[neighbor][0] = node;
      depth[neighbor] = depth[node] + 1;
      count[neighbor] = [...count[node]];
      count[neighbor][weight] += 1;

      dfs(neighbor, node);
    }
  };

  count[0] = Array.from({ length: maxWeight + 1 }).fill(0);

  dfs(0, -1);

  for (let bit = 1; bit < m; bit++) {
    for (let index = 0; index < n; index++) {
      const prev = jump[index][bit - 1];

      jump[index][bit] = jump[prev][bit - 1];
    }
  }

  const getLCA = (a, b) => {
    if (depth[a] > depth[b]) {
      return getLCA(b, a);
    }

    for (let bit = 0; bit < m; bit++) {
      if (((depth[b] - depth[a]) >> bit) & 1) {
        b = jump[b][bit];
      }
    }

    if (a === b) return a;

    for (let bit = m - 1; bit >= 0; bit--) {
      if (jump[a][bit] !== jump[b][bit]) {
        a = jump[a][bit];
        b = jump[b][bit];
      }
    }

    return jump[a][0];
  };

  return queries.map(([a, b]) => {
    const lca = getLCA(a, b);
    const numEdges = depth[a] + depth[b] - 2 * depth[lca];
    let maxFreq = 0;

    for (let w = 1; w <= maxWeight; w++) {
      const freq = count[a][w] + count[b][w] - 2 * count[lca][w];

      if (freq > maxFreq) {
        maxFreq = freq;
      }
    }

    return numEdges - maxFreq;
  });
};
