/**
 * @param {number[]} parents
 * @return {number}
 */

class Node {
    left = null;
    right = null;

    constructor(val) {
        this.val = val;
    }
};

var countHighestScoreNodes = function(parents) {
    const n = parents.length;
    const nodes = Array(n).fill('').map((_, index) => new Node(index));
    const scoreMap = {};
    let maxScore = 0;

    for (let index = 1; index < n; index++) {
        const node = nodes[index];
        const parent = nodes[parents[index]];

        parent.left ? parent.right = node : parent.left = node;
    }

    function dfsNodeTree(node = nodes[0]) {
        if (!node) return 0;
        const left = dfsNodeTree(node.left);
        const right =  dfsNodeTree(node.right);
        const count = left + right + 1;
        const restCount = n - count;
        const score = (left || 1) * (right || 1) * (restCount || 1);

        scoreMap[score] = (scoreMap[score] ?? 0) + 1;
        maxScore = Math.max(score, maxScore);
        return count;
    }

    dfsNodeTree();
    return scoreMap[maxScore];
};