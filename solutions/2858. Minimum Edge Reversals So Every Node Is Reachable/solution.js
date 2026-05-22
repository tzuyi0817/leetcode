/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const minEdgeReversals = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const result = Array.from({ length: n }, () => 0);

  for (const [u, v] of edges) {
    graph[u].push({ node: v, isForward: true });
    graph[v].push({ node: u, isForward: false });
  }

  const getMinReversals = (node, prev) => {
    let result = 0;

    for (const { node: neighbor, isForward } of graph[node]) {
      if (neighbor === prev) continue;

      result += getMinReversals(neighbor, node) + (isForward ? 0 : 1);
    }

    return result;
  };

  const dfs = (node, prev) => {
    for (const { node: neighbor, isForward } of graph[node]) {
      if (neighbor === prev) continue;

      result[neighbor] = result[node] + (isForward ? 1 : -1);
      dfs(neighbor, node);
    }
  };

  result[0] = getMinReversals(0, -1);
  dfs(0, -1);

  return result;
};
