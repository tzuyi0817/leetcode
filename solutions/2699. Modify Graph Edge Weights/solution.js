/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @param {number} target
 * @return {number[][]}
 */
const modifiedGraphEdges = function (n, edges, source, destination, target) {
  const kMax = 2000000000;
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    if (w === -1) continue;

    graph[u].push({ node: v, w });
    graph[v].push({ node: u, w });
  }

  const dijkstra = (src, dst) => {
    const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);

    const minHeap = new MinPriorityQueue(({ dist }) => dist);

    dist[src] = 0;
    minHeap.enqueue({ dist: 0, node: src });

    while (!minHeap.isEmpty()) {
      const item = minHeap.dequeue();

      if (item.dist > dist[item.node]) continue;

      if (item.node === dst) return item.dist;

      for (const { node, w } of graph[item.node]) {
        const nextDist = item.dist + w;

        if (nextDist < dist[node]) {
          dist[node] = nextDist;
          minHeap.enqueue({ dist: nextDist, node });
        }
      }
    }

    return dist[dst];
  };

  let distToDestination = dijkstra(source, destination);

  if (distToDestination < target) return [];

  if (distToDestination === target) {
    for (const edge of edges) {
      if (edge[2] === -1) {
        edge[2] = kMax;
      }
    }

    return edges;
  }

  for (let index = 0; index < edges.length; index++) {
    const [u, v, w] = edges[index];

    if (w !== -1) continue;

    edges[index][2] = 1;
    graph[u].push({ node: v, w: 1 });
    graph[v].push({ node: u, w: 1 });

    distToDestination = dijkstra(source, destination);

    if (distToDestination <= target) {
      edges[index][2] += target - distToDestination;

      for (let j = index + 1; j < edges.length; j++) {
        if (edges[j][2] === -1) {
          edges[j][2] = kMax;
        }
      }

      return edges;
    }
  }

  return [];
};
