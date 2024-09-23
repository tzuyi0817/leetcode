/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function(root) {
    const result = [];

    const dfsTree = (node) => {
        if (!node) return;
        const { val, children } = node;

        for (const child of children) {
            dfsTree(child);
        }
        result.push(val);
    };

    dfsTree(root);
    return result;
};