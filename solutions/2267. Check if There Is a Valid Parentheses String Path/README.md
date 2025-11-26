# [2267. Check if There Is a Valid Parentheses String Path](https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path)

## Description

<div class="elfjS" data-track-load="description_content"><p>A parentheses string is a <strong>non-empty</strong> string consisting only of <code>'('</code> and <code>')'</code>. It is <strong>valid</strong> if <strong>any</strong> of the following conditions is <strong>true</strong>:</p>

<ul>
	<li>It is <code>()</code>.</li>
	<li>It can be written as <code>AB</code> (<code>A</code> concatenated with <code>B</code>), where <code>A</code> and <code>B</code> are valid parentheses strings.</li>
	<li>It can be written as <code>(A)</code>, where <code>A</code> is a valid parentheses string.</li>
</ul>

<p>You are given an <code>m x n</code> matrix of parentheses <code>grid</code>. A <strong>valid parentheses string path</strong> in the grid is a path satisfying <strong>all</strong> of the following conditions:</p>

<ul>
	<li>The path starts from the upper left cell <code>(0, 0)</code>.</li>
	<li>The path ends at the bottom-right cell <code>(m - 1, n - 1)</code>.</li>
	<li>The path only ever moves <strong>down</strong> or <strong>right</strong>.</li>
	<li>The resulting parentheses string formed by the path is <strong>valid</strong>.</li>
</ul>

<p>Return <code>true</code> <em>if there exists a <strong>valid parentheses string path</strong> in the grid.</em> Otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/15/example1drawio.png" style="width: 521px; height: 300px;">
<pre><strong>Input:</strong> grid = [["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]]
<strong>Output:</strong> true
<strong>Explanation:</strong> The above diagram shows two possible paths that form valid parentheses strings.
The first path shown results in the valid parentheses string "()(())".
The second path shown results in the valid parentheses string "((()))".
Note that there may be other valid parentheses string paths.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/15/example2drawio.png" style="width: 165px; height: 165px;">
<pre><strong>Input:</strong> grid = [[")",")"],["(","("]]
<strong>Output:</strong> false
<strong>Explanation:</strong> The two possible paths form the parentheses strings "))(" and ")((". Since neither of them are valid parentheses strings, we return false.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 100</code></li>
	<li><code>grid[i][j]</code> is either <code>'('</code> or <code>')'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn\*(m+n))</em>
- Space complexity: <em>O(mn\*(m+n))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} grid
 * @return {boolean}
 */
const hasValidPath = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => {
    return new Array(n)
      .fill('')
      .map(() => new Array(m + n).fill(-1));
  });

  const findValidPath = (row, col, parentheses) => {
    if (row >= m || col >= n) return false;
    if (dp[row][col][parentheses] !== -1) return dp[row][col][parentheses];

    const value = grid[row][col];
    const diff = value === '(' ? 1 : -1;
    const nextParentheses = parentheses + diff;

    if (nextParentheses < 0) return false;
    if (nextParentheses > m + n - row - col) return false;
    if (row === m - 1 && col === n - 1) {
      return nextParentheses === 0;
    }

    const down = findValidPath(row + 1, col, nextParentheses);
    const right = findValidPath(row, col + 1, nextParentheses);
    const result = down || right;

    dp[row][col][parentheses] = result;

    return result;
  };

  return findValidPath(0, 0, 0);
};
```
