# [1504. Count Submatrices With All Ones](https://leetcode.com/problems/count-submatrices-with-all-ones)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given an <code>m x n</code> binary matrix <code>mat</code>, <em>return the number of <strong>submatrices</strong> that have all ones</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/10/27/ones1-grid.jpg" style="width: 244px; height: 245px;">
<pre><strong>Input:</strong> mat = [[1,0,1],[1,1,0],[1,1,0]]
<strong>Output:</strong> 13
<strong>Explanation:</strong> 
There are 6 rectangles of side 1x1.
There are 2 rectangles of side 1x2.
There are 3 rectangles of side 2x1.
There is 1 rectangle of side 2x2. 
There is 1 rectangle of side 3x1.
Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/10/27/ones2-grid.jpg" style="width: 324px; height: 245px;">
<pre><strong>Input:</strong> mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]
<strong>Output:</strong> 24
<strong>Explanation:</strong> 
There are 8 rectangles of side 1x1.
There are 5 rectangles of side 1x2.
There are 2 rectangles of side 1x3. 
There are 4 rectangles of side 2x1.
There are 2 rectangles of side 2x2. 
There are 2 rectangles of side 3x1. 
There is 1 rectangle of side 3x2. 
Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= m, n &lt;= 150</code></li>
	<li><code>mat[i][j]</code> is either <code>0</code> or <code>1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(m<sup>2</sup>n)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} mat
 * @return {number}
 */
const numSubmat = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const dp = new Array(m + 1)
    .fill('')
    .map(_ => new Array(n + 1).fill(0));
  let result = 0;

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      const value = mat[row - 1][col - 1];

      dp[row][col] = value ? dp[row][col - 1] + value : 0;
    }
  }

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      if (!dp[row][col]) continue;
      let minW = dp[row][col];

      for (let k = row; k >= 0; k--) {
        if (!dp[k][col]) break;
        minW = Math.min(minW, dp[k][col]);
        result += minW;
      }
    }
  }
  return result;
};
```
