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
 * @param {number} distance
 * @return {number}
 */
var countPairs = function(root, distance) {
    let result = 0;
    const dfsTreeNode = (node = root) => {
        const distances = Array(distance + 1).fill(0);
        if (!node) return distances;
        const { left, right } = node;
        if (!left && !right) {
            distances[0] = 1;
            return distances;
        }
        const leftDistances = dfsTreeNode(left);
        const rightDistances = dfsTreeNode(right);

        for (let l = 0; l < distance; l++) {
            for (let r = 0; r < distance; r++) {
                if (l + r + 2 > distance) continue;
                result += leftDistances[l] * rightDistances[r];
            }
        }
        for (let index = 1; index <= distance; index++) {
            distances[index] = leftDistances[index - 1] + rightDistances[index - 1];
        }
        return distances;
    };

    dfsTreeNode();
    return result;
};
