# [2018. Check if Word Can Be Placed In Crossword](https://leetcode.com/problems/check-if-word-can-be-placed-in-crossword)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> matrix <code>board</code>, representing the<strong> current </strong>state of a crossword puzzle. The crossword contains lowercase English letters (from solved words), <code>' '</code> to represent any <strong>empty </strong>cells, and <code>'#'</code> to represent any <strong>blocked</strong> cells.</p>

<p>A word can be placed<strong> horizontally</strong> (left to right <strong>or</strong> right to left) or <strong>vertically</strong> (top to bottom <strong>or</strong> bottom to top) in the board if:</p>

<ul>
	<li>It does not occupy a cell containing the character <code>'#'</code>.</li>
	<li>The cell each letter is placed in must either be <code>' '</code> (empty) or <strong>match</strong> the letter already on the <code>board</code>.</li>
	<li>There must not be any empty cells <code>' '</code> or other lowercase letters <strong>directly left or right</strong><strong> </strong>of the word if the word was placed <strong>horizontally</strong>.</li>
	<li>There must not be any empty cells <code>' '</code> or other lowercase letters <strong>directly above or below</strong> the word if the word was placed <strong>vertically</strong>.</li>
</ul>

<p>Given a string <code>word</code>, return <code>true</code><em> if </em><code>word</code><em> can be placed in </em><code>board</code><em>, or </em><code>false</code><em> <strong>otherwise</strong></em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/10/04/crossword-ex1-1.png" style="width: 478px; height: 180px;">
<pre><strong>Input:</strong> board = [["#", " ", "#"], [" ", " ", "#"], ["#", "c", " "]], word = "abc"
<strong>Output:</strong> true
<strong>Explanation:</strong> The word "abc" can be placed as shown above (top to bottom).
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/10/04/crossword-ex2-1.png" style="width: 180px; height: 180px;">
<pre><strong>Input:</strong> board = [[" ", "#", "a"], [" ", "#", "c"], [" ", "#", "a"]], word = "ac"
<strong>Output:</strong> false
<strong>Explanation:</strong> It is impossible to place the word because there will always be a space/letter above or below it.</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/10/04/crossword-ex3-1.png" style="width: 478px; height: 180px;">
<pre><strong>Input:</strong> board = [["#", " ", "#"], [" ", " ", "#"], ["#", " ", "c"]], word = "ca"
<strong>Output:</strong> true
<strong>Explanation:</strong> The word "ca" can be placed as shown above (right to left). 
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == board.length</code></li>
	<li><code>n == board[i].length</code></li>
	<li><code>1 &lt;= m * n &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>board[i][j]</code> will be <code>' '</code>, <code>'#'</code>, or a lowercase English letter.</li>
	<li><code>1 &lt;= word.length &lt;= max(m, n)</code></li>
	<li><code>word</code> will contain only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const placeWordInCrossword = function (board, word) {
  const m = board.length;
  const n = board[0].length;
  const isCorner = cell => cell === '#' || cell === undefined;
  const isCanPlaced = (row, col, moveX, moveY) => {
    for (const element of word) {
      const letter = board[row]?.[col];

      if (letter !== element && letter !== ' ') return false;
      row += moveY;
      col += moveX;
    }
    return isCorner(board[row]?.[col]);
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (isCorner(board[row][col])) continue;
      const leftCell = board[row][col - 1];
      const rightCell = board[row][col + 1];
      const aboveCell = board[row - 1]?.[col];
      const bellowCell = board[row + 1]?.[col];

      if (isCorner(leftCell) && isCanPlaced(row, col, 1, 0)) return true;
      if (isCorner(rightCell) && isCanPlaced(row, col, -1, 0)) return true;
      if (isCorner(aboveCell) && isCanPlaced(row, col, 0, 1)) return true;
      if (isCorner(bellowCell) && isCanPlaced(row, col, 0, -1)) return true;
    }
  }
  return false;
};
```
