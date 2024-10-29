/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
const highestPeak = function (isWater) {
  const m = isWater.length;
  const n = isWater[0].length;
  const result = new Array(m).fill('').map(_ => new Array(n).fill(-1));
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let queue = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!isWater[row][col]) continue;
      result[row][col] = 0;
      queue.push({ row, col });
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const { row, col } of queue) {
      for (const [x, y] of direction) {
        const nextRow = row + x;
        const nextCol = col + y;

        if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) continue;
        if (result[nextRow][nextCol] !== -1) continue;
        nextQueue.push({ row: nextRow, col: nextCol });
        result[nextRow][nextCol] = result[row][col] + 1;
      }
    }
    queue = nextQueue;
  }
  return result;
};
