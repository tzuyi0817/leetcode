/**
 * @param {character[][]} grid
 * @return {number}
 */
const minPushBox = function (grid) {
  const OBSTACLE = '#';
  const m = grid.length;
  const n = grid[0].length;
  const location = { player: null, box: null };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (value === 'S') location.player = { row, col };
      if (value === 'B') location.box = { row, col };
    }
  }
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = new Set();
  let queue = [location];
  let result = 0;

  const isOutOfBounds = (row, col) => row >= m || col >= n || row < 0 || col < 0;
  const getVisitedKey = (box, player) => `${box.row},${box.col},${player.row},${player.col}`;

  const playerCanMoveTo = (start, target, box) => {
    if (start.row === target.row && start.col === target.col) return true;
    const memo = Array.from({ length: m * n }, () => false);
    let queue = [start];

    memo[start.row * n + start.col] = true;

    while (queue.length) {
      const nextQueue = [];

      for (const { row, col } of queue) {
        for (const [moveRow, moveCol] of directions) {
          const nextRow = row + moveRow;
          const nextCol = col + moveCol;
          const key = nextRow * n + nextCol;

          if (nextRow === target.row && nextCol === target.col) return true;
          if (isOutOfBounds(nextRow, nextCol) || memo[key]) continue;
          if (nextRow === box.row && nextCol === box.col) continue;
          if (grid[nextRow][nextCol] === OBSTACLE) continue;

          nextQueue.push({ row: nextRow, col: nextCol });
          memo[key] = true;
        }
      }
      queue = nextQueue;
    }
    return false;
  };

  visited.add(getVisitedKey(location.box, location.player));

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const { player, box } of queue) {
      for (const [moveRow, moveCol] of directions) {
        const nextRow = box.row + moveRow;
        const nextCol = box.col + moveCol;

        if (isOutOfBounds(nextRow, nextCol)) continue;
        const nextBox = { row: nextRow, col: nextCol };
        const boxCell = grid[nextRow][nextCol];

        if (boxCell === OBSTACLE) continue;
        const pushRow = box.row + moveRow * -1;
        const pushCol = box.col + moveCol * -1;

        if (isOutOfBounds(pushRow, pushCol)) continue;
        if (grid[pushRow][pushCol] === OBSTACLE) continue;
        const pushPosition = { row: pushRow, col: pushCol };
        const key = getVisitedKey(nextBox, pushPosition);

        if (visited.has(key)) continue;
        if (!playerCanMoveTo(player, pushPosition, box)) continue;
        if (boxCell === 'T') return result;

        nextQueue.push({ player: box, box: nextBox });
        visited.add(key);
      }
    }
    queue = nextQueue;
  }
  return -1;
};
