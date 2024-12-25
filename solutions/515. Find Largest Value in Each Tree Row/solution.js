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
 * @return {number[]}
 */
const largestValues = function (root) {
  if (!root) return [];
  const result = [];
  let queue = [root];

  while (queue.length) {
    const nextQueue = [];
    let largestValue = Number.MIN_SAFE_INTEGER;

    for (const { val, left, right } of queue) {
      if (left) nextQueue.push(left);
      if (right) nextQueue.push(right);

      largestValue = Math.max(val, largestValue);
    }
    result.push(largestValue);
    queue = nextQueue;
  }
  return result;
};
