/**
 * @param {number[][]} grid
 * @return {number}
 */
const maximumMinutes = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const MAX_MINUTES = m * n;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const spreadGrid = Array.from({ length: m }, () => new Array(n).fill(Number.MAX_SAFE_INTEGER));
  let fireQueue = [];
  let left = 0;
  let right = MAX_MINUTES;
  let result = -1;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (value === 1) {
        spreadGrid[row][col] = 0;
        fireQueue.push({ row, col, minutes: 0 });
      }
    }
  }

  while (fireQueue.length) {
    const nextQueue = [];

    for (const { row, col, minutes } of fireQueue) {
      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
        if (grid[nextRow][nextCol] === 2) continue;

        const originMinutes = spreadGrid[nextRow][nextCol];
        const nextMinutes = minutes + 1;

        if (originMinutes <= nextMinutes) continue;

        spreadGrid[nextRow][nextCol] = nextMinutes;
        nextQueue.push({ row: nextRow, col: nextCol, minutes: nextMinutes });
      }
    }

    fireQueue = nextQueue;
  }

  const isPossibleEscape = stayMinutes => {
    if (stayMinutes >= spreadGrid[0][0]) return false;

    const visited = new Array(m).fill('').map(() => new Array(n).fill(false));
    let queue = [{ row: 0, col: 0, minutes: stayMinutes }];

    visited[0][0] = true;

    while (queue.length) {
      const nextQueue = [];

      for (const { row, col, minutes } of queue) {
        for (const [moveRow, moveCol] of directions) {
          const nextRow = row + moveRow;
          const nextCol = col + moveCol;

          if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
          if (grid[nextRow][nextCol] === 2 || visited[nextRow][nextCol]) continue;

          const nextMinutes = minutes + 1;
          const spreadMinutes = spreadGrid[nextRow][nextCol];

          if (nextRow === m - 1 && nextCol === n - 1) {
            if (nextMinutes > spreadMinutes) continue;

            return true;
          } else if (nextMinutes >= spreadMinutes) {
            continue;
          }

          visited[nextRow][nextCol] = true;
          nextQueue.push({ row: nextRow, col: nextCol, minutes: nextMinutes });
        }
      }

      queue = nextQueue;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isPossibleEscape(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result === MAX_MINUTES ? 10 ** 9 : result;
};
