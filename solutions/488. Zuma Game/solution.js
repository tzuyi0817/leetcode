/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  const handMap = new Map();

  for (const ball of hand) {
    const count = handMap.get(ball) ?? 0;

    handMap.set(ball, count + 1);
  }

  const removeGroupBall = board => {
    let left = 0;

    for (let right = 1; right <= board.length; right++) {
      if (board[right] && board[left] === board[right]) continue;
      if (right - left < 3) left = right;
      else return removeGroupBall(`${board.slice(0, left)}${board.slice(right)}`);
    }
    return board;
  };
  const findGroupBall = board => {
    board = removeGroupBall(board);
    if (!board) return 0;
    let left = 0;
    let result = Number.MAX_SAFE_INTEGER;

    for (let right = 1; right <= board.length; right++) {
      if (board[right] && board[left] === board[right]) continue;
      const ball = board[left];
      const needCount = 3 - (right - left);
      const count = handMap.get(ball) ?? 0;

      if (count >= needCount) {
        handMap.set(ball, count - needCount);
        const nextBoard = `${board.slice(0, left)}${board.slice(right)}`;
        const insertCount = findGroupBall(nextBoard);

        if (insertCount !== Number.MAX_SAFE_INTEGER) {
          result = Math.min(insertCount + needCount, result);
        }
        handMap.set(ball, count);
      }
      left = right;
    }
    return result;
  };
  const result = findGroupBall(board);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
