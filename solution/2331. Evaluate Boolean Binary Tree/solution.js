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
 * @return {boolean}
 */
var evaluateTree = function(root) {
    const evaluateMap = {
        0: false,
        1: true,
        2: (a, b) => a || b,
        3: (a, b) => a && b,
    };
    const evaluateNode = (node) => {
        const { val } = node;
        const evaluate = evaluateMap[val];

        if (val < 2) return evaluate;
        const left = evaluateNode(node.left);
        const right = evaluateNode(node.right);

        return evaluate(left, right);
    };

    return evaluateNode(root);
};