/**
 * @param {number[][]} edges
 * @return {number[]}
 */
const findRedundantDirectedConnection = function (edges) {
  const graph = new Map();
  const n = edges.length;
  let firstEntrance = (secondEntrance = null);

  for (const edge of edges) {
    const [parent, child] = edge;

    if (graph.has(child)) {
      firstEntrance = [graph.get(child), child];
      secondEntrance = [parent, child];
      edge[1] = 0;
      continue;
    }
    graph.set(child, parent);
  }

  const unionFind = node => {
    if (!graph.has(node)) return node;
    return unionFind(graph.get(node));
  };

  graph.clear();

  for (const [parent, child] of edges) {
    const from = unionFind(parent);
    const to = unionFind(child);

    if (from === to) return firstEntrance ?? [parent, child];
    graph.set(to, from);
  }
  return secondEntrance;
};
