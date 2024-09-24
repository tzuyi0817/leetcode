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
const pseudoPalindromicPaths = function (root) {
  const getPalindromicPaths = (node = root, hash = new Set()) => {
    if (!node) return 0;
    const { val } = node;
    const isPalindromic = hash.has(val);

    isPalindromic ? hash.delete(val) : hash.add(val);
    const left = getPalindromicPaths(node.left, hash);
    const right = getPalindromicPaths(node.right, hash);
    const isPalindromicPath = hash.size < 2;

    isPalindromic ? hash.add(val) : hash.delete(val);
    if (!node.left && !node.right) return isPalindromicPath ? 1 : 0;
    return left + right;
  };

  return getPalindromicPaths();
};
