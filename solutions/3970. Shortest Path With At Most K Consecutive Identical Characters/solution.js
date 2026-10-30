/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @param {number} k
 * @return {number}
 */
const shortestPath = function (n, edges, labels, k) {
  const graph = Array.from({ length: n }, () => []);
  const minHeap = new MinHeap(({ weighted }) => weighted);
  const dist = Array.from({ length: n }, () => {
    return new Array(k + 1).fill(Number.MAX_SAFE_INTEGER);
  });

  for (const [u, v, w] of edges) {
    graph[u].push({ node: v, weighted: w });
  }

  minHeap.push({ node: 0, weighted: 0, consecutive: 1 });

  while (minHeap.size()) {
    const { node, weighted, consecutive } = minHeap.pop();

    if (node === n - 1) return weighted;

    if (weighted >= dist[node][consecutive]) continue;

    const label = labels[node];

    dist[node][consecutive] = weighted;

    for (const next of graph[node]) {
      const nextLabel = labels[next.node];
      const nextConsecutive = nextLabel === label ? consecutive + 1 : 1;

      if (nextConsecutive > k) continue;

      const nextWeighted = weighted + next.weighted;

      if (nextWeighted >= dist[next.node][nextConsecutive]) continue;

      minHeap.push({
        node: next.node,
        weighted: nextWeighted,
        consecutive: nextConsecutive,
      });
    }
  }

  return -1;
};
