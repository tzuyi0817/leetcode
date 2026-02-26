/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} price
 * @return {number}
 */
const maxOutput = function (n, edges, price) {
  const tree = Array.from({ length: n }, () => []);
  const maxSums = Array.from({ length: n }, () => 0);
  let result = 0;

  const maxSum = (node, prev) => {
    let maxChildSum = 0;

    for (const child of tree[node]) {
      if (prev === child) continue;

      const childSum = maxSum(child, node);

      maxChildSum = Math.max(childSum, maxChildSum);
    }

    maxSums[node] = price[node] + maxChildSum;

    return maxSums[node];
  };

  const reroot = (node, prev, parentSum) => {
    let maxChildSum1 = 0;
    let maxChildSum2 = 0;
    let maxChild = -1;

    for (const child of tree[node]) {
      if (child === prev) continue;

      if (maxSums[child] > maxChildSum1) {
        maxChildSum2 = maxChildSum1;
        maxChildSum1 = maxSums[child];
        maxChild = child;
      } else if (maxSums[child] > maxChildSum2) {
        maxChildSum2 = maxSums[child];
      }
    }

    if (tree[node].length === 1) {
      result = Math.max(maxChildSum1, parentSum, result);
    }

    for (const child of tree[node]) {
      if (child === prev) continue;

      const childSum = maxChild === child ? maxChildSum2 : maxChildSum1;
      const nextParentSum = price[node] + Math.max(childSum, parentSum);

      reroot(child, node, nextParentSum);
    }
  };

  for (const [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  maxSum(0, -1);
  reroot(0, -1, 0);

  return result;
};
