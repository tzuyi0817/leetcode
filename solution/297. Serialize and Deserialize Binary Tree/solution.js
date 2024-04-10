/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let queue = [root];
    let result = '';

    while (queue.length) {
        const nextQueue = [];

        for (const node of queue) {
            if (node) {
                nextQueue.push(node.left);
                nextQueue.push(node.right);
                result += `${node.val} `;
                continue;
            }
            result += 'null ';
        }
        queue = nextQueue;
    }
    return result.trimEnd();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    const nodes = data.split(' ');
    if (nodes[0] === 'null') return null;
    const root = new TreeNode(nodes[0]);
    const queue = [root];
    const createNode = (value) => value === 'null' ? null : new TreeNode(value);

    for (let index = 1; index < nodes.length; index += 2) {
        const node = queue.shift();

        node.left = createNode(nodes[index]);
        node.right = createNode(nodes[index + 1]);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
    return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */