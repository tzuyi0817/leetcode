/**
 * @param {number} n
 * @param {number[]} parent
 */
const TreeAncestor = function (n, parent) {
  const maxDepth = Math.ceil(Math.log2(n));
  const dp = Array.from({ length: n }, () => new Array(maxDepth).fill(-1));

  for (let node = 0; node < n; node++) {
    dp[node][0] = parent[node];
  }

  for (let depth = 1; depth < maxDepth; depth++) {
    for (let node = 0; node < n; node++) {
      const ancestor = dp[node][depth - 1];

      if (ancestor === -1) continue;

      dp[node][depth] = dp[ancestor][depth - 1];
    }
  }

  this.maxDepth = maxDepth;
  this.dp = dp;
};

/**
 * @param {number} node
 * @param {number} k
 * @return {number}
 */
TreeAncestor.prototype.getKthAncestor = function (node, k) {
  let result = node;

  for (let depth = 0; depth < this.maxDepth; depth++) {
    if ((k >> depth) & 1) {
      result = this.dp[result][depth];
    }
    if (result === -1) return -1;
  }

  return result === node ? -1 : result;
};

/**
 * Your TreeAncestor object will be instantiated and called as such:
 * var obj = new TreeAncestor(n, parent)
 * var param_1 = obj.getKthAncestor(node,k)
 */
