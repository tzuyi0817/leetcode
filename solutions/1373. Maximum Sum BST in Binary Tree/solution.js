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
const maxSumBST = function (root) {
  let result = 0;

  const traverse = node => {
    if (!node)
      return {
        isBTS: true,
        sum: 0,
        min: Number.MAX_SAFE_INTEGER,
        max: Number.MIN_SAFE_INTEGER,
      };
    const { val } = node;
    const left = traverse(node.left);
    const right = traverse(node.right);
    const isBTS = left.isBTS && right.isBTS && val > left.max && val < right.min;

    if (isBTS) {
      const sum = val + left.sum + right.sum;

      result = Math.max(sum, result);

      return {
        isBTS: true,
        sum,
        min: Math.min(val, left.min),
        max: Math.max(val, right.max),
      };
    }

    return {
      isBTS: false,
      sum: 0,
      min: Number.MAX_SAFE_INTEGER,
      max: Number.MIN_SAFE_INTEGER,
    };
  };

  traverse(root);

  return result;
};
