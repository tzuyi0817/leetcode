# [1878. Get Biggest Three Rhombus Sums in a Grid](https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> integer matrix <code>grid</code>​​​.</p>

<p>A <strong>rhombus sum</strong> is the sum of the elements that form <strong>the</strong> <strong>border</strong> of a regular rhombus shape in <code>grid</code>​​​. The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell. Below is an image of four valid rhombus shapes with the corresponding colored cells that should be included in each <strong>rhombus sum</strong>:</p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-desc-2.png" style="width: 385px; height: 385px;">
<p>Note that the rhombus can have an area of 0, which is depicted by the purple rhombus in the bottom right corner.</p>

<p>Return <em>the biggest three <strong>distinct rhombus sums</strong> in the </em><code>grid</code><em> in <strong>descending order</strong></em><em>. If there are less than three distinct values, return all of them</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-ex1.png" style="width: 360px; height: 361px;">
<pre><strong>Input:</strong> grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
<strong>Output:</strong> [228,216,211]
<strong>Explanation:</strong> The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 20 + 3 + 200 + 5 = 228
- Red: 200 + 2 + 10 + 4 = 216
- Green: 5 + 200 + 4 + 2 = 211
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-ex2.png" style="width: 217px; height: 217px;">
<pre><strong>Input:</strong> grid = [[1,2,3],[4,5,6],[7,8,9]]
<strong>Output:</strong> [20,9,8]
<strong>Explanation:</strong> The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 4 + 2 + 6 + 8 = 20
- Red: 9 (area 0 rhombus in the bottom right corner)
- Green: 8 (area 0 rhombus in the bottom middle)
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> grid = [[7,7,7]]
<strong>Output:</strong> [7]
<strong>Explanation:</strong> All three possible rhombus sums are the same, so return [7].
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 50</code></li>
	<li><code>1 &lt;= grid[i][j] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Brute Force`**

- Time complexity: <em>O(mn∗boundary<sup>2</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
const getBiggestThree = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const updateValues = value => {
    if (first === value || second === value || third === value) return;
    if (first < value) {
      third = second;
      second = first;
      first = value;
    } else if (second < value) {
      third = second;
      second = value;
    } else if (third < value) third = value;
  };
  let first = 0;
  let second = 0;
  let third = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = grid[row][col];
      const boundary = Math.min(m - row - 1, n - col - 1, row, col);

      updateValues(value);
      if (boundary <= 0) continue;
      for (let length = 1; length <= boundary; length++) {
        let sum = (offset = 0);

        for (let current = length; current >= 1; current--) {
          sum +=
            grid[row - current][col + offset] +
            grid[row + offset][col + current] +
            grid[row + current][col - offset] +
            grid[row - offset][col - current];

          offset += 1;
        }
        updateValues(sum);
      }
    }
  }
  return [first, second, third].filter(Boolean);
};
```
