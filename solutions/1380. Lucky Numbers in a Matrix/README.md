# [1380. Lucky Numbers in a Matrix](https://leetcode.com/problems/lucky-numbers-in-a-matrix)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an <code>m x n</code> matrix of <strong>distinct </strong>numbers, return <em>all <strong>lucky numbers</strong> in the matrix in <strong>any </strong>order</em>.</p>

<p>A <strong>lucky number</strong> is an element of the matrix such that it is the minimum element in its row and maximum in its column.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> matrix = [[3,7,8],[9,11,13],[15,16,17]]
<strong>Output:</strong> [15]
<strong>Explanation:</strong> 15 is the only lucky number since it is the minimum in its row and the maximum in its column.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
<strong>Output:</strong> [12]
<strong>Explanation:</strong> 12 is the only lucky number since it is the minimum in its row and the maximum in its column.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> matrix = [[7,8],[1,2]]
<strong>Output:</strong> [7]
<strong>Explanation:</strong> 7 is the only lucky number since it is the minimum in its row and the maximum in its column.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == mat.length</code></li>
	<li><code>n == mat[i].length</code></li>
	<li><code>1 &lt;= n, m &lt;= 50</code></li>
	<li><code>1 &lt;= matrix[i][j] &lt;= 10<sup>5</sup></code>.</li>
	<li>All elements in the matrix are distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Brute Force`**
- Time complexity: <em>O(Max(mn, m<sup>2</sup>))</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var luckyNumbers  = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    const findMinCol = (row) => {
        let col = 0;

        for (let index = 1; index < n; index++) {
            if (row[index] >= row[col]) continue;
            col = index;
        }
        return col;
    };

    const findMaxColValue = (col) => {
        let result = 0;

        for (let index = 0; index < m; index++) {
            result = Math.max(matrix[index][col], result);
        }
        return result;
    };

    for (let row = 0; row < m; row++) {
        const col = findMinCol(matrix[row]);
        const current = matrix[row][col];
        const maxValue = findMaxColValue(col);

        if (current === maxValue) return [current];
    }
    return [];
};
```
