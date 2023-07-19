/**
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function(root) {
    const getGoodNodesCount = (node = root, max = root.val) => {
        if (!node) return 0;
        const nextMax = Math.max(max, node.val);
        const left =  getGoodNodesCount(node.left, nextMax);
        const right =  getGoodNodesCount(node.right, nextMax);

        return left + right + (nextMax === node.val ? 1 : 0);
    };

    return getGoodNodesCount();
};
