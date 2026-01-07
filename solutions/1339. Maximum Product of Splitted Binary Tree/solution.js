/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxProduct = function (root) {
  const MODULO = 10 ** 9 + 7;
  let result = 0;

  const dfs = (node, totalSum) => {
    if (!node) return 0;

    const { left, right, val } = node;
    const leftSum = dfs(left, totalSum);
    const rightSum = dfs(right, totalSum);

    if (totalSum) {
      const leftProduct = (totalSum - leftSum) * leftSum;
      const rightProduct = (totalSum - rightSum) * rightSum;

      result = Math.max(leftProduct, rightProduct, result);
    }

    return val + leftSum + rightSum;
  };

  const totalSum = dfs(root);

  dfs(root, totalSum);

  return result % MODULO;
};
