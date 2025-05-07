/**
 * @param {number[][]} moveTime
 * @return {number}
 */
const minTimeToReach = function (moveTime) {
  const m = moveTime.length;
  const n = moveTime[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const minHeap = new MinPriorityQueue(({ time }) => time);

  minHeap.enqueue({ row: 0, col: 0, time: 0 });
  visited[0][0] = true;

  while (minHeap.size()) {
    const { row, col, time } = minHeap.dequeue();

    if (row === m - 1 && col === n - 1) return time;

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n || visited[nextRow][nextCol]) continue;
      const nextTime = 1 + Math.max(time, moveTime[nextRow][nextCol]);

      minHeap.enqueue({ row: nextRow, col: nextCol, time: nextTime });
      visited[nextRow][nextCol] = true;
    }
  }

  return -1;
};
