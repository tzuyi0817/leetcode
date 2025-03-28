# [2503. Maximum Number of Points From Grid Queries](https://leetcode.com/problems/maximum-number-of-points-from-grid-queries)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> integer matrix <code>grid</code> and an array <code>queries</code> of size <code>k</code>.</p>

<p>Find an array <code>answer</code> of size <code>k</code> such that for each integer <code>queries[i]</code> you start in the <strong>top left</strong> cell of the matrix and repeat the following process:</p>

<ul>
	<li>If <code>queries[i]</code> is <strong>strictly</strong> greater than the value of the current cell that you are in, then you get one point if it is your first time visiting this cell, and you can move to any <strong>adjacent</strong> cell in all <code>4</code> directions: up, down, left, and right.</li>
	<li>Otherwise, you do not get any points, and you end this process.</li>
</ul>

<p>After the process, <code>answer[i]</code> is the <strong>maximum</strong> number of points you can get. <strong>Note</strong> that for each query you are allowed to visit the same cell <strong>multiple</strong> times.</p>

<p>Return <em>the resulting array</em> <code>answer</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2025/03/15/image1.png" style="width: 571px; height: 152px;">
<pre><strong>Input:</strong> grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
<strong>Output:</strong> [5,8,1]
<strong>Explanation:</strong> The diagrams above show which cells we visit to get points for each query.</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/10/20/yetgriddrawio-2.png">
<pre><strong>Input:</strong> grid = [[5,2,1],[1,1,2]], queries = [3]
<strong>Output:</strong> [0]
<strong>Explanation:</strong> We can not get any points because the value of the top left cell is already greater than or equal to 3.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>2 &lt;= m, n &lt;= 1000</code></li>
	<li><code>4 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>k == queries.length</code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= grid[i][j], queries[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue + Breadth-First Search`**

- Time complexity: <em>O(mnlogmn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */
const maxPoints = function (grid, queries) {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const minHeap = new MinPriorityQueue(({ val }) => val);
  const indexdQueries = queries.map((query, index) => ({ query, index }));
  const result = Array.from({ length: queries.length }, () => 0);
  let cells = 0;

  minHeap.enqueue({ val: grid[0][0], row: 0, col: 0 });
  visited[0][0] = true;
  indexdQueries.sort((a, b) => a.query - b.query);

  const getCells = query => {
    while (minHeap.size()) {
      const element = minHeap.front();

      if (element.val >= query) return cells;
      const { row, col } = minHeap.dequeue();

      cells += 1;

      for (const [moveRow, moveCol] of directions) {
        const nextRow = row + moveRow;
        const nextCol = col + moveCol;

        if (nextRow < 0 || nextCol < 0 || nextRow >= m || nextCol >= n) continue;
        if (visited[nextRow][nextCol]) continue;

        visited[nextRow][nextCol] = true;
        minHeap.enqueue({ row: nextRow, col: nextCol, val: grid[nextRow][nextCol] });
      }
    }

    return cells;
  };

  for (const { query, index } of indexdQueries) {
    result[index] = getCells(query);
  }

  return result;
};
```
