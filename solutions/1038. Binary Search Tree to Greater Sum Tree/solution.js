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
const bstToGst = function (root) {
  let sum = 0;

  const sumBst = node => {
    if (!node) return;
    const { val, left, right } = node;

    sumBst(right);
    sum += val;
    node.val = sum;
    sumBst(left);
  };

  sumBst(root);
  return root;
};
