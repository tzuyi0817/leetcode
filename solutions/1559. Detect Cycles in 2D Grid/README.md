# [1559. Detect Cycles in 2D Grid](https://leetcode.com/problems/detect-cycles-in-2d-grid)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given a 2D array of characters <code>grid</code> of size <code>m x n</code>, you need to find if there exists any cycle consisting of the <strong>same value</strong> in <code>grid</code>.</p>

<p>A cycle is a path of <strong>length 4 or more</strong> in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it - in one of the four directions (up, down, left, or right), if it has the <strong>same value</strong> of the current cell.</p>

<p>Also, you cannot move to the cell that you visited in your last move. For example, the cycle <code>(1, 1) -&gt; (1, 2) -&gt; (1, 1)</code> is invalid because from <code>(1, 2)</code> we visited <code>(1, 1)</code> which was the last visited cell.</p>

<p>Return <code>true</code> if any cycle of the same value exists in <code>grid</code>, otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/07/15/1.png" style="width: 231px; height: 152px;"></strong></p>

<pre><strong>Input:</strong> grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
<strong>Output:</strong> true
<strong>Explanation: </strong>There are two valid cycles shown in different colors in the image below:
<img alt="" src="https://assets.leetcode.com/uploads/2020/07/15/11.png" style="width: 225px; height: 163px;">
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/07/15/22.png" style="width: 236px; height: 154px;"></strong></p>

<pre><strong>Input:</strong> grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]
<strong>Output:</strong> true
<strong>Explanation: </strong>There is only one valid cycle highlighted in the image below:
<img alt="" src="https://assets.leetcode.com/uploads/2020/07/15/2.png" style="width: 229px; height: 157px;">
</pre>

<p><strong class="example">Example 3:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/07/15/3.png" style="width: 183px; height: 120px;"></strong></p>

<pre><strong>Input:</strong> grid = [["a","b","b"],["b","z","b"],["b","b","a"]]
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 500</code></li>
	<li><code>grid</code> consists only of lowercase English letters.</li>
</ul>
</div>
<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} grid
 * @return {boolean}
 */
const containsCycle = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const visited = new Set();
  const isCycle = (row, col, preRow, preCol, value) => {
    if (row < 0 || col < 0 || row >= m || col >= n) return false;
    const current = grid[row][col];
    if (current !== value) return false;
    if (visited.has(`${row}_${col}`)) return true;
    visited.add(`${row}_${col}`);

    for (const move of [1, -1]) {
      const moveRow = row + move;
      const moveCol = col + move;

      if (moveRow !== preRow && isCycle(moveRow, col, row, col, value)) return true;
      if (moveCol !== preCol && isCycle(row, moveCol, row, col, value)) return true;
    }
    return false;
  };

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (visited.has(`${row}_${col}`)) continue;
      const value = grid[row][col];

      if (isCycle(row, col, -1, -1, value)) return true;
    }
  }
  return false;
};
```
