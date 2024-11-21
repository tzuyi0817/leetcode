/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
const countUnguarded = function (m, n, guards, walls) {
  const cells = Array.from({ length: m }, () => Array.from({ length: n }, () => false));
  let result = m * n - guards.length - walls.length;

  for (const [row, col] of guards) {
    cells[row][col] = 'G';
  }

  for (const [row, col] of walls) {
    cells[row][col] = 'W';
  }

  const checkGuarded = (row, col, isGuarded) => {
    const cell = cells[row][col];

    if (cell === 'G' || cell === 'W') {
      return cell === 'G';
    }
    if (isGuarded && !cell) {
      cells[row][col] = true;
      result -= 1;
    }
    return isGuarded;
  };

  for (let row = 0; row < m; row++) {
    let isGuarded = false;

    for (let col = 0; col < n; col++) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
    isGuarded = false;

    for (let col = n - 1; col >= 0; col--) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
  }

  for (let col = 0; col < n; col++) {
    let isGuarded = false;

    for (let row = 0; row < m; row++) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
    isGuarded = false;

    for (let row = m - 1; row >= 0; row--) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
  }
  return result;
};
