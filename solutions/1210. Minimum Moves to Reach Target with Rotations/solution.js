/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumMoves = function (grid) {
  const n = grid.length;
  const visited = new Set(['true,0,1']);
  let queue = [{ isHorizontal: true, snake: [0, 1] }];
  let result = 0;

  const isReach = (head, isHorizontal) => {
    return isHorizontal && head[0] === n - 1 && head[1] === n - 1;
  };

  const moveRight = (head, tail, isHorizontal) => {
    const nextHeadRow = head[0];
    const nextHeadCol = head[1] + 1;
    const headCell = grid[nextHeadRow][nextHeadCol];

    if (headCell !== 0) return null;
    if (isHorizontal) return [nextHeadRow, nextHeadCol];
    const nextTailRow = tail[0];
    const nextTailCol = tail[1] + 1;
    const tailCell = grid[nextTailRow][nextTailCol];

    return tailCell === 0 ? [nextHeadRow, nextHeadCol] : null;
  };

  const moveDown = (head, tail, isHorizontal) => {
    const nextHeadRow = head[0] + 1;
    const nextHeadCol = head[1];
    const headCell = grid[nextHeadRow]?.[nextHeadCol];

    if (headCell !== 0) return null;
    if (!isHorizontal) return [nextHeadRow, nextHeadCol];
    const nextTailRow = tail[0] + 1;
    const nextTailCol = tail[1];
    const tailCell = grid[nextTailRow]?.[nextTailCol];

    return tailCell === 0 ? [nextHeadRow, nextHeadCol] : null;
  };

  const moveRotate = (head, isHorizontal) => {
    let [nextHeadRow, nextHeadCol] = head;

    if (isHorizontal) {
      const throughCell = grid[nextHeadRow + 1]?.[nextHeadCol];

      if (throughCell !== 0) return null;
      nextHeadRow += 1;
      nextHeadCol -= 1;
    } else {
      const throughCell = grid[nextHeadRow][nextHeadCol + 1];

      if (throughCell !== 0) return null;
      nextHeadRow -= 1;
      nextHeadCol += 1;
    }
    const headCell = grid[nextHeadRow]?.[nextHeadCol];

    return headCell === 0 ? [nextHeadRow, nextHeadCol] : null;
  };

  const isCacheVisited = (head, isHorizontal) => {
    const key = `${isHorizontal},${head}`;

    if (visited.has(key)) return true;
    visited.add(key);
    return false;
  };

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const {
      isHorizontal,
      snake: [row, col],
    } of queue) {
      const head = [row, col];
      const tail = isHorizontal ? [row, col - 1] : [row - 1, col];
      const rightSnake = moveRight(head, tail, isHorizontal);
      const downSnake = moveDown(head, tail, isHorizontal);
      const rotateSnake = moveRotate(head, isHorizontal);

      if (rightSnake && !isCacheVisited(rightSnake, isHorizontal)) {
        if (isReach(rightSnake, isHorizontal)) return result;
        nextQueue.push({ isHorizontal, snake: rightSnake });
      }
      if (downSnake && !isCacheVisited(downSnake, isHorizontal)) {
        if (isReach(downSnake, isHorizontal)) return result;
        nextQueue.push({ isHorizontal, snake: downSnake });
      }
      if (rotateSnake && !isCacheVisited(rotateSnake, !isHorizontal)) {
        if (isReach(rotateSnake, !isHorizontal)) return result;
        nextQueue.push({ isHorizontal: !isHorizontal, snake: rotateSnake });
      }
    }
    queue = nextQueue;
  }
  return -1;
};
