/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @param {number} k
 * @return {number[]}
 */
const maxTargetNodes = function (edges1, edges2, k) {
  const createTree = (edges, n) => {
    const tree = Array.from({ length: n }, () => []);

    for (const [a, b] of edges) {
      tree[a].push(b);
      tree[b].push(a);
    }

    return tree;
  };

  const m = edges1.length + 1;
  const n = edges2.length + 1;
  const tree1 = createTree(edges1, m);
  const tree2 = createTree(edges2, n);

  const getConnectNodeCount = (tree, node, prev, distance) => {
    if (distance < 0) return 0;
    if (distance === 0) return 1;
    let result = 1;

    for (const neighbor of tree[node]) {
      if (neighbor === prev) continue;

      result += getConnectNodeCount(tree, neighbor, node, distance - 1);
    }

    return result;
  };

  const result = Array.from({ length: m }, () => 0);
  let maxCount = 0;

  for (let node = 0; node < n; node++) {
    const connectCount = getConnectNodeCount(tree2, node, -1, k - 1);

    maxCount = Math.max(connectCount, maxCount);
  }

  for (let node = 0; node < m; node++) {
    const connectCount = getConnectNodeCount(tree1, node, -1, k);

    result[node] = connectCount + maxCount;
  }

  return result;
};
