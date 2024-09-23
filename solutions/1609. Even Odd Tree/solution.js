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
var isEvenOddTree = function(root) {
    const queue = [root];      
    let currentLevel = 'even';

    while (queue.length) {
        const size = queue.length;
        const isEvenLevel = currentLevel === 'even';
        let preNodeVal = 0;

        for (let index = 0; index < size; index++) {
            const { val, left, right } = queue.shift();
            const isOddVal = val % 2;

            if (isEvenLevel) {
                if (!isOddVal) return false;
                if (preNodeVal && preNodeVal >= val) return false;
            } else {
                if (isOddVal) return false;
                if (preNodeVal && preNodeVal <= val) return false;
            }
            preNodeVal = val;
            left && queue.push(left);
            right && queue.push(right);
        }
        currentLevel = isEvenLevel ? 'odd' : 'even';
    }
    return true;
};
