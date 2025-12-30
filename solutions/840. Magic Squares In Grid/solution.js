/**
 * @param {number[][]} grid
 * @return {number}
 */
const numMagicSquaresInside = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let result = 0;

  const isMagicSquare = (centerRow, centerCol) => {
    if (grid[centerRow][centerCol] !== 5) return false;

    const numSet = new Set();

    for (let a = -1; a <= 1; a++) {
      let sum1 = 0;
      let sum2 = 0;

      for (let b = -1; b <= 1; b++) {
        const num1 = grid[centerRow + a][centerCol + b];
        const num2 = grid[centerRow + b][centerCol + a];

        if (num1 < 1 || num1 > 9 || num2 < 1 || num2 > 9 || numSet.has(num1)) return false;

        sum1 += num1;
        sum2 += num2;
        numSet.add(num1);
      }

      if (sum1 !== 15 || sum2 !== 15) return false;
    }

    let diagonalSum1 = 0;
    let diagonalSum2 = 0;

    for (let index = -1; index <= 1; index++) {
      diagonalSum1 += grid[centerRow + index][centerCol + index];
      diagonalSum2 += grid[centerRow + index][centerCol - index];
    }

    return diagonalSum1 === 15 && diagonalSum2 === 15;
  };

  for (let row = 1; row < m - 1; row++) {
    for (let col = 1; col < n - 1; col++) {
      if (isMagicSquare(row, col)) {
        result += 1;
      }
    }
  }

  return result;
};
