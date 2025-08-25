# [498. Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an <code>m x n</code> matrix <code>mat</code>, return <em>an array of all the elements of the array in a diagonal order</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/10/diag1-grid.jpg" style="width: 334px; height: 334px;">
<pre><strong>Input:</strong> mat = [[1,2,3],[4,5,6],[7,8,9]]
<strong>Output:</strong> [1,2,4,7,5,3,6,8,9]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> mat = [[1,2],[3,4]]
<strong>Output:</strong> [1,2,3,4]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == mat.length</code></li>
	<li><code>n == mat[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= m * n &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>5</sup> &lt;= mat[i][j] &lt;= 10<sup>5</sup></code></li>
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
 * @param {number[][]} mat
 * @return {number[]}
 */
const findDiagonalOrder = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const result = [];
  let row = 0;
  let col = 0;
  let direction = 1;

  for (let index = 0; index < m * n; index++) {
    let nextRow = row - direction;
    let nextCol = col + direction;

    if (nextCol < 0) {
      nextCol = nextRow > m - 1 ? 1 : 0;
      nextRow = Math.min(m - 1, nextRow);
      direction *= -1;
    } else if (nextCol >= n) {
      nextCol = n - 1;
      nextRow = row + 1;
      direction *= -1;
    } else if (nextRow < 0) {
      nextRow = 0;
      direction *= -1;
    } else if (nextRow >= m) {
      nextRow = m - 1;
      nextCol = col + 1;
      direction *= -1;
    }

    result[index] = mat[row][col];
    row = nextRow;
    col = nextCol;
  }

  return result;
};
```
