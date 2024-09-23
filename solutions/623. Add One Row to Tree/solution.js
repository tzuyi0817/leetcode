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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function(root, val, depth) {
    if (depth === 1) return new TreeNode(val, root);
    let queue = [root];
    let currentDeep = 1;

    while (currentDeep < depth) {
        const nextQueue = [];

        currentDeep += 1;
        for (const node of queue) {
            const { left, right } = node;

            if (currentDeep === depth) {
                node.left = new TreeNode(val, left);
                node.right = new TreeNode(val, null, right);
                continue;
            }
            left && nextQueue.push(left);
            right && nextQueue.push(right);
        }
        queue = nextQueue;
    }
    return root;
};