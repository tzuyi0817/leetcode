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
const minimumOperations = function (root) {
  let queue = [root];
  let result = 0;

  while (queue.length) {
    const nextQueue = [];
    const nodeMap = new Map();

    for (const { left, right } of queue) {
      if (left) {
        nextQueue.push(left);
        nodeMap.set(left.val, left);
      }
      if (right) {
        nextQueue.push(right);
        nodeMap.set(right.val, right);
      }
    }
    const n = nextQueue.length;
    const values = nextQueue.map(({ val }) => val).sort((a, b) => a - b);

    for (let index = 0; index < n; index++) {
      const node = nextQueue[index];

      if (node.val === values[index]) continue;
      const swapNode = nodeMap.get(values[index]);

      [node.val, swapNode.val] = [swapNode.val, node.val];
      nodeMap.set(node.val, node);
      nodeMap.set(swapNode.val, swapNode);
      result += 1;
    }
    queue = nextQueue;
  }
  return result;
};
