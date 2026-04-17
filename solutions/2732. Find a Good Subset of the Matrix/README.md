# [2732. Find a Good Subset of the Matrix](https://leetcode.com/problems/find-a-good-subset-of-the-matrix)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> <code>m x n</code> binary matrix <code>grid</code>.</p>

<p>Let us call a <strong>non-empty</strong> subset of rows <strong>good</strong> if the sum of each column of the subset is at most half of the length of the subset.</p>

<p>More formally, if the length of the chosen subset of rows is <code>k</code>, then the sum of each column should be at most <code>floor(k / 2)</code>.</p>

<p>Return <em>an integer array that contains row indices of a good subset sorted in <strong>ascending</strong> order.</em></p>

<p>If there are multiple good subsets, you can return any of them. If there are no good subsets, return an empty array.</p>

<p>A <strong>subset</strong> of rows of the matrix <code>grid</code> is any matrix that can be obtained by deleting some (possibly none or all) rows from <code>grid</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> grid = [[0,1,1,0],[0,0,0,1],[1,1,1,1]]
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> We can choose the 0<sup>th</sup> and 1<sup>st</sup> rows to create a good subset of rows.
The length of the chosen subset is 2.
- The sum of the 0<sup>th</sup>&nbsp;column is 0 + 0 = 0, which is at most half of the length of the subset.
- The sum of the 1<sup>st</sup>&nbsp;column is 1 + 0 = 1, which is at most half of the length of the subset.
- The sum of the 2<sup>nd</sup>&nbsp;column is 1 + 0 = 1, which is at most half of the length of the subset.
- The sum of the 3<sup>rd</sup>&nbsp;column is 0 + 1 = 1, which is at most half of the length of the subset.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> grid = [[0]]
<strong>Output:</strong> [0]
<strong>Explanation:</strong> We can choose the 0<sup>th</sup> row to create a good subset of rows.
The length of the chosen subset is 1.
- The sum of the 0<sup>th</sup>&nbsp;column is 0, which is at most half of the length of the subset.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> grid = [[1,1,1],[1,1,1]]
<strong>Output:</strong> []
<strong>Explanation:</strong> It is impossible to choose any subset of rows to create a good subset.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= n &lt;= 5</code></li>
	<li><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Bit Manipulation`**

- Time complexity: <em>O(m\*2<sup>n</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
const goodSubsetofBinaryMatrix = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const maskMap = new Map();
  const MAX_MASK = (1 << n) - 1;

  const getRowMask = row => {
    let mask = 0;

    for (let col = 0; col < n; col++) {
      if (!grid[row][col]) continue;

      mask |= 1 << col;
    }

    return mask;
  };

  for (let row = 0; row < m; row++) {
    const rowMask = getRowMask(row);

    if (rowMask === 0) return [row];

    for (let mask = 0; mask <= MAX_MASK; mask++) {
      if ((rowMask & mask) === 0 && maskMap.has(mask)) {
        const prevRow = maskMap.get(mask);

        return [prevRow, row];
      }
    }

    maskMap.set(rowMask, row);
  }

  return [];
};
```
