# [1958. Check if Move is Legal](https://leetcode.com/problems/check-if-move-is-legal)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> <code>8 x 8</code> grid <code>board</code>, where <code>board[r][c]</code> represents the cell <code>(r, c)</code> on a game board. On the board, free cells are represented by <code>'.'</code>, white cells are represented by <code>'W'</code>, and black cells are represented by <code>'B'</code>.</p>

<p>Each move in this game consists of choosing a free cell and changing it to the color you are playing as (either white or black). However, a move is only <strong>legal</strong> if, after changing it, the cell becomes the <strong>endpoint of a good line</strong> (horizontal, vertical, or diagonal).</p>

<p>A <strong>good line</strong> is a line of <strong>three or more cells (including the endpoints)</strong> where the endpoints of the line are <strong>one color</strong>, and the remaining cells in the middle are the <strong>opposite color</strong> (no cells in the line are free). You can find examples for good lines in the figure below:</p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/22/goodlines5.png" style="width: 500px; height: 312px;">
<p>Given two integers <code>rMove</code> and <code>cMove</code> and a character <code>color</code> representing the color you are playing as (white or black), return <code>true</code> <em>if changing cell </em><code>(rMove, cMove)</code> <em>to color</em> <code>color</code> <em>is a <strong>legal</strong> move, or </em><code>false</code><em> if it is not legal</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/10/grid11.png" style="width: 350px; height: 350px;">
<pre><strong>Input:</strong> board = [[".",".",".","B",".",".",".","."],[".",".",".","W",".",".",".","."],[".",".",".","W",".",".",".","."],[".",".",".","W",".",".",".","."],["W","B","B",".","W","W","W","B"],[".",".",".","B",".",".",".","."],[".",".",".","B",".",".",".","."],[".",".",".","W",".",".",".","."]], rMove = 4, cMove = 3, color = "B"
<strong>Output:</strong> true
<strong>Explanation:</strong> '.', 'W', and 'B' are represented by the colors blue, white, and black respectively, and cell (rMove, cMove) is marked with an 'X'.
The two good lines with the chosen cell as an endpoint are annotated above with the red rectangles.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/10/grid2.png" style="width: 350px; height: 351px;">
<pre><strong>Input:</strong> board = [[".",".",".",".",".",".",".","."],[".","B",".",".","W",".",".","."],[".",".","W",".",".",".",".","."],[".",".",".","W","B",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".","B","W",".","."],[".",".",".",".",".",".","W","."],[".",".",".",".",".",".",".","B"]], rMove = 4, cMove = 4, color = "W"
<strong>Output:</strong> false
<strong>Explanation:</strong> While there are good lines with the chosen cell as a middle cell, there are no good lines with the chosen cell as an endpoint.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>board.length == board[r].length == 8</code></li>
	<li><code>0 &lt;= rMove, cMove &lt; 8</code></li>
	<li><code>board[rMove][cMove] == '.'</code></li>
	<li><code>color</code> is either <code>'B'</code> or <code>'W'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**
- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} board
 * @param {number} rMove
 * @param {number} cMove
 * @param {character} color
 * @return {boolean}
 */
var checkMove = function(board, rMove, cMove, color) {
    const m = board.length;
    const n = board[0].length;
    const moveDirection = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]];

    for (const [x, y] of moveDirection) {
        let col = cMove + x;
        let row = rMove + y;
        let cells = 1;

        while (row >= 0 && row < m && col >= 0 && col < n && board[row][col] !== '.' ) {
            cells += 1;
            if (cells < 3 && board[row][col] === color) break;
            if (board[row][col] === color) return true;
            col += x;
            row += y;
        }
    }
    return false;
};
```
