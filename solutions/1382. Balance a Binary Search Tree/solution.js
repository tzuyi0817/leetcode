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
 * @return {TreeNode}
 */
const balanceBST = function (root) {
  const values = [];

  const dfs = node => {
    if (!node) return;

    const { val, left, right } = node;

    values.push(val);
    dfs(left);
    dfs(right);
  };

  dfs(root);

  const n = values.length;

  values.sort((a, b) => a - b);

  const generateBalanceTree = (left, right) => {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const val = values[mid];
    const node = new TreeNode(val);

    node.left = generateBalanceTree(left, mid - 1);
    node.right = generateBalanceTree(mid + 1, right);

    return node;
  };

  return generateBalanceTree(0, n - 1);
};
