/**
 * @param {number} n
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
var gridIllumination = function (n, lamps, queries) {
  const lampsSet = new Set();
  const rowMemo = new Map();
  const colMemo = new Map();
  const diagonalMemo = new Map();
  const negativeDiagonalMemo = new Map();
  const adjacent = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [row, col] of lamps) {
    const key = `${row},${col}`;

    if (lampsSet.has(key)) continue;
    lampsSet.add(key);
    rowMemo.set(row, (rowMemo.get(row) ?? 0) + 1);
    colMemo.set(col, (colMemo.get(col) ?? 0) + 1);
    diagonalMemo.set(row + col, (diagonalMemo.get(row + col) ?? 0) + 1);
    negativeDiagonalMemo.set(row - col, (negativeDiagonalMemo.get(row - col) ?? 0) + 1);
  }

  return queries.map(([row, col]) => {
    const isIllumination =
      rowMemo.get(row) || colMemo.get(col) || diagonalMemo.get(row + col) || negativeDiagonalMemo.get(row - col);

    for (const offset of adjacent) {
      const offsetRow = row + offset[0];
      const offsetCol = col + offset[1];
      const key = `${offsetRow},${offsetCol}`;

      if (offsetRow < 0 || offsetRow >= n || offsetCol < 0 || offsetCol >= n) continue;
      if (!lampsSet.has(key)) continue;
      const rowCount = rowMemo.get(offsetRow) - 1;
      const colCount = colMemo.get(offsetCol) - 1;
      const diagonalCount = diagonalMemo.get(offsetRow + offsetCol) - 1;
      const negativeDiagonalCount = negativeDiagonalMemo.get(offsetRow - offsetCol) - 1;

      rowCount ? rowMemo.set(offsetRow, rowCount) : rowMemo.delete(offsetRow);
      colCount ? colMemo.set(offsetCol, colCount) : colMemo.delete(offsetCol);

      diagonalCount
        ? diagonalMemo.set(offsetRow + offsetCol, diagonalCount)
        : diagonalMemo.delete(offsetRow + offsetCol);

      negativeDiagonalCount
        ? negativeDiagonalMemo.set(offsetRow - offsetCol, negativeDiagonalCount)
        : negativeDiagonalMemo.delete(offsetRow - offsetCol);

      lampsSet.delete(key);
    }

    return isIllumination ? 1 : 0;
  });
};
