/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function (isWater) {
  const m = isWater.length;
  const n = isWater[0].length;
  const result = Array.from({ length: m }, () => Array(n).fill(0));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let queue = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!isWater[row][col]) continue;

      queue.push({ row, col, height: 0 });
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const { row, col, height } of queue) {
      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow >= m || nextCol >= n || nextRow < 0 || nextCol < 0) continue;
        if (result[nextRow][nextCol] || isWater[nextRow][nextCol]) continue;

        nextQueue.push({ row: nextRow, col: nextCol, height: height + 1 });
        result[nextRow][nextCol] = height + 1;
      }
    }
    queue = nextQueue;
  }
  return result;
};
