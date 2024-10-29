/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
const maxProbability = function (n, edges, succProb, start_node, end_node) {
  const graph = new Array(n).fill('').map(_ => []);
  const probs = new Array(n).fill(0);
  const queue = new MaxPriorityQueue({ priority: ({ prob }) => prob });

  for (const [index, [a, b]] of edges.entries()) {
    graph[a].push({ node: b, prob: succProb[index] });
    graph[b].push({ node: a, prob: succProb[index] });
  }
  probs[start_node] = 1;
  queue.enqueue({ node: start_node, prob: 1 });

  while (queue.size()) {
    const { node, prob } = queue.dequeue().element;

    for (const arrive of graph[node]) {
      const nextProb = arrive.prob * prob;

      if (nextProb <= probs[arrive.node]) continue;
      probs[arrive.node] = nextProb;
      queue.enqueue({ node: arrive.node, prob: nextProb });
    }
  }
  return probs[end_node];
};
