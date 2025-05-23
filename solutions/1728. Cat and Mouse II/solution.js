/**
 * @param {string[]} grid
 * @param {number} catJump
 * @param {number} mouseJump
 * @return {boolean}
 */
const canMouseWin = function (grid, catJump, mouseJump) {
  const m = grid.length;
  const n = grid[0].length;
  const mouse = { row: 0, col: 0 };
  const cat = { row: 0, col: 0 };
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const memo = new Map();
  let floors = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (value !== '#') floors += 1;
      if (value === 'M') {
        mouse.row = row;
        mouse.col = col;
      } else if (value === 'C') {
        cat.row = row;
        cat.col = col;
      }
    }
  }

  const isMouseWin = (mouseRow, mouseCol, catRow, catCol, turns) => {
    if (turns >= floors * 2) return false;
    const key = `${mouseRow},${mouseCol},${catRow},${catCol},${turns}`;

    if (memo.has(key)) return memo.get(key);
    const round = turns % 2 ? 'C' : 'M';
    const mouseRound = round === 'M';
    const jump = mouseRound ? mouseJump : catJump;

    for (const [row, col] of directions) {
      for (let move = 0; move <= jump; move++) {
        const moveRow = row * move;
        const moveCol = col * move;
        const nextRow = (mouseRound ? mouseRow : catRow) + moveRow;
        const nextCol = (mouseRound ? mouseCol : catCol) + moveCol;

        if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) break;
        const value = grid[nextRow][nextCol];

        if (value === '#') break;
        if (value === 'F') {
          memo.set(key, mouseRound);

          return mouseRound;
        }

        if (mouseRound && isMouseWin(nextRow, nextCol, catRow, catCol, turns + 1)) {
          memo.set(key, true);

          return true;
        }

        if (!mouseRound) {
          if (mouseRow === nextRow && mouseCol === nextCol) {
            memo.set(key, false);

            return false;
          }

          if (!isMouseWin(mouseRow, mouseCol, nextRow, nextCol, turns + 1)) {
            memo.set(key, false);

            return false;
          }
        }
      }
    }

    memo.set(key, !mouseRound);

    return !mouseRound;
  };

  return isMouseWin(mouse.row, mouse.col, cat.row, cat.col, 0);
};
