# [1591. Strange Printer II](https://leetcode.com/problems/strange-printer-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a strange printer with the following two special requirements:</p>

<ul>
	<li>On each turn, the printer will print a solid rectangular pattern of a single color on the grid. This will cover up the existing colors in the rectangle.</li>
	<li>Once the printer has used a color for the above operation, <strong>the same color cannot be used again</strong>.</li>
</ul>

<p>You are given a <code>m x n</code> matrix <code>targetGrid</code>, where <code>targetGrid[row][col]</code> is the color in the position <code>(row, col)</code> of the grid.</p>

<p>Return <code>true</code><em> if it is possible to print the matrix </em><code>targetGrid</code><em>,</em><em> otherwise, return </em><code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/23/print1.jpg" style="width: 600px; height: 175px;">
<pre><strong>Input:</strong> targetGrid = [[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]
<strong>Output:</strong> true
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/23/print2.jpg" style="width: 600px; height: 367px;">
<pre><strong>Input:</strong> targetGrid = [[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]
<strong>Output:</strong> true
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> targetGrid = [[1,2,1],[2,1,2],[1,2,1]]
<strong>Output:</strong> false
<strong>Explanation:</strong> It is impossible to form targetGrid because it is not allowed to print the same color in different turns.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == targetGrid.length</code></li>
	<li><code>n == targetGrid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 60</code></li>
	<li><code>1 &lt;= targetGrid[row][col] &lt;= 60</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Topological Sort`**

- Time complexity: <em>O(60mn -> mn)</em>
- Space complexity: <em>O(60mn -> mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} targetGrid
 * @return {boolean}
 */
const isPrintable = function (targetGrid) {
  const m = targetGrid.length;
  const n = targetGrid[0].length;
  const colorMap = new Map();

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const color = targetGrid[row][col];
      const coord = colorMap.get(color) ?? { top: row, left: col, bottom: row, right: col };

      coord.top = Math.min(row, coord.top);
      coord.left = Math.min(col, coord.left);
      coord.bottom = Math.max(row, coord.bottom);
      coord.right = Math.max(col, coord.right);
      colorMap.set(color, coord);
    }
  }

  const graph = new Map();
  const indegreeMap = new Map();

  for (const [color, coord] of colorMap) {
    for (let row = coord.top; row <= coord.bottom; row++) {
      for (let col = coord.left; col <= coord.right; col++) {
        const currentColor = targetGrid[row][col];

        if (color === currentColor) continue;
        if (!graph.has(currentColor)) {
          graph.set(currentColor, new Set());
        }
        const colors = graph.get(currentColor);

        if (colors.has(color)) continue;
        const indegree = indegreeMap.get(color) ?? 0;

        colors.add(color);
        indegreeMap.set(color, indegree + 1);
      }
    }
  }

  let queue = [];
  let printed = 0;

  for (const color of colorMap.keys()) {
    if (indegreeMap.has(color)) continue;

    queue.push(color);
  }

  while (queue.length) {
    const nextQueue = [];

    for (const color of queue) {
      printed += 1;

      if (!graph.has(color)) continue;

      for (const nextColor of graph.get(color)) {
        const indegree = indegreeMap.get(nextColor);

        if (indegree - 1 === 0) {
          nextQueue.push(nextColor);
        }

        indegreeMap.set(nextColor, indegree - 1);
      }
    }

    queue = nextQueue;
  }

  return printed === colorMap.size;
};
```
