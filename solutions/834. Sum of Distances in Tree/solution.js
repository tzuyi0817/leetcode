/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const sumOfDistancesInTree = function (n, edges) {
  const graph = new Array(n).fill('').map(_ => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const counts = new Array(n).fill(1);
  const result = new Array(n).fill(0);
  const root = 0;

  const dfsGraph = (node, parent) => {
    for (const connectedNode of graph[node]) {
      if (connectedNode === parent) continue;
      dfsGraph(connectedNode, node);
      counts[node] += counts[connectedNode];
      result[node] += result[connectedNode] + counts[connectedNode];
    }
  };

  dfsGraph(root, null);

  const sumDistance = (node, parent) => {
    for (const connectedNode of graph[node]) {
      if (connectedNode === parent) continue;
      result[connectedNode] = result[node] - counts[connectedNode] + n - counts[connectedNode];
      sumDistance(connectedNode, node);
    }
  };

  sumDistance(root, null);
  return result;
};
