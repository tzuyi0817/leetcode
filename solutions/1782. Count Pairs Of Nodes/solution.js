/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} queries
 * @return {number[]}
 */
const countPairs = function (n, edges, queries) {
  const counts = Array.from({ length: n + 1 }, () => 0);
  const connectedMap = new Map();

  for (const [u, v] of edges) {
    const minNode = Math.min(u, v);
    const maxNode = Math.max(u, v);

    if (!connectedMap.has(minNode)) {
      connectedMap.set(minNode, new Map());
    }
    const connected = connectedMap.get(minNode);
    const connectedCount = connected.get(maxNode) ?? 0;

    connected.set(maxNode, connectedCount + 1);
    counts[u] += 1;
    counts[v] += 1;
  }

  const sortedCounts = counts.toSorted((a, b) => a - b);

  return queries.map(query => {
    let left = 1;
    let right = n;
    let count = 0;

    while (left < right) {
      if (sortedCounts[left] + sortedCounts[right] > query) {
        count += right - left;
        right -= 1;
      } else {
        left += 1;
      }
    }

    for (const [u, connected] of connectedMap) {
      for (const [v, connectedCount] of connected) {
        if (counts[u] + counts[v] <= query) continue;
        if (counts[u] + counts[v] - connectedCount <= query) {
          count -= 1;
        }
      }
    }

    return count;
  });
};
