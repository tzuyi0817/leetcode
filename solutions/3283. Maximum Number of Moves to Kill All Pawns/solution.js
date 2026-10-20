/**
 * @param {number} kx
 * @param {number} ky
 * @param {number[][]} positions
 * @return {number}
 */
const maxMoves = function (kx, ky, positions) {
  const SIZE = 50;
  const n = positions.length;
  const positionMap = new Map();

  const getHash = (x, y) => x * SIZE + y;

  positions.push([kx, ky]);

  for (let index = 0; index <= n; index++) {
    const [x, y] = positions[index];
    const hash = getHash(x, y);

    positionMap.set(hash, index);
  }

  const dist = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  const dirs = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const bfs = source => {
    const [sx, sy] = positions[source];
    const seen = new Array(SIZE).fill('').map(() => new Array(SIZE).fill(false));
    let seenPositions = 0;
    let step = 0;
    let queue = [{ x: sx, y: sy }];

    seen[sx][sy] = true;

    while (queue.length && seenPositions <= n) {
      const nextQueue = [];

      for (const { x, y } of queue) {
        const hash = getHash(x, y);

        if (positionMap.has(hash)) {
          const index = positionMap.get(hash);

          seenPositions += 1;
          dist[source][index] = step;
        }

        for (const [dx, dy] of dirs) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= SIZE || ny >= SIZE || nx < 0 || ny < 0) {
            continue;
          }

          if (seen[nx][ny]) continue;

          seen[nx][ny] = true;
          nextQueue.push({ x: nx, y: ny });
        }
      }

      step += 1;
      queue = nextQueue;
    }
  };

  for (let index = 0; index <= n; index++) {
    bfs(index);
  }

  const { MIN_SAFE_INTEGER: MIN, MAX_SAFE_INTEGER: MAX } = Number;
  const ALICE = 0;
  const totalMask = (1 << n) - 1;
  const dp = Array.from({ length: n + 1 }, () => {
    return new Array(2).fill('').map(() => new Array(totalMask).fill(-1));
  });

  const dfs = (source, mask, turn) => {
    if (mask === totalMask) return 0;

    if (dp[source][turn][mask] !== -1) {
      return dp[source][turn][mask];
    }

    const nextTurn = (turn + 1) % 2;
    const compare = turn === ALICE ? Math.max : Math.min;
    let result = turn === ALICE ? MIN : MAX;

    for (let index = 0; index < n; index++) {
      if (mask & (1 << index)) continue;

      const nextMask = mask | (1 << index);
      const step = dist[source][index] + dfs(index, nextMask, nextTurn);

      result = compare(step, result);
    }

    dp[source][turn][mask] = result;

    return result;
  };

  return dfs(n, 0, ALICE);
};
