# [363. Max Sum of Rectangle No Larger Than K](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an <code>m x n</code> matrix <code>matrix</code> and an integer <code>k</code>, return <em>the max sum of a rectangle in the matrix such that its sum is no larger than</em> <code>k</code>.</p>

<p>It is <strong>guaranteed</strong> that there will be a rectangle with a sum no larger than <code>k</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/18/sum-grid.jpg" style="width: 255px; height: 176px;">
<pre><strong>Input:</strong> matrix = [[1,0,1],[0,-2,3]], k = 2
<strong>Output:</strong> 2
<strong>Explanation:</strong> Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, and 2 is the max number no larger than k (k = 2).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> matrix = [[2,2,-1]], k = 3
<strong>Output:</strong> 3
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == matrix.length</code></li>
	<li><code>n == matrix[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 100</code></li>
	<li><code>-100 &lt;= matrix[i][j] &lt;= 100</code></li>
	<li><code>-10<sup>5</sup> &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow up:</strong> What if the number of rows is much larger than the number of columns?</p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(m<sup>2</sup>n<sup>2</sup>)</em>
- Space complexity: <em>O(m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
const maxSumSubmatrix = function (matrix, k) {
  const m = matrix.length;
  const n = matrix[0].length;
  let result = Number.MIN_SAFE_INTEGER;

  for (let upperRow = 0; upperRow < m; upperRow++) {
    const prefixCol = Array(n).fill(0);

    for (let row = upperRow; row < m; row++) {
      let sum = 0;
      let maxSubSum = Number.MIN_SAFE_INTEGER;

      for (let col = 0; col < n; col++) {
        prefixCol[col] += matrix[row][col];
        sum = Math.max(prefixCol[col], sum + prefixCol[col]);
        maxSubSum = Math.max(sum, maxSubSum);
      }
      if (maxSubSum === k) return maxSubSum;
      if (maxSubSum < k) {
        result = Math.max(maxSubSum, result);
        continue;
      }
      maxSubSum = Number.MIN_SAFE_INTEGER;

      for (let leftCol = 0; leftCol < n; leftCol++) {
        let sum = 0;

        for (let col = leftCol; col < n; col++) {
          sum += prefixCol[col];
          if (sum > k) continue;
          maxSubSum = Math.max(sum, maxSubSum);
        }
        result = Math.max(maxSubSum, result);
      }
      if (result === k) return result;
    }
  }
  return result;
};
```
