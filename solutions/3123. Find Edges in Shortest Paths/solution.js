/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean[]}
 */
const findAnswer = function (n, edges) {
  const graph = new Array(n).fill('').map(_ => []);
  const weighteds = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  const queue = new MinPriorityQueue({ priority: ({ weighted }) => weighted });
  const result = Array.from({ length: edges.length }).fill(false);

  weighteds[0] = 0;
  queue.enqueue({ node: 0, weighted: 0 });

  for (const [index, [a, b, weighted]] of edges.entries()) {
    graph[a].push({ node: b, weighted, index });
    graph[b].push({ node: a, weighted, index });
  }
  while (!queue.isEmpty()) {
    const { node, weighted } = queue.dequeue().element;

    if (weighted > weighteds[node]) continue;
    for (const to of graph[node]) {
      const totalWeighted = weighted + to.weighted;

      if (totalWeighted >= weighteds[to.node]) continue;
      weighteds[to.node] = totalWeighted;
      queue.enqueue({ node: to.node, weighted: totalWeighted });
    }
  }
  queue.enqueue({ node: n - 1, weighted: weighteds.at(-1) });

  while (!queue.isEmpty()) {
    const { node, weighted } = queue.dequeue().element;

    for (const from of graph[node]) {
      const currentWeighted = weighted - from.weighted;
      const targetWeighted = weighteds[from.node];

      if (currentWeighted !== targetWeighted) continue;
      result[from.index] = true;
      queue.enqueue({ node: from.node, weighted: targetWeighted });
    }
  }
  return result;
};
