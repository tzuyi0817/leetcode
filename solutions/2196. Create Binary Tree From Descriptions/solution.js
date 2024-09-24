/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
const createBinaryTree = function (descriptions) {
  const nodeMap = new Map();
  const isRootMap = new Map();

  for (const [parent, child, isLeft] of descriptions) {
    if (!nodeMap.has(parent)) nodeMap.set(parent, new TreeNode(parent));
    if (!nodeMap.has(child)) nodeMap.set(child, new TreeNode(child));

    const parentNode = nodeMap.get(parent);
    const chidNode = nodeMap.get(child);

    isLeft ? (parentNode.left = chidNode) : (parentNode.right = chidNode);

    isRootMap.set(child, false);
    if (isRootMap.has(parent) && !isRootMap.get(parent)) continue;
    isRootMap.set(parent, true);
  }

  for (const [node, isRoot] of isRootMap) {
    if (isRoot) return nodeMap.get(node);
  }
};
