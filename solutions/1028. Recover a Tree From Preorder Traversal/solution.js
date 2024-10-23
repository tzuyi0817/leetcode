/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
const recoverFromPreorder = function (traversal) {
  const n = traversal.length;
  let index = 0;

  const generateTree = depth => {
    let level = 0;

    while (index < n && traversal[index] === '-') {
      level += 1;
      index += 1;
    }
    if (level !== depth) {
      index -= level;
      return null;
    }
    let value = '';

    while (index < n && traversal[index] !== '-') {
      value += traversal[index];
      index += 1;
    }
    const node = new TreeNode(+value);

    node.left = generateTree(depth + 1);
    node.right = generateTree(depth + 1);

    return node;
  };

  return generateTree(0);
};
