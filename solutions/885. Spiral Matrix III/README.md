# [885. Spiral Matrix III](https://leetcode.com/problems/spiral-matrix-iii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You start at the cell <code>(rStart, cStart)</code> of an <code>rows x cols</code> grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.</p>

<p>You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all <code>rows * cols</code> spaces of the grid.</p>

<p>Return <em>an array of coordinates representing the positions of the grid in the order you visited them</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/24/example_1.png" style="width: 174px; height: 99px;">
<pre><strong>Input:</strong> rows = 1, cols = 4, rStart = 0, cStart = 0
<strong>Output:</strong> [[0,0],[0,1],[0,2],[0,3]]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/24/example_2.png" style="width: 202px; height: 142px;">
<pre><strong>Input:</strong> rows = 5, cols = 6, rStart = 1, cStart = 4
<strong>Output:</strong> [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= rows, cols &lt;= 100</code></li>
	<li><code>0 &lt;= rStart &lt; rows</code></li>
	<li><code>0 &lt;= cStart &lt; cols</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**
- Time complexity: <em>O(Max(rows, cols)<sup>2</sup>)</em>
- Space complexity: <em>O(rows * cols)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function(rows, cols, rStart, cStart) {
    const result = [[rStart, cStart]];
    let row = rStart;
    let col = cStart;
    let currentRows = 1;
    let currentCols = 1;
    let rounds = 0;

    while (result.length < rows * cols) {
        const step = rounds < 2 ? 1 : -1;
        const isRow = rounds % 2;
        const distance = isRow ? currentRows : currentCols;

        for (let index = 0; index < distance; index++) {
            isRow ? row += step : col += step;
            if (row >= rows || row < 0 || col >= cols || col < 0) continue;
            result.push([row, col]);
        }
        isRow ? currentRows += 1 : currentCols += 1;
        rounds = (rounds + 1) % 4;
    }
    return result;
};
```
