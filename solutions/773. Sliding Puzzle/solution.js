/**
 * @param {number[][]} board
 * @return {number}
 */
const slidingPuzzle = function (board) {
  const m = board.length;
  const n = board[0].length;

  const isSolved = board => {
    return board.join('') === '123450';
  };

  if (isSolved(board.flat())) return 0;

  const visited = new Set();
  const direction = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let queue = [board.flat()];
  let result = 0;

  const findEmptySquare = board => {
    const index = board.indexOf(0);

    return { row: Math.floor(index / n), col: index % n };
  };

  const moveSquare = (board, square, moveRow, moveCol) => {
    if (moveRow < 0 || moveCol < 0 || moveRow >= m || moveCol >= n) return null;
    const cloneBoard = [...board];
    const index = square.row * n + square.col;
    const moveIndex = moveRow * n + moveCol;

    [cloneBoard[index], cloneBoard[moveIndex]] = [cloneBoard[moveIndex], cloneBoard[index]];
    if (visited.has(cloneBoard.join(''))) return null;
    return cloneBoard;
  };

  while (queue.length) {
    const nextQueue = [];

    for (const current of queue) {
      visited.add(current.join(''));

      const emptySquare = findEmptySquare(current);
      const { row, col } = emptySquare;

      for (const move of direction) {
        const nextBoard = moveSquare(current, emptySquare, row + move[0], col + move[1]);

        if (!nextBoard) continue;
        if (isSolved(nextBoard)) return result + 1;
        nextQueue.push(nextBoard);
      }
    }
    queue = nextQueue;
    result += 1;
  }
  return -1;
};
