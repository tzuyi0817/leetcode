/**
 * @param {number} n
 * @param {number[][]} edges
 */
const Graph = function (n, edges) {
  this.n = n;
  this.graph = Array.from({ length: n }, () => []);

  for (const [from, to, cost] of edges) {
    this.graph[from].push({ node: to, cost });
  }
};

/**
 * @param {number[]} edge
 * @return {void}
 */
Graph.prototype.addEdge = function (edge) {
  const [from, to, cost] = edge;

  this.graph[from].push({ node: to, cost });
};

/**
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
Graph.prototype.shortestPath = function (node1, node2) {
  const dist = new Array(this.n).fill(Number.MAX_SAFE_INTEGER);
  const minHeap = new MinPriorityQueue(({ cost }) => cost);

  dist[node1] = 0;
  minHeap.enqueue({ node: node1, cost: 0 });

  while (minHeap.size()) {
    const { node, cost } = minHeap.dequeue();

    if (node === node2) return cost;

    for (const next of this.graph[node]) {
      const nextCost = next.cost + cost;

      if (nextCost < dist[next.node]) {
        dist[next.node] = nextCost;
        minHeap.enqueue({ node: next.node, cost: nextCost });
      }
    }
  }

  return -1;
};

/**
 * Your Graph object will be instantiated and called as such:
 * var obj = new Graph(n, edges)
 * obj.addEdge(edge)
 * var param_2 = obj.shortestPath(node1,node2)
 */
