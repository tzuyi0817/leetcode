/**
 * @param {string[]} grid
 * @return {number}
 */
const shortestPathAllKeys = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = new Set();
  const startPoint = { row: -1, col: -1 };
  let totalKeys = 0;

  const isKey = value => /[a-z]/.test(value);
  const isLock = value => /[A-Z]/.test(value);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (isKey(value)) totalKeys += 1;
      if (value === '@') {
        startPoint.row = row;
        startPoint.col = col;
        visited.add(`${row * n + col}_0`);
      }
    }
  }
  const moveDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const bitmaskMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };
  const keysBitmask = (1 << totalKeys) - 1;
  let queue = [{ ...startPoint, keys: 0 }];
  let result = 0;

  while (queue.length) {
    const nextQueue = [];

    for (const { row, col, keys } of queue) {
      for (const [moveRow, moveCol] of moveDirections) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
        const value = grid[nextRow][nextCol];
        let nextKeys = keys;

        if (value === '#') continue;

        if (isLock(value)) {
          const bitmask = 1 << bitmaskMap[value.toLowerCase()];

          if ((nextKeys & bitmask) !== bitmask) continue;
        }
        if (isKey(value)) {
          nextKeys |= 1 << bitmaskMap[value];
          if (nextKeys === keysBitmask) return result + 1;
        }
        const visitedKey = `${nextRow * n + nextCol}_${nextKeys}`;

        if (visited.has(visitedKey)) continue;
        visited.add(visitedKey);
        nextQueue.push({ row: nextRow, col: nextCol, keys: nextKeys });
      }
    }
    result += 1;
    queue = nextQueue;
  }
  return -1;
};
