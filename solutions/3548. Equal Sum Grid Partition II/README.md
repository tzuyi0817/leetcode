# [3548. Equal Sum Grid Partition II](https://leetcode.com/problems/equal-sum-grid-partition-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> matrix <code>grid</code> of positive integers. Your task is to determine if it is possible to make <strong>either one horizontal or one vertical cut</strong> on the grid such that:</p>

<ul>
	<li>Each of the two resulting sections formed by the cut is <strong>non-empty</strong>.</li>
	<li>The sum of elements in both sections is <b>equal</b>, or can be made equal by discounting <strong>at most</strong> one single cell in total (from either section).</li>
	<li>If a cell is discounted, the rest of the section must <strong>remain connected</strong>.</li>
</ul>

<p>Return <code>true</code> if such a partition exists; otherwise, return <code>false</code>.</p>

<p><strong>Note:</strong> A section is <strong>connected</strong> if every cell in it can be reached from any other cell by moving up, down, left, or right through other cells in the section.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,4],[2,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">true</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2025/03/30/lc.jpeg" style="height: 180px; width: 180px;"></p>

<ul>
	<li>A horizontal cut after the first row gives sums <code>1 + 4 = 5</code> and <code>2 + 3 = 5</code>, which are equal. Thus, the answer is <code>true</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,2],[3,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">true</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2025/04/01/chatgpt-image-apr-1-2025-at-05_28_12-pm.png" style="height: 180px; width: 180px;"></p>

<ul>
	<li>A vertical cut after the first column gives sums <code>1 + 3 = 4</code> and <code>2 + 4 = 6</code>.</li>
	<li>By discounting 2 from the right section (<code>6 - 2 = 4</code>), both sections have equal sums and remain connected. Thus, the answer is <code>true</code>.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[1,2,4],[2,3,5]]</span></p>

<p><strong>Output:</strong> <span class="example-io">false</span></p>

<p><strong>Explanation:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2025/04/01/chatgpt-image-apr-2-2025-at-02_50_29-am.png" style="height: 180px; width: 180px;"></strong></p>

<ul>
	<li>A horizontal cut after the first row gives <code>1 + 2 + 4 = 7</code> and <code>2 + 3 + 5 = 10</code>.</li>
	<li>By discounting 3 from the bottom section (<code>10 - 3 = 7</code>), both sections have equal sums, but they do not remain connected as it splits the bottom section into two parts (<code>[2]</code> and <code>[5]</code>). Thus, the answer is <code>false</code>.</li>
</ul>
</div>

<p><strong class="example">Example 4:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[4,1,8],[3,2,6]]</span></p>

<p><strong>Output:</strong> <span class="example-io">false</span></p>

<p><strong>Explanation:</strong></p>

<p>No valid cut exists, so the answer is <code>false</code>.</p>
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

**Solution: `Prefix Sum + Hash Table`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

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
  const valueMap = new Map();
  const rowSum = Array.from({ length: m }, () => 0);
  const colSum = Array.from({ length: n }, () => 0);
  let topSum = 0;
  let leftSum = 0;
  let totalSum = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];

      totalSum += value;
      rowSum[row] += value;
      colSum[col] += value;

      if (valueMap.has(value)) {
        const range = valueMap.get(value);

        range.minRow = Math.min(row, range.minRow);
        range.maxRow = Math.max(row, range.maxRow);
        range.minCol = Math.min(col, range.minCol);
        range.maxCol = Math.max(col, range.maxCol);
      } else {
        valueMap.set(value, {
          minRow: row,
          maxRow: row,
          minCol: col,
          maxCol: col,
        });
      }
    }
  }

  const isConnected = (row1, col1, row2, col2, value) => {
    if (!valueMap.has(value)) return false;

    const { minRow, maxRow, minCol, maxCol } = valueMap.get(value);
    const rows = row2 - row1 + 1;
    const cols = col2 - col1 + 1;

    if (rows === 1 || cols === 1) {
      return grid[row1][col1] === value || grid[row2][col2] === value;
    }

    return minRow <= row2 && maxRow >= row1 && minCol <= col2 && maxCol >= col1;
  };

  for (let row = 0; row < m; row++) {
    topSum += rowSum[row];

    const bottomSum = totalSum - topSum;

    if (topSum === bottomSum) return true;

    if (isConnected(0, 0, row, n - 1, topSum - bottomSum)) return true;

    if (isConnected(row + 1, 0, m - 1, n - 1, bottomSum - topSum)) return true;
  }

  for (let col = 0; col < n; col++) {
    leftSum += colSum[col];

    const rightSum = totalSum - leftSum;

    if (leftSum === rightSum) return true;

    if (isConnected(0, 0, m - 1, col, leftSum - rightSum)) return true;

    if (isConnected(0, col + 1, m - 1, n - 1, rightSum - leftSum)) return true;
  }

  return false;
};
```
