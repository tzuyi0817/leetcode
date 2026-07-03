/**
 * @param {number[][]} edges
 * @param {boolean[]} online
 * @param {number} k
 * @return {number}
 */
const findMaxPathScore = function (edges, online, k) {
  const n = online.length;
  const graph = Array.from({ length: n }, () => []);
  let left = Number.MAX_SAFE_INTEGER;
  let right = 0;

  for (const [u, v, cost] of edges) {
    if (!online[u] || !online[v]) continue;

    graph[u].push({ node: v, cost });
    left = Math.min(cost, left);
    right = Math.max(cost, right);
  }

  const isValidCost = targetCost => {
    const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    const minHeap = new MinHeap(({ cost }) => cost);

    minHeap.push({ node: 0, cost: 0 });
    dist[0] = 0;

    while (minHeap.size()) {
      const { cost, node } = minHeap.pop();

      if (cost > k) return false;

      if (node === n - 1) return true;

      if (cost !== dist[node]) continue;

      for (const neighbor of graph[node]) {
        if (neighbor.cost < targetCost) continue;

        const nextCost = cost + neighbor.cost;

        if (nextCost >= dist[neighbor.node]) continue;

        minHeap.push({ node: neighbor.node, cost: nextCost });
        dist[neighbor.node] = nextCost;
      }
    }

    return false;
  };

  if (!isValidCost(left)) return -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    isValidCost(mid) ? (left = mid + 1) : (right = mid - 1);
  }

  return right;
};
