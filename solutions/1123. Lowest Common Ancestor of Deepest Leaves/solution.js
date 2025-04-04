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
const lcaDeepestLeaves = function (root) {
  const findDeepestAncestor = node => {
    if (!node) return { node: null, deep: 0 };
    const left = findDeepestAncestor(node.left);
    const right = findDeepestAncestor(node.right);

    if (left.deep > right.deep) return { node: left.node, deep: left.deep + 1 };
    if (left.deep < right.deep) return { node: right.node, deep: right.deep + 1 };

    return { node, deep: left.deep + 1 };
  };

  return findDeepestAncestor(root).node;
};
