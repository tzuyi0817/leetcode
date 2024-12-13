/**
 * @param {number[][]} mat
 * @return {number}
 */
const minFlips = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const visited = new Set();
  let originBitmask = 0;

  const getBitmask = (row, col) => 1 << (row * n + col);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = mat[row][col];

      if (!value) continue;
      originBitmask |= getBitmask(row, col);
    }
  }
  if (!originBitmask) return 0;
  let queue = [originBitmask];
  let result = 0;

  const flipMatrix = (row, col, bitmask) => {
    bitmask ^= getBitmask(row, col);

    if (row - 1 >= 0) bitmask ^= getBitmask(row - 1, col);
    if (row + 1 < m) bitmask ^= getBitmask(row + 1, col);
    if (col - 1 >= 0) bitmask ^= getBitmask(row, col - 1);
    if (col + 1 < n) bitmask ^= getBitmask(row, col + 1);

    return bitmask;
  };

  visited.add(originBitmask);

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const bitmask of queue) {
      for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
          const nextBitmask = flipMatrix(row, col, bitmask);

          if (!nextBitmask) return result;
          if (visited.has(nextBitmask)) continue;
          nextQueue.push(nextBitmask);
          visited.add(nextBitmask);
        }
      }
    }
    queue = nextQueue;
  }
  return -1;
};
