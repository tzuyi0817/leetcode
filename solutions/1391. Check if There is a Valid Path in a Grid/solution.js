/**
 * @param {number[][]} grid
 * @return {boolean}
 */
const hasValidPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const connectMap = { left: 'right', right: 'left', upper: 'lower', lower: 'upper' };
  const moveMap = {
    left: { row: 0, col: -1 },
    right: { row: 0, col: 1 },
    upper: { row: -1, col: 0 },
    lower: { row: 1, col: 0 },
  };
  const streetMap = {
    1: ['left', 'right'],
    2: ['upper', 'lower'],
    3: ['left', 'lower'],
    4: ['lower', 'right'],
    5: ['left', 'upper'],
    6: ['upper', 'right'],
  };
  const isValidPath = (row, col, connect, visited = new Set()) => {
    if (row >= m || col >= n || row < 0 || col < 0) return false;
    if (visited.has(`${row}_${col}`)) return false;
    const street = streetMap[grid[row][col]];
    const startStreet = street.indexOf(connect);
    const isConnect = startStreet !== -1;
    if (!isConnect) return false;
    if (row === m - 1 && col === n - 1) return true;

    const endStreet = startStreet ? street[0] : street[1];
    const move = moveMap[endStreet];
    const nextConnect = connectMap[endStreet];

    visited.add(`${row}_${col}`);
    return isValidPath(row + move.row, col + move.col, nextConnect, visited);
  };
  const [directionA, directionB] = streetMap[grid[0][0]];

  return isValidPath(0, 0, directionA) || isValidPath(0, 0, directionB);
};
