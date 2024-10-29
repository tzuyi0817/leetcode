/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const findMinHeightTrees = function (n, edges) {
  if (n === 1) return [0];
  const graph = edges.reduce((map, [a, b]) => {
    const aToNodes = map.get(a) ?? new Set();
    const bToNodes = map.get(b) ?? new Set();

    aToNodes.add(b);
    bToNodes.add(a);
    map.set(a, aToNodes);
    return map.set(b, bToNodes);
  }, new Map());
  let queue = [];

  for (const [node, toNodes] of graph) {
    if (toNodes.size > 1) continue;
    queue.push(node);
  }

  while (n > 2) {
    const nextQueue = [];

    for (const node of queue) {
      const toNodes = graph.get(node);

      for (const toNode of toNodes) {
        const toNodePath = graph.get(toNode);

        toNodePath.delete(node);
        if (toNodePath.size !== 1) continue;
        nextQueue.push(toNode);
      }
    }
    n -= queue.length;
    queue = nextQueue;
  }
  return queue;
};
