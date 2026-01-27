/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const minCost = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const dist = Array.from({ length: n }, () => Number.MAX_SAFE_INTEGER);
  const visited = Array.from({ length: n }, () => false);
  const minHeap = new MinPriorityQueue(({ cost }) => cost);

  for (const [u, v, cost] of edges) {
    graph[u].push({ node: v, cost });
    graph[v].push({ node: u, cost: cost * 2 });
  }

  dist[0] = 0;
  minHeap.enqueue({ node: 0, cost: 0 });

  while (minHeap.size()) {
    const { node, cost } = minHeap.dequeue();

    if (visited[node]) continue;
    if (node === n - 1) return cost;

    visited[node] = true;

    for (const neighbor of graph[node]) {
      const totalCost = cost + neighbor.cost;

      if (totalCost >= dist[neighbor.node]) continue;

      dist[neighbor.node] = totalCost;
      minHeap.enqueue({ node: neighbor.node, cost: totalCost });
    }
  }

  return -1;
};
