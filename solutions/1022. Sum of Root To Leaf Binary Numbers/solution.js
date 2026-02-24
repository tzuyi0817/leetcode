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
const sumRootToLeaf = function (root) {
  const sumBinaryNums = (node, value) => {
    if (!node) return 0;

    const { left, right, val } = node;
    const nextValue = (value << 1) | val;

    if (!left && !right) return nextValue;

    const leftSum = sumBinaryNums(left, nextValue);
    const rightSum = sumBinaryNums(right, nextValue);

    return leftSum + rightSum;
  };

  return sumBinaryNums(root, 0);
};
