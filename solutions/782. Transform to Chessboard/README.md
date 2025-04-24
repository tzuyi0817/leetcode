# [782. Transform to Chessboard](https://leetcode.com/problems/transform-to-chessboard)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>n x n</code> binary grid <code>board</code>. In each move, you can swap any two rows with each other, or any two columns with each other.</p>

<p>Return <em>the minimum number of moves to transform the board into a <strong>chessboard board</strong></em>. If the task is impossible, return <code>-1</code>.</p>

<p>A <strong>chessboard board</strong> is a board where no <code>0</code>'s and no <code>1</code>'s are 4-directionally adjacent.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/29/chessboard1-grid.jpg" style="width: 500px; height: 145px;">
<pre><strong>Input:</strong> board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
<strong>Output:</strong> 2
<strong>Explanation:</strong> One potential sequence of moves is shown.
The first move swaps the first and second column.
The second move swaps the second and third row.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/29/chessboard2-grid.jpg" style="width: 164px; height: 165px;">
<pre><strong>Input:</strong> board = [[0,1],[1,0]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> Also note that the board with 0 in the top left corner, is also a valid chessboard.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/29/chessboard3-grid.jpg" style="width: 164px; height: 165px;">
<pre><strong>Input:</strong> board = [[1,0],[1,0]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> No matter what sequence of moves you make, you cannot end with a valid chessboard.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == board.length</code></li>
	<li><code>n == board[i].length</code></li>
	<li><code>2 &lt;= n &lt;= 30</code></li>
	<li><code>board[i][j]</code> is either&nbsp;<code>0</code> or <code>1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} board
 * @return {number}
 */
const movesToChessboard = function (board) {
  const n = board.length;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const topLeft = board[0][0];
      const topRight = board[0][col];
      const bottomLeft = board[row][0];
      const bottomRight = board[row][col];
      // 0 or 1 only has an odd count is invalid
      if (topLeft ^ topRight ^ bottomLeft ^ bottomRight) return -1;
    }
  }
  let colSum = 0;
  let rowSum = 0;
  let colMisplace = 0;
  let rowMisplace = 0;

  for (let index = 0; index < n; index++) {
    colSum += board[index][0];
    rowSum += board[0][index];
    // target to 01010...
    if (board[index][0] !== index % 2) colMisplace += 1;
    if (board[0][index] !== index % 2) rowMisplace += 1;
  }

  if (colSum !== Math.floor(n / 2) && colSum !== Math.floor((n + 1) / 2)) return -1;
  if (rowSum !== Math.floor(n / 2) && rowSum !== Math.floor((n + 1) / 2)) return -1;
  if (n % 2) {
    if (colMisplace % 2) colMisplace = n - colMisplace;
    if (rowMisplace % 2) rowMisplace = n - rowMisplace;
  } else {
    colMisplace = Math.min(n - colMisplace, colMisplace);
    rowMisplace = Math.min(n - rowMisplace, rowMisplace);
  }
  return (colMisplace + rowMisplace) / 2;
};
```
