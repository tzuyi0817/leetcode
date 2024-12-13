# [1284. Minimum Number of Flips to Convert Binary Matrix to Zero Matrix](https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a <code>m x n</code> binary matrix <code>mat</code>. In one step, you can choose one cell and flip it and all the four neighbors of it if they exist (Flip is changing <code>1</code> to <code>0</code> and <code>0</code> to <code>1</code>). A pair of cells are called neighbors if they share one edge.</p>

<p>Return the <em>minimum number of steps</em> required to convert <code>mat</code> to a zero matrix or <code>-1</code> if you cannot.</p>

<p>A <strong>binary matrix</strong> is a matrix with all cells equal to <code>0</code> or <code>1</code> only.</p>

<p>A <strong>zero matrix</strong> is a matrix with all cells equal to <code>0</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/11/28/matrix.png" style="width: 409px; height: 86px;">
<pre><strong>Input:</strong> mat = [[0,0],[0,1]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> One possible solution is to flip (1, 0) then (0, 1) and finally (1, 1) as shown.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> mat = [[0]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> Given matrix is a zero matrix. We do not need to change it.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> mat = [[1,0,0],[1,0,0]]
<strong>Output:</strong> -1
<strong>Explanation:</strong> Given matrix cannot be a zero matrix.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == mat.length</code></li>
	<li><code>n == mat[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 3</code></li>
	<li><code>mat[i][j]</code> is either <code>0</code> or <code>1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Bit Manipulation`**

- Time complexity: <em>O(2<sup>mn</sup>\*mn)</em>
- Space complexity: <em>O(2<sup>mn</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} mat
 * @return {number}
 */
const minFlips = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const visited = new Set();
  let originBitmask = 0;

  const getBitmask = (row, col) => 1 << (row * n + col);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = mat[row][col];

      if (!value) continue;
      originBitmask |= getBitmask(row, col);
    }
  }
  if (!originBitmask) return 0;
  let queue = [originBitmask];
  let result = 0;

  const flipMatrix = (row, col, bitmask) => {
    bitmask ^= getBitmask(row, col);

    if (row - 1 >= 0) bitmask ^= getBitmask(row - 1, col);
    if (row + 1 < m) bitmask ^= getBitmask(row + 1, col);
    if (col - 1 >= 0) bitmask ^= getBitmask(row, col - 1);
    if (col + 1 < n) bitmask ^= getBitmask(row, col + 1);

    return bitmask;
  };

  visited.add(originBitmask);

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const bitmask of queue) {
      for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
          const nextBitmask = flipMatrix(row, col, bitmask);

          if (!nextBitmask) return result;
          if (visited.has(nextBitmask)) continue;
          nextQueue.push(nextBitmask);
          visited.add(nextBitmask);
        }
      }
    }
    queue = nextQueue;
  }
  return -1;
};
```
