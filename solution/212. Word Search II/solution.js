/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    const m = board.length;
    const n = board[0].length;
    const result = [];
    const trie = { children: new Map() };
    const backtracking = (row, col, node = trie) => {
        if (row < 0 || col < 0 || row >= m || col >= n) return;
        const value = board[row][col];
        const nextNode = node.children.get(value);

        if (value === '#' || !nextNode) return;
        if (nextNode.word) {
            result.push(nextNode.word);
            nextNode.word = null;
        }
        if (!nextNode.children.size) {
            node.children.delete(value);
            return;
        }
        board[row][col] = '#';
        backtracking(row + 1, col, nextNode);
        backtracking(row - 1, col, nextNode);
        backtracking(row, col + 1, nextNode);
        backtracking(row, col - 1, nextNode);
        board[row][col] = value;
    };

    for (const word of words) {
        let node = trie;

        for (const char of word) {
            const nextNode = node.children.get(char) ?? { children: new Map() };

            node.children.set(char, nextNode);
            node = nextNode;
        }
        node.word = word;
    }
    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            backtracking(row, col);
        }
    }
    return result;
};