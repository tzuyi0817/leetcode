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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
    const result = [];

    const dfsTreeNode = (node) => {
        if (!node) return null;
        const { left, right, val } = node;

        node.left = dfsTreeNode(left);
        node.right = dfsTreeNode(right);

        if (to_delete.includes(val)) {
            node.left && result.push(left);
            node.right && result.push(right);
            return null;
        }
        return node;
    };

    if (!to_delete.includes(root.val)) result.push(root);

    dfsTreeNode(root);
    return result;
};