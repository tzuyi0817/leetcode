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
 * @return {number[][]}
 */
const verticalTraversal = function (root) {
  const columMap = {};
  let queue = [{ node: root, col: 0 }];

  while (queue.length) {
    const nextQueue = [];
    const currentColumnMap = {};

    for (const { node, col } of queue) {
      if (!currentColumnMap[col]) currentColumnMap[col] = [];

      currentColumnMap[col].push(node.val);
      if (node.left) {
        nextQueue.push({ node: node.left, col: col - 1 });
      }
      if (node.right) {
        nextQueue.push({ node: node.right, col: col + 1 });
      }
    }
    Object.entries(currentColumnMap).forEach(([col, values]) => {
      values.sort((a, b) => a - b);

      if (!columMap[col]) columMap[col] = [];
      columMap[col].push(...values);
    });
    queue = nextQueue;
  }
  const columns = Object.entries(columMap).sort((a, b) => a[0] - b[0]);

  return columns.map(column => column[1]);
};
