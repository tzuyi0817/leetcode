# [1301. Number of Paths with Max Score](https://leetcode.com/problems/number-of-paths-with-max-score)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a square <code>board</code>&nbsp;of characters. You can move on the board starting at the bottom right square marked with the character&nbsp;<code>'S'</code>.</p>

<p>You need&nbsp;to reach the top left square marked with the character <code>'E'</code>. The rest of the squares are labeled either with a numeric character&nbsp;<code>1, 2, ..., 9</code> or with an obstacle <code>'X'</code>. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.</p>

<p>Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, <strong>taken modulo <code>10^9 + 7</code></strong>.</p>

<p>In case there is no path, return&nbsp;<code>[0, 0]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> board = ["E23","2X2","12S"]
<strong>Output:</strong> [7,1]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> board = ["E12","1X1","21S"]
<strong>Output:</strong> [4,2]
</pre><p><strong class="example">Example 3:</strong></p>
<pre><strong>Input:</strong> board = ["E11","XXX","11S"]
<strong>Output:</strong> [0,0]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= board.length == board[i].length &lt;= 100</code></li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
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
```
