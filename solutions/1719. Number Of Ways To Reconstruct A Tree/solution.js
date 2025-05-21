/**
 * @param {number[][]} pairs
 * @return {number}
 */
const checkWays = function (pairs) {
  const graph = new Map();

  for (const [x, y] of pairs) {
    if (!graph.has(x)) graph.set(x, []);
    if (!graph.has(y)) graph.set(y, []);

    graph.get(x).push(y);
    graph.get(y).push(x);
  }

  const m = Math.max(...graph.keys());
  const indegree = Array.from({ length: m + 1 }, () => 0);
  const connected = Array.from({ length: m + 1 }, () => {
    return Array.from({ length: m + 1 }, () => false);
  });

  for (const [x, y] of pairs) {
    indegree[x] += 1;
    indegree[y] += 1;
    connected[x][y] = true;
    connected[y][x] = true;
  }

  const root = indegree.indexOf(graph.size - 1);

  if (root === -1) return 0;
  const visited = Array.from({ length: m + 1 }, () => false);
  const ancestors = [];
  let multipleWays = false;

  for (const nodes of graph.values()) {
    nodes.sort((a, b) => indegree[b] - indegree[a]);
  }

  const isReconstructTree = node => {
    const isConnected = ancestors.every(ancestor => connected[ancestor][node]);

    visited[node] = true;

    if (!isConnected) return false;

    ancestors.push(node);

    for (const neighbor of graph.get(node)) {
      if (visited[neighbor]) continue;
      if (indegree[node] === indegree[neighbor]) {
        multipleWays = true;
      }
      if (!isReconstructTree(neighbor)) return false;
    }

    ancestors.pop();

    return true;
  };

  if (!isReconstructTree(root)) return 0;

  return multipleWays ? 2 : 1;
};
