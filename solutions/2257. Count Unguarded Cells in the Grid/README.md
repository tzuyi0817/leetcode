# [2257. Count Unguarded Cells in the Grid](https://leetcode.com/problems/count-unguarded-cells-in-the-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two integers <code>m</code> and <code>n</code> representing a <strong>0-indexed</strong> <code>m x n</code> grid. You are also given two 2D integer arrays <code>guards</code> and <code>walls</code> where <code>guards[i] = [row<sub>i</sub>, col<sub>i</sub>]</code> and <code>walls[j] = [row<sub>j</sub>, col<sub>j</sub>]</code> represent the positions of the <code>i<sup>th</sup></code> guard and <code>j<sup>th</sup></code> wall respectively.</p>

<p>A guard can see <b>every</b> cell in the four cardinal directions (north, east, south, or west) starting from their position unless <strong>obstructed</strong> by a wall or another guard. A cell is <strong>guarded</strong> if there is <strong>at least</strong> one guard that can see it.</p>

<p>Return<em> the number of unoccupied cells that are <strong>not</strong> <strong>guarded</strong>.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/10/example1drawio2.png" style="width: 300px; height: 204px;">
<pre><strong>Input:</strong> m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
<strong>Output:</strong> 7
<strong>Explanation:</strong> The guarded and unguarded cells are shown in red and green respectively in the above diagram.
There are a total of 7 unguarded cells, so we return 7.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/10/example2drawio.png" style="width: 200px; height: 201px;">
<pre><strong>Input:</strong> m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> The unguarded cells are shown in green in the above diagram.
There are a total of 4 unguarded cells, so we return 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>
	<li><code>2 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= guards.length, walls.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>2 &lt;= guards.length + walls.length &lt;= m * n</code></li>
	<li><code>guards[i].length == walls[j].length == 2</code></li>
	<li><code>0 &lt;= row<sub>i</sub>, row<sub>j</sub> &lt; m</code></li>
	<li><code>0 &lt;= col<sub>i</sub>, col<sub>j</sub> &lt; n</code></li>
	<li>All the positions in <code>guards</code> and <code>walls</code> are <strong>unique</strong>.</li>
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
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
const countUnguarded = function (m, n, guards, walls) {
  const cells = Array.from({ length: m }, () => Array.from({ length: n }, () => false));
  let result = m * n - guards.length - walls.length;

  for (const [row, col] of guards) {
    cells[row][col] = 'G';
  }

  for (const [row, col] of walls) {
    cells[row][col] = 'W';
  }

  const checkGuarded = (row, col, isGuarded) => {
    const cell = cells[row][col];

    if (cell === 'G' || cell === 'W') {
      return cell === 'G';
    }
    if (isGuarded && !cell) {
      cells[row][col] = true;
      result -= 1;
    }
    return isGuarded;
  };

  for (let row = 0; row < m; row++) {
    let isGuarded = false;

    for (let col = 0; col < n; col++) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
    isGuarded = false;

    for (let col = n - 1; col >= 0; col--) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
  }

  for (let col = 0; col < n; col++) {
    let isGuarded = false;

    for (let row = 0; row < m; row++) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
    isGuarded = false;

    for (let row = m - 1; row >= 0; row--) {
      isGuarded = checkGuarded(row, col, isGuarded);
    }
  }
  return result;
};
```