/**
 * @param {number[][]} grid
 * @return {number[]}
 */
const goodSubsetofBinaryMatrix = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const maskMap = new Map();
  const MAX_MASK = (1 << n) - 1;

  const getRowMask = row => {
    let mask = 0;

    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;

      mask |= 1 << col;
    }

    return mask;
  };

  for (let row = 0; row < m; row++) {
    const rowMask = getRowMask(row);

    if (rowMask === 0) return [row];

    for (let mask = 0; mask <= MAX_MASK; mask++) {
      if ((rowMask & mask) === 0 && maskMap.has(mask)) {
        const prevRow = maskMap.get(mask);

        return [prevRow, row];
      }
    }

    maskMap.set(rowMask, row);
  }

  return [];
};
