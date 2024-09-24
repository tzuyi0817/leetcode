# [407. Trapping Rain Water II](https://leetcode.com/problems/trapping-rain-water-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an <code>m x n</code> integer matrix <code>heightMap</code> representing the height of each unit cell in a 2D elevation map, return <em>the volume of water it can trap after raining</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/08/trap1-3d.jpg" style="width: 361px; height: 321px;">
<pre><strong>Input:</strong> heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> After the rain, water is trapped between the blocks.
We have two small ponds 1 and 3 units trapped.
The total volume of water trapped is 4.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/08/trap2-3d.jpg" style="width: 401px; height: 321px;">
<pre><strong>Input:</strong> heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
<strong>Output:</strong> 10
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == heightMap.length</code></li>
	<li><code>n == heightMap[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 200</code></li>
	<li><code>0 &lt;= heightMap[i][j] &lt;= 2 * 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Priority Queue`**

- Time complexity: <em>O(mnlogmn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} heightMap
 * @return {number}
 */
const trapRainWater = function (heightMap) {
  const m = heightMap.length;
  const n = heightMap[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = new MinPriorityQueue({ priority: ({ height }) => height });
  const visited = new Set();
  let maxHeight = (result = 0);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (row > 0 && col > 0 && row !== m - 1 && col !== n - 1) continue;
      queue.enqueue({ height: heightMap[row][col], row, col });
      visited.add(`${row},${col}`);
    }
  }
  while (queue.size()) {
    const cell = queue.dequeue().element;

    maxHeight = Math.max(cell.height, maxHeight);

    for (const [moveRow, moveCol] of directions) {
      const row = cell.row + moveRow;
      const col = cell.col + moveCol;
      const key = `${row},${col}`;

      if (row < 0 || col < 0 || row >= m || col >= n) continue;
      if (visited.has(key)) continue;
      const height = heightMap[row][col];

      visited.add(key);
      result += Math.max(0, maxHeight - height);
      queue.enqueue({ height, row, col });
    }
  }
  return result;
};
```
