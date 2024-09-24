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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
const getDirections = function (root, startValue, destValue) {
  const getStepPath = (node, target, path = '') => {
    if (!node) return '';
    if (node.val === target) return path;

    const { left, right } = node;
    const leftPath = getStepPath(left, target, `${path}L`);

    if (leftPath) return leftPath;
    return getStepPath(right, target, `${path}R`);
  };

  const startPath = getStepPath(root, startValue);
  const endPath = getStepPath(root, destValue);
  let start = 0;

  while (startPath[start] === endPath[start]) start += 1;

  return 'U'.repeat(startPath.length - start) + endPath.slice(start);
};
