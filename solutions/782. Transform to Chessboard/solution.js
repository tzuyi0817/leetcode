/**
 * @param {number[][]} board
 * @return {number}
 */
const movesToChessboard = function (board) {
  const n = board.length;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const topLeft = board[0][0];
      const topRight = board[0][col];
      const bottomLeft = board[row][0];
      const bottomRight = board[row][col];
      // 0 or 1 only has an odd count is invalid
      if (topLeft ^ topRight ^ bottomLeft ^ bottomRight) return -1;
    }
  }
  let colSum = (rowSum = colMisplace = rowMisplace = 0);

  for (let index = 0; index < n; index++) {
    colSum += board[index][0];
    rowSum += board[0][index];
    // target to 01010...
    if (board[index][0] !== index % 2) colMisplace += 1;
    if (board[0][index] !== index % 2) rowMisplace += 1;
  }

  if (colSum !== Math.floor(n / 2) && colSum !== Math.floor((n + 1) / 2)) return -1;
  if (rowSum !== Math.floor(n / 2) && rowSum !== Math.floor((n + 1) / 2)) return -1;
  if (n % 2) {
    if (colMisplace % 2) colMisplace = n - colMisplace;
    if (rowMisplace % 2) rowMisplace = n - rowMisplace;
  } else {
    colMisplace = Math.min(n - colMisplace, colMisplace);
    rowMisplace = Math.min(n - rowMisplace, rowMisplace);
  }
  return (colMisplace + rowMisplace) / 2;
};
