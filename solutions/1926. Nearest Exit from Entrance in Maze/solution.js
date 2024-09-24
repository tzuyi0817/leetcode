/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
const nearestExit = function (maze, entrance) {
  const m = maze.length;
  const n = maze[0].length;
  const [entranceRow, entranceCol] = entrance;
  const queue = [{ row: entranceRow, col: entranceCol }];
  const moves = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  let steps = 0;

  maze[entranceRow][entranceCol] = 'x';

  while (queue.length) {
    const size = queue.length;

    for (let index = 0; index < size; index++) {
      const { row, col } = queue.shift();

      for (const [moveRow, moveCol] of moves) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) {
          if (steps) return steps;
          continue;
        }
        if (maze[nextRow][nextCol] !== '.') continue;
        maze[nextRow][nextCol] = 'x';
        queue.push({ row: nextRow, col: nextCol });
      }
    }
    steps += 1;
  }
  return -1;
};
