/**
 * @param {number[][]} edges
 * @return {number}
 */
const assignEdgeWeights = function (edges) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = edges.length + 1;
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const getDepth = (node, prev) => {
    if (!graph[node]) return 0;

    let result = 0;

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      const depth = 1 + getDepth(neighbor, node);

      result = Math.max(depth, result);
    }

    return result;
  };

  const depth = getDepth(1, 0);

  return Number(2n ** (BigInt(depth) - 1n) % MODULO);
};
