/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
const maxTargetNodes = function (edges1, edges2) {
  const createTree = (edge, n) => {
    const tree = Array.from({ length: n }, () => []);

    for (const [a, b] of edge) {
      tree[a].push(b);
      tree[b].push(a);
    }

    return tree;
  };

  const m = edges1.length + 1;
  const n = edges2.length + 1;
  const tree1 = createTree(edges1, m);
  const tree2 = createTree(edges2, n);

  const getNodeCount = (tree, isEven) => {
    const count = Array.from({ length: 2 }, () => 0);

    const dfsTree = (node, prev, index) => {
      count[index] += 1;

      for (const neighbor of tree[node]) {
        if (prev === neighbor) continue;

        dfsTree(neighbor, node, index ^ 1);
      }
    };

    dfsTree(0, -1, isEven ? 1 : 0);

    return count;
  };

  const count1 = getNodeCount(tree1, true);
  const count2 = getNodeCount(tree2, false);
  const maxPathCount = Math.max(...count2);
  const path = Array.from({ length: m }, () => false);

  const setNodePath = (node, prev, isEven) => {
    path[node] = isEven;

    for (const neighbor of tree1[node]) {
      if (prev === neighbor) continue;

      setNodePath(neighbor, node, !isEven);
    }
  };

  setNodePath(0, -1, true);

  return path.map(isEven => maxPathCount + count1[isEven ? 1 : 0]);
};
