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
var balanceBST = function(root) {
    const values = [];
    const getBSTValue = (node) => {
        if (!node) return;
        const { val, left, right } = node;

        values.push(val);
        getBSTValue(left);
        getBSTValue(right);
    };

    getBSTValue(root);
    values.sort((a, b) => a - b);

    const createBST = (start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(values[mid]);

        node.left = createBST(start, mid - 1);
        node.right = createBST(mid + 1, end);
        return node;
    };

    return createBST(0, values.length - 1);
};
