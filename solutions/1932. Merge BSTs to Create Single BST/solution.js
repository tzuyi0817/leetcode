/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode[]} trees
 * @return {TreeNode}
 */
const canMerge = function (trees) {
  const countMap = new Map();
  const valToNodeMap = new Map();

  const isValidBST = (node, minNode, maxNode) => {
    if (!node) return true;
    if (minNode && node.val <= minNode.val) return false;
    if (maxNode && node.val >= maxNode.val) return false;

    if (!node.left && !node.right && valToNodeMap.has(node.val)) {
      const margeNode = valToNodeMap.get(node.val);

      node.left = margeNode.left;
      node.right = margeNode.right;
      valToNodeMap.delete(node.val);
    }

    return isValidBST(node.left, minNode, node) && isValidBST(node.right, node, maxNode);
  };

  for (const tree of trees) {
    const { val, left, right } = tree;
    const count = countMap.get(val) ?? 0;

    countMap.set(val, count + 1);
    valToNodeMap.set(val, tree);

    if (left) {
      const leftValCount = countMap.get(left.val) ?? 0;

      countMap.set(left.val, leftValCount + 1);
    }

    if (right) {
      const rightValCount = countMap.get(right.val) ?? 0;

      countMap.set(right.val, rightValCount + 1);
    }
  }

  for (const tree of trees) {
    const count = countMap.get(tree.val);

    if (count > 1) continue;
    if (isValidBST(tree, null, null) && valToNodeMap.size <= 1) {
      return tree;
    }

    return null;
  }

  return null;
};
