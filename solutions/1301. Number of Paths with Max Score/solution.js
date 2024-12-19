/**
 * @param {string[]} board
 * @return {number[]}
 */
const pathsWithMaxScore = function (board) {
  const OBSTACLE = 'X';
  const START = 'S';
  const GOAL = 'E';
  const MODULO = 10 ** 9 + 7;
  const n = board.length;
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  const dp = Array.from({ length: n }, () => new Array(n).fill(Number.MIN_SAFE_INTEGER));
  const paths = Array.from({ length: n }, () => new Array(n).fill(0));

  dp[0][0] = 0;
  paths[0][0] = 1;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const value = board[row][col];
      const path = paths[row][col];

      if (value === OBSTACLE || !path) continue;
      const score = value === START || value === GOAL ? 0 : Number(value);

      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow >= n || nextCol >= n) continue;
        const newScore = (score + dp[row][col]) % MODULO;
        const nextScore = dp[nextRow][nextCol];
        const nextPath = paths[nextRow][nextCol];

        if (newScore > nextScore) {
          dp[nextRow][nextCol] = newScore;
          paths[nextRow][nextCol] = path;
        } else if (newScore === nextScore) {
          paths[nextRow][nextCol] = (path + nextPath) % MODULO;
        }
      }
    }
  }
  const score = dp[n - 1][n - 1];
  const path = paths[n - 1][n - 1];

  return [score === Number.MIN_SAFE_INTEGER ? 0 : score, path];
};
