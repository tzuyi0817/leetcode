/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
const minimumDiameterAfterMerge = function (edges1, edges2) {
  const getDiameter = edges => {
    const n = edges.length + 1;
    const graph = Array.from({ length: n }, () => []);

    for (const [a, b] of edges) {
      graph[a].push(b);
      graph[b].push(a);
    }
    let maxDiameter = 0;
    let edgeNode = 0;

    const dfsTree = (node, prev, diameter) => {
      if (maxDiameter < diameter) {
        maxDiameter = diameter;
        edgeNode = node;
      }

      for (const nextNode of graph[node]) {
        if (nextNode === prev) continue;

        dfsTree(nextNode, node, diameter + 1);
      }
    };

    dfsTree(0, -1, 0);
    dfsTree(edgeNode, -1, 0);

    return maxDiameter;
  };

  const diameter1 = getDiameter(edges1);
  const diameter2 = getDiameter(edges2);
  const mergedDiameter = Math.ceil(diameter1 / 2) + Math.ceil(diameter2 / 2) + 1;

  return Math.max(diameter1, diameter2, mergedDiameter);
};
