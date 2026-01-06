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
const maxLevelSum = function (root) {
  let level = 1;
  let queue = [root];
  let maxSum = Number.MIN_SAFE_INTEGER;
  let result = 0;

  while (queue.length) {
    const nextQueue = [];
    let sum = 0;

    for (const { val, left, right } of queue) {
      sum += val;

      if (left) {
        nextQueue.push(left);
      }

      if (right) {
        nextQueue.push(right);
      }
    }

    if (sum > maxSum) {
      result = level;
      maxSum = sum;
    }

    level += 1;
    queue = nextQueue;
  }

  return result;
};
