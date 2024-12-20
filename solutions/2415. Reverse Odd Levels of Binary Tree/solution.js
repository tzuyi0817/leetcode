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
const reverseOddLevels = function (root) {
  let queue = [root];
  let level = 0;

  const reverseNodesVal = nodes => {
    if (level % 2 === 0) return;
    const n = nodes.length;

    for (let index = 0; index < n / 2; index++) {
      const nodeA = nodes[index];
      const nodeB = nodes[n - index - 1];

      [nodeA.val, nodeB.val] = [nodeB.val, nodeA.val];
    }
  };

  while (queue.length) {
    const nextQueue = [];

    level += 1;

    for (const node of queue) {
      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);
      }
    }
    reverseNodesVal(nextQueue);
    queue = nextQueue;
  }
  return root;
};
