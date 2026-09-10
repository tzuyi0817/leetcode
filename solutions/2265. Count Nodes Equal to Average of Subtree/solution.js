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
const averageOfSubtree = function (root) {
  let result = 0;

  const dfs = node => {
    if (!node) {
      return { sum: 0, len: 0 };
    }

    const left = dfs(node.left);
    const right = dfs(node.right);
    const len = left.len + right.len + 1;
    const sum = left.sum + right.sum + node.val;
    const average = Math.floor(sum / len);

    if (average === node.val) {
      result += 1;
    }

    return { sum, len };
  };

  dfs(root);

  return result;
};
