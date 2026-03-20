/**
 * @param {number[]} coins
 * @param {number[][]} edges
 * @return {number}
 */
const collectTheCoins = function (coins, edges) {
  const n = coins.length;
  const tree = Array.from({ length: n }, () => new Set());
  let distance = 2;
  let leavesToBeRemove = [];

  for (const [u, v] of edges) {
    tree[u].add(v);
    tree[v].add(u);
  }

  for (let index = 0; index < n; index++) {
    let node = index;

    while (tree[node].size === 1 && !coins[node]) {
      const [neighbor] = [...tree[node]];

      tree[node].clear();
      tree[neighbor].delete(node);
      node = neighbor;
    }

    if (tree[node].size === 1) {
      leavesToBeRemove.push(node);
    }
  }

  while (distance) {
    const nextToBeRemove = [];

    for (const node of leavesToBeRemove) {
      if (!tree[node].size) continue;

      const [neighbor] = [...tree[node]];

      tree[node].clear();
      tree[neighbor].delete(node);

      if (tree[neighbor].size === 1) {
        nextToBeRemove.push(neighbor);
      }
    }

    leavesToBeRemove = nextToBeRemove;
    distance -= 1;
  }

  return tree.reduce((result, node) => result + node.size, 0);
};
