/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let result = m * n;

  for (let row = 0; row < m - 1; row++) {
    const top = minimumArea(grid, 0, 0, row, n - 1);

    for (let col = 0; col < n - 1; col++) {
      const left = minimumArea(grid, row + 1, 0, m - 1, col);
      const right = minimumArea(grid, row + 1, col + 1, m - 1, n - 1);

      result = Math.min(top + left + right, result);
    }
  }

  for (let row = 1; row < m; row++) {
    const bottom = minimumArea(grid, row, 0, m - 1, n - 1);

    for (let col = 0; col < n - 1; col++) {
      const left = minimumArea(grid, 0, 0, row - 1, col);
      const right = minimumArea(grid, 0, col + 1, row - 1, n - 1);

      result = Math.min(bottom + left + right, result);
    }
  }

  for (let row = 0; row < m - 2; row++) {
    const top = minimumArea(grid, 0, 0, row, n - 1);

    for (let divider = row + 1; divider < m - 1; divider++) {
      const middle = minimumArea(grid, row + 1, 0, divider, n - 1);
      const bottom = minimumArea(grid, divider + 1, 0, m - 1, n - 1);

      result = Math.min(top + middle + bottom, result);
    }
  }

  for (let col = 0; col < n - 2; col++) {
    const left = minimumArea(grid, 0, 0, m - 1, col);

    for (let divider = col + 1; divider < n - 1; divider++) {
      const middle = minimumArea(grid, 0, col + 1, m - 1, divider);
      const right = minimumArea(grid, 0, divider + 1, m - 1, n - 1);

      result = Math.min(left + middle + right, result);
    }
  }

  for (let col = 0; col < n - 1; col++) {
    const left = minimumArea(grid, 0, 0, m - 1, col);

    for (let row = 0; row < m - 1; row++) {
      const top = minimumArea(grid, 0, col + 1, row, n - 1);
      const bottom = minimumArea(grid, row + 1, col + 1, m - 1, n - 1);

      result = Math.min(left + top + bottom, result);
    }
  }

  for (let col = 1; col < n; col++) {
    const right = minimumArea(grid, 0, col, m - 1, n - 1);

    for (let row = 0; row < m - 1; row++) {
      const top = minimumArea(grid, 0, 0, row, col - 1);
      const bottom = minimumArea(grid, row + 1, 0, m - 1, col - 1);

      result = Math.min(right + top + bottom, result);
    }
  }

  return result;
};

function minimumArea(grid, startRow, startCol, endRow, endCol) {
  let minRow = Number.MAX_SAFE_INTEGER;
  let minCol = Number.MAX_SAFE_INTEGER;
  let maxRow = -1;
  let maxCol = -1;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (grid[row][col] === 0) continue;

      minRow = Math.min(row, minRow);
      minCol = Math.min(col, minCol);
      maxRow = Math.max(row, maxRow);
      maxCol = Math.max(col, maxCol);
    }
  }

  if (maxRow === -1) return 0;

  return (maxRow - minRow + 1) * (maxCol - minCol + 1);
}
