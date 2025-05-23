# [827. Making A Large Island](https://leetcode.com/problems/making-a-large-island)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>n x n</code> binary matrix <code>grid</code>. You are allowed to change <strong>at most one</strong> <code>0</code> to be <code>1</code>.</p>

<p>Return <em>the size of the largest <strong>island</strong> in</em> <code>grid</code> <em>after applying this operation</em>.</p>

<p>An <strong>island</strong> is a 4-directionally connected group of <code>1</code>s.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> grid = [[1,0],[0,1]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[1,1],[1,0]]
<strong>Output:</strong> 4
<strong>Explanation: </strong>Change the 0 to 1 and make the island bigger, only one island with area = 4.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> grid = [[1,1],[1,1]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> Can't change any 0 to 1, only one island with area = 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= n &lt;= 500</code></li>
	<li><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const largestIsland = function (grid) {
  const n = grid.length;

  const getGroupArea = (row, col, group) => {
    if (row >= n || col >= n || row < 0 || col < 0) return 0;
    if (grid[row][col] !== 1) return 0;

    grid[row][col] = group;

    const leftArea = getGroupArea(row, col - 1, group);
    const rightArea = getGroupArea(row, col + 1, group);
    const upperArea = getGroupArea(row - 1, col, group);
    const lowerArea = getGroupArea(row + 1, col, group);

    return 1 + leftArea + rightArea + upperArea + lowerArea;
  };
  const groupMap = new Map();
  let group = 2;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] !== 1) continue;
      const area = getGroupArea(row, col, group);

      groupMap.set(group, area);
      group += 1;
    }
  }
  let result = 0;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] !== 0) continue;
      const leftGroup = grid[row][col - 1];
      const rightGroup = grid[row][col + 1];
      const upperGroup = grid[row - 1]?.[col];
      const lowerGroup = grid[row + 1]?.[col];
      const groups = new Set([leftGroup, rightGroup, upperGroup, lowerGroup]);
      let area = 1;

      for (const group of groups) {
        area += groupMap.get(group) ?? 0;
      }
      result = Math.max(area, result);
    }
  }
  return result ? result : n * n;
};
```
