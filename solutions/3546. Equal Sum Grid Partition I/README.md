# [3546. Equal Sum Grid Partition I](https://leetcode.com/problems/equal-sum-grid-partition-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> matrix <code>grid</code> of positive integers. Your task is to determine if it is possible to make <strong>either one horizontal or one vertical cut</strong> on the grid such that:</p>

<ul>
	<li>Each of the two resulting sections formed by the cut is <strong>non-empty</strong>.</li>
	<li>The sum of the elements in both sections is <strong>equal</strong>.</li>
</ul>

<p>Return <code>true</code> if such a partition exists; otherwise return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,4],[2,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">true</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2025/03/30/lc.png" style="width: 200px;"><img alt="" src="https://assets.leetcode.com/uploads/2025/03/30/lc.jpeg" style="width: 200px; height: 200px;"></p>

<p>A horizontal cut between row 0 and row 1 results in two non-empty sections, each with a sum of 5. Thus, the answer is <code>true</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,3],[2,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">false</span></p>

<p><strong>Explanation:</strong></p>

<p>No horizontal or vertical cut results in two non-empty sections with equal sums. Thus, the answer is <code>false</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= m == grid.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= n == grid[i].length &lt;= 10<sup>5</sup></code></li>
	<li><code>2 &lt;= m * n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {boolean}
 */
const canPartitionGrid = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  let totalSum = 0;
  let currentSum = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      totalSum += grid[row][col];
    }
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      currentSum += grid[row][col];
    }

    if (totalSum - currentSum === currentSum) return true;
  }

  currentSum = 0;

  for (let col = 0; col < n; col++) {
    for (let row = 0; row < m; row++) {
      currentSum += grid[row][col];
    }

    if (totalSum - currentSum === currentSum) return true;
  }

  return false;
};
```
