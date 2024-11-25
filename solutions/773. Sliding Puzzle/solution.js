/**
 * @param {number[][]} board
 * @return {number}
 */
const slidingPuzzle = function (board) {
  const flexBoard = board.flat().join('');
  const isSolved = board => board === '123450';

  if (isSolved(flexBoard)) return 0;
  const visited = new Set([flexBoard]);
  const nextMoveMap = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4],
    4: [1, 3, 5],
    5: [2, 4],
  };
  let queue = [{ index: flexBoard.indexOf('0'), current: flexBoard }];
  let result = 0;

  const swapTile = (from, to, current) => {
    const nextBoard = current.split('');

    [nextBoard[from], nextBoard[to]] = [nextBoard[to], nextBoard[from]];
    const next = nextBoard.join('');

    if (visited.has(next)) return null;
    return next;
  };

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const { index, current } of queue) {
      for (const nextIndex of nextMoveMap[index]) {
        const nextBoard = swapTile(index, nextIndex, current);

        if (!nextBoard) continue;
        if (isSolved(nextBoard)) return result;
        visited.add(nextBoard);
        nextQueue.push({ index: nextIndex, current: nextBoard });
      }
    }
    queue = nextQueue;
  }
  return -1;
};
