# [1728. Cat and Mouse II](https://leetcode.com/problems/cat-and-mouse-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>A game is played by a cat and a mouse named Cat and Mouse.</p>

<p>The environment is represented by a <code>grid</code> of size <code>rows x cols</code>, where each element is a wall, floor, player (Cat, Mouse), or food.</p>

<ul>
	<li>Players are represented by the characters <code>'C'</code>(Cat)<code>,'M'</code>(Mouse).</li>
	<li>Floors are represented by the character <code>'.'</code> and can be walked on.</li>
	<li>Walls are represented by the character <code>'#'</code> and cannot be walked on.</li>
	<li>Food is represented by the character <code>'F'</code> and can be walked on.</li>
	<li>There is only one of each character <code>'C'</code>, <code>'M'</code>, and <code>'F'</code> in <code>grid</code>.</li>
</ul>

<p>Mouse and Cat play according to the following rules:</p>

<ul>
	<li>Mouse <strong>moves first</strong>, then they take turns to move.</li>
	<li>During each turn, Cat and Mouse can jump in one of the four directions (left, right, up, down). They cannot jump over the wall nor outside of the <code>grid</code>.</li>
	<li><code>catJump, mouseJump</code> are the maximum lengths Cat and Mouse can jump at a time, respectively. Cat and Mouse can jump less than the maximum length.</li>
	<li>Staying in the same position is allowed.</li>
	<li>Mouse can jump over Cat.</li>
</ul>

<p>The game can end in 4 ways:</p>

<ul>
	<li>If Cat occupies the same position as Mouse, Cat wins.</li>
	<li>If Cat reaches the food first, Cat wins.</li>
	<li>If Mouse reaches the food first, Mouse wins.</li>
	<li>If Mouse cannot get to the food within 1000 turns, Cat wins.</li>
</ul>

<p>Given a <code>rows x cols</code> matrix <code>grid</code> and two integers <code>catJump</code> and <code>mouseJump</code>, return <code>true</code><em> if Mouse can win the game if both Cat and Mouse play optimally, otherwise return </em><code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/12/sample_111_1955.png" style="width: 580px; height: 239px;">
<pre><strong>Input:</strong> grid = ["####F","#C...","M...."], catJump = 1, mouseJump = 2
<strong>Output:</strong> true
<strong>Explanation:</strong> Cat cannot catch Mouse on its turn nor can it get the food before Mouse.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/12/sample_2_1955.png" style="width: 580px; height: 175px;">
<pre><strong>Input:</strong> grid = ["M.C...F"], catJump = 1, mouseJump = 4
<strong>Output:</strong> true
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> grid = ["M.C...F"], catJump = 1, mouseJump = 3
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>rows == grid.length</code></li>
	<li><code>cols = grid[i].length</code></li>
	<li><code>1 &lt;= rows, cols &lt;= 8</code></li>
	<li><code>grid[i][j]</code> consist only of characters <code>'C'</code>, <code>'M'</code>, <code>'F'</code>, <code>'.'</code>, and <code>'#'</code>.</li>
	<li>There is only one of each character <code>'C'</code>, <code>'M'</code>, and <code>'F'</code> in <code>grid</code>.</li>
	<li><code>1 &lt;= catJump, mouseJump &lt;= 8</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O((mn)<sup>3</sup>\*(m+n))</em>
- Space complexity: <em>O((mn)<sup>3</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} grid
 * @param {number} catJump
 * @param {number} mouseJump
 * @return {boolean}
 */
const canMouseWin = function (grid, catJump, mouseJump) {
  const m = grid.length;
  const n = grid[0].length;
  const mouse = { row: 0, col: 0 };
  const cat = { row: 0, col: 0 };
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const memo = new Map();
  let floors = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      if (value !== '#') floors += 1;
      if (value === 'M') {
        mouse.row = row;
        mouse.col = col;
      } else if (value === 'C') {
        cat.row = row;
        cat.col = col;
      }
    }
  }

  const isMouseWin = (mouseRow, mouseCol, catRow, catCol, turns) => {
    if (turns >= floors * 2) return false;
    const key = `${mouseRow},${mouseCol},${catRow},${catCol},${turns}`;

    if (memo.has(key)) return memo.get(key);
    const round = turns % 2 ? 'C' : 'M';
    const mouseRound = round === 'M';
    const jump = mouseRound ? mouseJump : catJump;

    for (const [row, col] of directions) {
      for (let move = 0; move <= jump; move++) {
        const moveRow = row * move;
        const moveCol = col * move;
        const nextRow = (mouseRound ? mouseRow : catRow) + moveRow;
        const nextCol = (mouseRound ? mouseCol : catCol) + moveCol;

        if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n) break;
        const value = grid[nextRow][nextCol];

        if (value === '#') break;
        if (value === 'F') {
          memo.set(key, mouseRound);

          return mouseRound;
        }

        if (mouseRound && isMouseWin(nextRow, nextCol, catRow, catCol, turns + 1)) {
          memo.set(key, true);

          return true;
        }

        if (!mouseRound) {
          if (mouseRow === nextRow && mouseCol === nextCol) {
            memo.set(key, false);

            return false;
          }

          if (!isMouseWin(mouseRow, mouseCol, nextRow, nextCol, turns + 1)) {
            memo.set(key, false);

            return false;
          }
        }
      }
    }

    memo.set(key, !mouseRound);

    return !mouseRound;
  };

  return isMouseWin(mouse.row, mouse.col, cat.row, cat.col, 0);
};
```
