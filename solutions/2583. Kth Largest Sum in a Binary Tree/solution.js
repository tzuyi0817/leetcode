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
 * @param {number} k
 * @return {number}
 */
const kthLargestLevelSum = function (root, k) {
  const sums = [];
  let queue = [root];
  let level = 0;

  while (queue.length) {
    const nextQueue = [];

    sums[level] = 0;

    for (const { val, left, right } of queue) {
      sums[level] += val;
      if (left) nextQueue.push(left);
      if (right) nextQueue.push(right);
    }
    queue = nextQueue;
    level += 1;
  }
  sums.sort((a, b) => b - a);

  return sums[k - 1] ?? -1;
};
