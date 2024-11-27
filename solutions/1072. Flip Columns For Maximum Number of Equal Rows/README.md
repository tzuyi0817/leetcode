# [1072. Flip Columns For Maximum Number of Equal Rows](https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> binary matrix <code>matrix</code>.</p>

<p>You can choose any number of columns in the matrix and flip every cell in that column (i.e., Change the value of the cell from <code>0</code> to <code>1</code> or vice versa).</p>

<p>Return <em>the maximum number of rows that have all values equal after some number of flips</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> matrix = [[0,1],[1,1]]
<strong>Output:</strong> 1
<strong>Explanation:</strong> After flipping no values, 1 row has all values equal.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> matrix = [[0,1],[1,0]]
<strong>Output:</strong> 2
<strong>Explanation:</strong> After flipping values in the first column, both rows have equal values.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> matrix = [[0,0,0],[0,0,1],[1,1,0]]
<strong>Output:</strong> 2
<strong>Explanation:</strong> After flipping values in the first two columns, the last two rows have equal values.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == matrix.length</code></li>
	<li><code>n == matrix[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 300</code></li>
	<li><code>matrix[i][j]</code> is either&nbsp;<code>0</code> or <code>1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} matrix
 * @return {number}
 */
const maxEqualRowsAfterFlips = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const rowMap = new Map();
  let result = 0;

  for (let row = 0; row < m; row++) {
    const isFlip = matrix[row][0];
    let current = '';

    for (let col = 0; col < n; col++) {
      const value = matrix[row][col];
      const flipValue = isFlip ? value ^ 1 : value;

      current += `${flipValue}`;
    }
    const sameRowCount = rowMap.get(current) ?? 0;

    rowMap.set(current, sameRowCount + 1);
    result = Math.max(sameRowCount + 1, result);
  }
  return result;
};
```