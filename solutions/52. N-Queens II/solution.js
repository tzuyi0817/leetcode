/**
 * @param {number} n
 * @return {number}
 */
const totalNQueens = function (n) {
  const cols = new Array(n).fill(false);
  const diagonals = Array.from({ length: n * 2 }).fill(false);
  const inverseDiagonals = Array.from({ length: n * 2 }).fill(false);
  const placementQueen = row => {
    if (row === n) return 1;
    let result = 0;

    for (let col = 0; col < n; col++) {
      const diag1 = col - row + n;
      const diag2 = col + row;

      if (cols[col] || diagonals[diag1] || inverseDiagonals[diag2]) continue;
      cols[col] = diagonals[diag1] = inverseDiagonals[diag2] = true;
      result += placementQueen(row + 1);
      cols[col] = diagonals[diag1] = inverseDiagonals[diag2] = false;
    }
    return result;
  };

  return placementQueen(0);
};
