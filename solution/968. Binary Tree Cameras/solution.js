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
 * @return {number}
 */
var minCameraCover = function(root) {
    const LEAF = 0;
    const CAMERA = 1;
    const PARENT = 2;
    let result = 0;

    const setupCamera = (node) => {
        if (!node) return PARENT;
        const left = setupCamera(node.left);
        const right = setupCamera(node.right);

        if (left === LEAF || right === LEAF) {
            result += 1;
            return CAMERA;
        }
        return left === CAMERA || right === CAMERA ? PARENT : LEAF;
    };

    const node = setupCamera(root);

    return result + (node === LEAF ? 1 : 0);
};