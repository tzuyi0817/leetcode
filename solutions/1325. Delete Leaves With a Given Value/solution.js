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
 * @param {number} target
 * @return {TreeNode}
 */
const removeLeafNodes = function (root, target) {
  const removeNode = node => {
    if (!node) return null;
    const { val, right, left } = node;

    node.left = removeNode(left);
    node.right = removeNode(right);

    if (!node.left && !node.right && val === target) return null;
    return node;
  };

  return removeNode(root);
};
