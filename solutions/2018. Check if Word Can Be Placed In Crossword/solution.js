/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var placeWordInCrossword = function(board, word) {
    const m = board.length;
    const n = board[0].length;
    const isCorner = (cell) => cell === '#' || cell === undefined; 
    const isCanPlaced = (row, col, moveX, moveY) => {
        for (let index = 0; index < word.length; index++) {
            const letter = board[row]?.[col];

            if (letter !== word[index] && letter !== ' ') return false;
            row += moveY;
            col += moveX;
        }
        return isCorner(board[row]?.[col]);
    };

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (isCorner(board[row][col])) continue;
            const leftCell = board[row][col - 1];
            const rightCell = board[row][col + 1];
            const aboveCell = board[row - 1]?.[col];
            const belowCell = board[row + 1]?.[col];

            if (isCorner(leftCell) && isCanPlaced(row, col, 1, 0)) return true;
            if (isCorner(rightCell) && isCanPlaced(row, col, -1, 0)) return true;
            if (isCorner(aboveCell) && isCanPlaced(row, col, 0, 1)) return true;
            if (isCorner(belowCell) && isCanPlaced(row, col, 0, -1)) return true;
        }
    }
    return false;
};