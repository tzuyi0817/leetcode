/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solveSudoku = function (board) {
  const m = board.length;
  const n = board[0].length;
  const isValid = (current, num) => {
    for (let row = 0; row < m; row++) {
      if (board[row][current.col] === `${num}`) return false;
    }
    for (let col = 0; col < n; col++) {
      if (board[current.row][col] === `${num}`) return false;
    }
    const startRow = current.row - (current.row % 3);
    const startCol = current.col - (current.col % 3);

    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if (board[row][col] === `${num}`) return false;
      }
    }
    return true;
  };
  const solveSudokuCell = (row, col) => {
    if (row === 9) return true;
    if (col === 9) return solveSudokuCell(row + 1, 0);
    if (board[row][col] !== '.') return solveSudokuCell(row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (!isValid({ row, col }, num)) continue;
      board[row][col] = `${num}`;
      if (solveSudokuCell(row, col + 1)) return true;
      board[row][col] = '.';
    }
    return false;
  };

  solveSudokuCell(0, 0);
  return board;
};
