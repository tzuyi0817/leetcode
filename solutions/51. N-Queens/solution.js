/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const chessBoard = Array(n).fill('').map(() => Array(n).fill('.'));
    const result = [];
    const isValid = (current) => {
        for (let row = current.row - 1; row >= 0; row--) {
            if (chessBoard[row][current.col] === 'Q') return false;
        }
        const maxOffset = Math.max(current.row, current.col);

        for (let offset = 1; offset <= maxOffset; offset++) {
            const { row, col } = current;

            if (chessBoard[row - offset]?.[col - offset] === 'Q') return false;
            if (chessBoard[row - offset]?.[col + offset] === 'Q') return false;
        }
        return true;
    };
    const placementQueen = (row) => {
        if (row === n) {
            result.push(chessBoard.map(row => row.join('')));
            return;
        };
        for (let col = 0; col < n; col++) {
            if (!isValid({ row, col })) continue;
            chessBoard[row][col] = 'Q';
            placementQueen(row + 1);
            chessBoard[row][col] = '.';
        }
    };

    placementQueen(0);
    return result;
};
