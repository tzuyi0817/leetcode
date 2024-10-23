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
const replaceValueInTree = function (root) {
  let queue = [{ node: root, parent: new TreeNode() }];
  let depthSum = 0;

  while (queue.length) {
    const nextQueue = [];
    let nextDepthSum = 0;

    for (const { node, parent } of queue) {
      const childSum = (node.left?.val ?? 0) + (node.right?.val ?? 0);

      node.val = depthSum - (parent.childSum ?? 0);
      node.childSum = childSum;
      nextDepthSum += childSum;
      if (node.left) nextQueue.push({ node: node.left, parent: node });
      if (node.right) nextQueue.push({ node: node.right, parent: node });
    }
    depthSum = nextDepthSum;
    queue = nextQueue;
  }
  return root;
};
