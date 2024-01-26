/**
 * @param {character[][]} board
 * @param {number} rMove
 * @param {number} cMove
 * @param {character} color
 * @return {boolean}
 */
var checkMove = function(board, rMove, cMove, color) {
    const m = board.length;
    const n = board[0].length;
    const moveDirection = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];

    for (const [x, y] of moveDirection) {
        let col = cMove + x;
        let row = rMove + y;
        let cells = 1;

        while (row >= 0 && row < m && col >= 0 && col < n && board[row][col] !== '.' ) {
            cells += 1;
            if (cells < 3 && board[row][col] === color) break;
            if (board[row][col] === color) return true;
            col += x;
            row += y;
        }
    }
    return false;
};