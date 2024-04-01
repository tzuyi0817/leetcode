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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function(root, startValue, destValue) {
    let LCA = startNode = endNode = null;

    function dfsLCA(node = root) {
        if (!node) return false;
        const { val: value, left, right } = node;
        const isStartNode = value === startValue;

        if (isStartNode || value === destValue) {
            isStartNode ? startNode = node : endNode = node;
            return true;  
        }
        const isFindedLeft = dfsLCA(left);
        const isFindedRight = dfsLCA(right);

        if (isFindedLeft && isFindedRight) LCA = node;
        return isFindedLeft || isFindedRight;
    }
    function stepNode(node, target, isFromParent = false, dir = '') {
        if (!node) return '';
        const { val: value, left, right } = node;

        if (value === target) return dir;
        const leftValue = stepNode(left, target, isFromParent, isFromParent ? 'U' : 'L');
        const rightValue = stepNode(right, target, isFromParent, isFromParent ? 'U' : 'R');
        const direction = leftValue || rightValue ? dir : '';

        return direction + leftValue + rightValue;
    }

    dfsLCA();
    return stepNode(LCA ?? endNode, startValue, true) + stepNode(LCA ?? startNode, destValue);
};