# [3283. Maximum Number of Moves to Kill All Pawns](https://leetcode.com/problems/maximum-number-of-moves-to-kill-all-pawns)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>There is a <code>50 x 50</code> chessboard with <strong>one</strong> knight and some pawns on it. You are given two integers <code>kx</code> and <code>ky</code> where <code>(kx, ky)</code> denotes the position of the knight, and a 2D array <code>positions</code> where <code>positions[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> denotes the position of the pawns on the chessboard.</p>

<p>Alice and Bob play a <em>turn-based</em> game, where Alice goes first. In each player's turn:</p>

<ul>
	<li>The player <em>selects </em>a pawn that still exists on the board and captures it with the knight in the <strong>fewest</strong> possible <strong>moves</strong>. <strong>Note</strong> that the player can select <strong>any</strong> pawn, it <strong>might not</strong> be one that can be captured in the <strong>least</strong> number of moves.</li>
	<li><span>In the process of capturing the <em>selected</em> pawn, the knight <strong>may</strong> pass other pawns <strong>without</strong> capturing them</span>. <strong>Only</strong> the <em>selected</em> pawn can be captured in <em>this</em> turn.</li>
</ul>

<p>Alice is trying to <strong>maximize</strong> the <strong>sum</strong> of the number of moves made by <em>both</em> players until there are no more pawns on the board, whereas Bob tries to <strong>minimize</strong> them.</p>

<p>Return the <strong>maximum</strong> <em>total</em> number of moves made during the game that Alice can achieve, assuming both players play <strong>optimally</strong>.</p>

<p>Note that in one <strong>move, </strong>a chess knight has eight possible positions it can move to, as illustrated below. Each move is two cells in a cardinal direction, then one cell in an orthogonal direction.</p>

<p><img src="https://assets.leetcode.com/uploads/2024/08/01/chess_knight.jpg" style="width: 275px; height: 273px;"></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">kx = 1, ky = 1, positions = [[0,0]]</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/08/16/gif3.gif" style="width: 275px; height: 275px;"></p>

<p>The knight takes 4 moves to reach the pawn at <code>(0, 0)</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">kx = 0, ky = 2, positions = [[1,1],[2,2],[3,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">8</span></p>

<p><strong>Explanation:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2024/08/16/gif4.gif" style="width: 320px; height: 320px;"></strong></p>

<ul>
	<li>Alice picks the pawn at <code>(2, 2)</code> and captures it in two moves: <code>(0, 2) -&gt; (1, 4) -&gt; (2, 2)</code>.</li>
	<li>Bob picks the pawn at <code>(3, 3)</code> and captures it in two moves: <code>(2, 2) -&gt; (4, 1) -&gt; (3, 3)</code>.</li>
	<li>Alice picks the pawn at <code>(1, 1)</code> and captures it in four moves: <code>(3, 3) -&gt; (4, 1) -&gt; (2, 2) -&gt; (0, 3) -&gt; (1, 1)</code>.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">kx = 0, ky = 0, positions = [[1,2],[2,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Alice picks the pawn at <code>(2, 4)</code> and captures it in two moves: <code>(0, 0) -&gt; (1, 2) -&gt; (2, 4)</code>. Note that the pawn at <code>(1, 2)</code> is not captured.</li>
	<li>Bob picks the pawn at <code>(1, 2)</code> and captures it in one move: <code>(2, 4) -&gt; (1, 2)</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= kx, ky &lt;= 49</code></li>
	<li><code>1 &lt;= positions.length &lt;= 15</code></li>
	<li><code>positions[i].length == 2</code></li>
	<li><code>0 &lt;= positions[i][0], positions[i][1] &lt;= 49</code></li>
	<li>All <code>positions[i]</code> are unique.</li>
	<li>The input is generated such that <code>positions[i] != [kx, ky]</code> for all <code>0 &lt;= i &lt; positions.length</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>\*2<sup>n</sup>+n\*50<sup>2</sup>)</em>
- Space complexity: <em>O(n\*2<sup>n</sup>+n<sup>2</sup>+50<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
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
```
