# [3225. Maximum Score From Grid Operations](https://leetcode.com/problems/maximum-score-from-grid-operations)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a 2D matrix <code>grid</code> of size <code>n x n</code>. Initially, all cells of the grid are colored white. In one operation, you can select any cell of indices <code>(i, j)</code>, and color black all the cells of the <code>j<sup>th</sup></code> column starting from the top row down to the <code>i<sup>th</sup></code> row.</p>

<p>The grid score is the sum of all <code>grid[i][j]</code> such that cell <code>(i, j)</code> is white and it has a horizontally adjacent black cell.</p>

<p>Return the <strong>maximum</strong> score that can be achieved after some number of operations.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[0,0,0,0,0],[0,0,3,0,0],[0,1,0,0,0],[5,0,0,3,0],[0,0,0,0,2]]</span></p>

<p><strong>Output:</strong> <span class="example-io">11</span></p>

<p><strong>Explanation:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/05/11/one.png" style="width: 300px; height: 200px;">
<p>In the first operation, we color all cells in column 1 down to row 3, and in the second operation, we color all cells in column 4 down to the last row. The score of the resulting grid is <code>grid[3][0] + grid[1][2] + grid[3][3]</code> which is equal to 11.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">grid = [[10,9,0,0,15],[7,1,0,8,0],[5,20,0,11,0],[0,0,0,1,2],[8,12,1,10,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">94</span></p>

<p><strong>Explanation:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2024/05/11/two-1.png" style="width: 300px; height: 200px;">
<p>We perform operations on 1, 2, and 3 down to rows 1, 4, and 0, respectively. The score of the resulting grid is <code>grid[0][0] + grid[1][0] + grid[2][1] + grid[4][1] + grid[1][3] + grid[2][3] + grid[3][3] + grid[4][3] + grid[0][4]</code> which is equal to 94.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;=&nbsp;n == grid.length &lt;= 100</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Dynamic Programming`**

- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
const maximumScore = function (grid) {
  const n = grid.length;
  const prefixSum = Array.from({ length: n }, () => {
    return new Array(n + 1).fill(0);
  });

  let prevHigh = Array.from({ length: n + 1 }, () => 0);
  let prevLow = Array.from({ length: n + 1 }, () => 0);

  for (let col = 0; col < n; col++) {
    for (let row = 1; row <= n; row++) {
      const value = grid[row - 1][col];

      prefixSum[col][row] = prefixSum[col][row - 1] + value;
    }
  }

  for (let col = 1; col < n; col++) {
    const currentHigh = new Array(n + 1).fill(0);
    const currentLow = new Array(n + 1).fill(0);

    for (let currH = 0; currH <= n; currH++) {
      for (let prevH = 0; prevH <= n; prevH++) {
        if (currH > prevH) {
          const score = prefixSum[col - 1][currH] - prefixSum[col - 1][prevH];
          const total = prevLow[prevH] + score;

          currentHigh[currH] = Math.max(currentHigh[currH], total);
          currentLow[currH] = Math.max(currentLow[currH], total);
        } else {
          const score = prefixSum[col][prevH] - prefixSum[col][currH];

          currentHigh[currH] = Math.max(currentHigh[currH], prevHigh[prevH] + score);
          currentLow[currH] = Math.max(currentLow[currH], prevHigh[prevH]);
        }
      }
    }

    prevHigh = currentHigh;
    prevLow = currentLow;
  }

  return Math.max(...prevHigh);
};
```
