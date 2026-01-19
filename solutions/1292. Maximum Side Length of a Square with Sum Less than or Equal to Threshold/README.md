# [1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a <code>m x n</code> matrix <code>mat</code> and an integer <code>threshold</code>, return <em>the maximum side-length of a square with a sum less than or equal to </em><code>threshold</code><em> or return </em><code>0</code><em> if there is no such square</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/12/05/e1.png" style="width: 335px; height: 186px;">
<pre><strong>Input:</strong> mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
<strong>Output:</strong> 2
<strong>Explanation:</strong> The maximum side length of square with sum less than 4 is 2 as shown.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == mat.length</code></li>
	<li><code>n == mat[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 300</code></li>
	<li><code>0 &lt;= mat[i][j] &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= threshold &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Prefix Sum`**

- Time complexity: <em>O(mnlog\*Min(m,n))</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
const maxSideLength = function (mat, threshold) {
  const m = mat.length;
  const n = mat[0].length;
  const prefixSum = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  let left = 0;
  let right = Math.min(m, n);
  let result = 0;

  for (let row = 1; row <= m; row++) {
    for (let col = 1; col <= n; col++) {
      const value = mat[row - 1][col - 1];
      const preRowSum = prefixSum[row - 1][col];
      const preColSum = prefixSum[row][col - 1];
      const cornerSum = prefixSum[row - 1][col - 1];

      prefixSum[row][col] = preRowSum + preColSum + value - cornerSum;
    }
  }

  const isValidSideLength = len => {
    if (!len) return true;

    for (let row = len; row <= m; row++) {
      for (let col = len; col <= n; col++) {
        const preRowSum = prefixSum[row - len][col];
        const preColSum = prefixSum[row][col - len];
        const cornerSum = prefixSum[row - len][col - len];
        const sum = prefixSum[row][col] - preRowSum - preColSum + cornerSum;

        if (sum <= threshold) return true;
      }
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isValidSideLength(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};
```
