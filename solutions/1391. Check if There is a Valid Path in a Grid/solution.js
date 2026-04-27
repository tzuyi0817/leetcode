/**
 * @param {number[][]} grid
 * @return {boolean}
 */
const hasValidPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const start = grid[0][0];

  if (start === 5) return false;

  const streetMap = {
    1: (from, row, col) => {
      if (from === 'up' || from === 'down') return false;

      if (from === 'left') return { row, col: col + 1, to: 'left' };

      return { row, col: col - 1, to: 'right' };
    },
    2: (from, row, col) => {
      if (from === 'left' || from === 'right') return false;

      if (from === 'up') return { row: row + 1, col, to: 'up' };

      return { row: row - 1, col, to: 'down' };
    },
    3: (from, row, col) => {
      if (from === 'up' || from === 'right') return false;

      if (from === 'left') return { row: row + 1, col, to: 'up' };

      return { row, col: col - 1, to: 'right' };
    },
    4: (from, row, col) => {
      if (from === 'up' || from === 'left') return false;

      if (from === 'right') return { row: row + 1, col, to: 'up' };

      return { row, col: col + 1, to: 'left' };
    },
    5: (from, row, col) => {
      if (from === 'down' || from === 'right') return false;

      if (from === 'up') return { row, col: col - 1, to: 'right' };

      return { row: row - 1, col, to: 'down' };
    },
    6: (from, row, col) => {
      if (from === 'down' || from === 'left') return false;

      if (from === 'up') return { row, col: col + 1, to: 'left' };

      return { row: row - 1, col, to: 'down' };
    },
  };

  const isValidPath = (row, col, from) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return false;

    const current = grid[row][col];

    if (current === 'x') return false;

    const nextPos = streetMap[current](from, row, col);

    if (!nextPos) return false;

    if (row === m - 1 && col === n - 1) return true;

    grid[row][col] = 'x';

    const isValid = isValidPath(nextPos.row, nextPos.col, nextPos.to);

    grid[row][col] = current;

    return isValid;
  };

  if (start === 4) {
    return isValidPath(0, 0, 'right') || isValidPath(0, 0, 'down');
  }

  const fromMap = { 1: 'left', 2: 'up', 3: 'left', 6: 'up' };

  return isValidPath(0, 0, fromMap[start]);
};
