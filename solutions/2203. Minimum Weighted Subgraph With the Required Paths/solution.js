/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} src1
 * @param {number} src2
 * @param {number} dest
 * @return {number}
 */
const minimumWeight = function (n, edges, src1, src2, dest) {
  const graph = Array.from({ length: n }, () => []);
  const reversedGraph = Array.from({ length: n }, () => []);

  const dijkstra = (graph, start) => {
    const dist = Array.from({ length: n }, () => Number.MAX_SAFE_INTEGER);
    const minHeap = new MinPriorityQueue(({ sum }) => sum);

    dist[start] = 0;
    minHeap.enqueue({ node: start, sum: 0 });

    while (minHeap.size()) {
      const { node, sum } = minHeap.dequeue();

      if (sum > dist[node]) continue;

      for (const { node: to, weight } of graph[node]) {
        const nextSum = sum + weight;

        if (nextSum > dist[to]) continue;

        dist[to] = nextSum;
        minHeap.enqueue({ node: to, sum: nextSum });
      }
    }

    return dist;
  };

  for (const [from, to, weight] of edges) {
    graph[from].push({ node: to, weight });
    reversedGraph[to].push({ node: from, weight });
  }

  const fromSrc1 = dijkstra(graph, src1);
  const fromSrc2 = dijkstra(graph, src2);
  const fromDest = dijkstra(reversedGraph, dest);
  let result = Number.MAX_SAFE_INTEGER;

  for (let node = 0; node < n; node++) {
    const sum = fromSrc1[node] + fromSrc2[node] + fromDest[node];

    result = Math.min(sum, result);
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
