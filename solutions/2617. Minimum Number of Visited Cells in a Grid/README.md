# [2617. Minimum Number of Visited Cells in a Grid](https://leetcode.com/problems/minimum-number-of-visited-cells-in-a-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> <code>m x n</code> integer matrix <code>grid</code>. Your initial position is at the <strong>top-left</strong> cell <code>(0, 0)</code>.</p>

<p>Starting from the cell <code>(i, j)</code>, you can move to one of the following cells:</p>

<ul>
	<li>Cells <code>(i, k)</code> with <code>j &lt; k &lt;= grid[i][j] + j</code> (rightward movement), or</li>
	<li>Cells <code>(k, j)</code> with <code>i &lt; k &lt;= grid[i][j] + i</code> (downward movement).</li>
</ul>

<p>Return <em>the minimum number of cells you need to visit to reach the <strong>bottom-right</strong> cell</em> <code>(m - 1, n - 1)</code>. If there is no valid path, return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/01/25/ex1.png" style="width: 271px; height: 171px;">
<pre><strong>Input:</strong> grid = [[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> The image above shows one of the paths that visits exactly 4 cells.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/01/25/ex2.png" style="width: 271px; height: 171px;">
<pre><strong>Input:</strong> grid = [[3,4,2,1],[4,2,1,1],[2,1,1,0],[3,4,1,0]]
<strong>Output:</strong> 3
<strong>Explanation: </strong>The image above shows one of the paths that visits exactly 3 cells.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/01/26/ex3.png" style="width: 181px; height: 81px;">
<pre><strong>Input:</strong> grid = [[2,1,0],[1,0,0]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> It can be proven that no path exists.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= grid[i][j] &lt; m * n</code></li>
	<li><code>grid[m - 1][n - 1] == 0</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(mn(log(m + n)))</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const minimumVisitedCells = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const rows = Array.from({ length: m }, () => new SegmentTree(n));
  const cols = Array.from({ length: n }, () => new SegmentTree(m));

  rows[m - 1].update(n - 1, 1);
  cols[n - 1].update(m - 1, 1);

  for (let row = m - 1; row >= 0; row--) {
    for (let col = n - 1; col >= 0; col--) {
      const value = grid[row][col];

      if (!value) continue;

      const colK = Math.min(col + value, n - 1);
      const rowK = Math.min(row + value, m - 1);
      const moveRight = rows[row].query(col + 1, colK);
      const moveDown = cols[col].query(row + 1, rowK);
      const minMove = Math.min(moveRight, moveDown);

      if (minMove !== Number.MAX_SAFE_INTEGER) {
        const steps = minMove + 1;

        rows[row].update(col, steps);
        cols[col].update(row, steps);
      }
    }
  }

  const result = rows[0].query(0, 0);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};

class SegmentTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n * 4).fill(Number.MAX_SAFE_INTEGER);
  }

  update(index, val) {
    this.#update(0, 0, this.n - 1, index, val);
  }

  query(low, high) {
    return this.#query(0, 0, this.n - 1, low, high);
  }

  merge(index) {
    return Math.min(this.tree[index * 2 + 1], this.tree[index * 2 + 2]);
  }

  #update(index, left, right, target, val) {
    if (left === right) {
      this.tree[index] = val;
      return;
    }

    const mid = Math.floor((left + right) / 2);

    if (target <= mid) {
      this.#update(index * 2 + 1, left, mid, target, val);
    } else {
      this.#update(index * 2 + 2, mid + 1, right, target, val);
    }

    this.tree[index] = this.merge(index);
  }

  #query(index, left, right, low, high) {
    if (low <= left && high >= right) {
      return this.tree[index];
    }

    if (low > right || high < left) {
      return Number.MAX_SAFE_INTEGER;
    }

    const mid = Math.floor((left + right) / 2);
    const leftValue = this.#query(index * 2 + 1, left, mid, low, high);
    const rightValue = this.#query(index * 2 + 2, mid + 1, right, low, high);

    return Math.min(leftValue, rightValue);
  }
}
```
