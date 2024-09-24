/**
 * @param {number[][]} forest
 * @return {number}
 */
const cutOffTree = function (forest) {
  if (!forest[0][0]) return -1;
  const m = forest.length;
  const n = forest[0].length;
  const trees = [];

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const height = forest[row][col];

      if (height <= 1) continue;
      trees.push({ row, col, height });
    }
  }

  trees.sort((a, b) => a.height - b.height);

  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  let current = [0, 0];
  let result = 0;

  const getMoveStep = (start, destination) => {
    const visited = Array(m)
      .fill('')
      .map(_ => Array(n).fill(false));
    let queue = [start];
    let steps = 0;

    visited[start[0]][start[1]] = true;

    while (queue.length) {
      const size = queue.length;
      const nextQueue = [];

      for (let index = 0; index < size; index++) {
        const [row, col] = queue[index];

        if (row === destination.row && col === destination.col) return steps;

        for (const [moveRow, moveCol] of directions) {
          const nextRow = row + moveRow;
          const nextCol = col + moveCol;

          if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
          if (!forest[nextRow][nextCol]) continue;
          if (visited[nextRow][nextCol]) continue;
          nextQueue.push([nextRow, nextCol]);
          visited[nextRow][nextCol] = true;
        }
      }
      queue = nextQueue;
      steps += 1;
    }
    return -1;
  };

  for (const { row, col } of trees) {
    const steps = getMoveStep(current, { row, col });

    if (steps === -1) return -1;
    current = [row, col];
    result += steps;
  }

  return result;
};
