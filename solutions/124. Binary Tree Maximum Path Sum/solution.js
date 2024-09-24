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
const maxPathSum = function (root) {
  let result = Number.MIN_SAFE_INTEGER;
  const sumPath = (node = root) => {
    if (!node) return 0;
    const { val, left, right } = node;
    const leftSum = val + sumPath(left);
    const rightSum = val + sumPath(right);
    const maxPathSum = Math.max(leftSum, rightSum, val);
    const sum = leftSum + rightSum - val;

    result = Math.max(sum, result, maxPathSum);
    return maxPathSum;
  };

  sumPath();
  return result;
};
