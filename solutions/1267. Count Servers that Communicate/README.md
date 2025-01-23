# [1267. Count Servers that Communicate](https://leetcode.com/problems/count-servers-that-communicate)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a map of a server center, represented as a <code>m * n</code> integer matrix&nbsp;<code>grid</code>, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.<br>
<br>
Return the number of servers&nbsp;that communicate with any other server.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/14/untitled-diagram-6.jpg" style="width: 202px; height: 203px;"></p>

<pre><strong>Input:</strong> grid = [[1,0],[0,1]]
<strong>Output:</strong> 0
<b>Explanation:</b>&nbsp;No servers can communicate with others.</pre>

<p><strong class="example">Example 2:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/11/13/untitled-diagram-4.jpg" style="width: 203px; height: 203px;"></strong></p>

<pre><strong>Input:</strong> grid = [[1,0],[1,1]]
<strong>Output:</strong> 3
<b>Explanation:</b>&nbsp;All three servers can communicate with at least one other server.
</pre>

<p><strong class="example">Example 3:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/14/untitled-diagram-1-3.jpg" style="width: 443px; height: 443px;"></p>

<pre><strong>Input:</strong> grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
<strong>Output:</strong> 4
<b>Explanation:</b>&nbsp;The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m &lt;= 250</code></li>
	<li><code>1 &lt;= n &lt;= 250</code></li>
	<li><code>grid[i][j] == 0 or 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Counting`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(m + n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const countServers = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const serversRow = Array.from({ length: m }, () => 0);
  const serversCol = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;

      serversRow[row] += 1;
      serversCol[col] += 1;
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;
      if (serversRow[row] > 1 || serversCol[col] > 1) {
        result += 1;
      }
    }
  }
  return result;
};
```
