/**
 * @param {number[][]} edges
 * @param {number} maxMoves
 * @param {number} n
 * @return {number}
 */
const reachableNodes = function (edges, maxMoves, n) {
  const graph = new Array(n).fill('').map(_ => []);
  const queue = new MinPriorityQueue({ priority: ({ moves }) => moves });
  const movedes = new Array(n).fill(-1);
  let result = 0;

  for (const [a, b, cnt] of edges) {
    graph[a].push({ node: b, cnt });
    graph[b].push({ node: a, cnt });
  }
  queue.enqueue({ node: 0, moves: 0 });

  while (queue.size()) {
    const { node, moves } = queue.dequeue().element;

    if (movedes[node] !== -1) continue;
    movedes[node] = moves;
    result += 1;

    for (const { node: nextNode, cnt } of graph[node]) {
      const nextMoves = moves + cnt + 1;

      if (nextMoves > maxMoves) continue;
      queue.enqueue({ node: nextNode, moves: nextMoves });
    }
  }

  for (const [a, b, cnt] of edges) {
    const ab = movedes[a] === -1 ? 0 : maxMoves - movedes[a];
    const ba = movedes[b] === -1 ? 0 : maxMoves - movedes[b];

    result += Math.min(cnt, ab + ba);
  }
  return result;
};
