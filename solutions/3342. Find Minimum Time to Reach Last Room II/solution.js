/**
 * @param {number[][]} moveTime
 * @return {number}
 */
const minTimeToReach = function (moveTime) {
  const m = moveTime.length;
  const n = moveTime[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const minHeap = new MinPriorityQueue(({ time }) => time);
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));

  minHeap.enqueue({ row: 0, col: 0, time: 0, spendSecond: 1 });

  while (minHeap.size()) {
    const { row, col, time, spendSecond } = minHeap.dequeue();

    if (row === m - 1 && col === n - 1) return time;

    for (const [moveRow, moveCol] of directions) {
      const nextRow = row + moveRow;
      const nextCol = col + moveCol;

      if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) continue;
      if (visited[nextRow][nextCol]) continue;

      visited[nextRow][nextCol] = true;
      minHeap.enqueue({
        row: nextRow,
        col: nextCol,
        time: Math.max(time, moveTime[nextRow][nextCol]) + spendSecond,
        spendSecond: spendSecond === 1 ? 2 : 1,
      });
    }
  }

  return -1;
};
