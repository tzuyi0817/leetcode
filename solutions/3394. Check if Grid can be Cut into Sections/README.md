# [3394. Check if Grid can be Cut into Sections](https://leetcode.com/problems/check-if-grid-can-be-cut-into-sections)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer <code>n</code> representing the dimensions of an <code>n x n</code> grid, with the origin at the bottom-left corner of the grid. You are also given a 2D array of coordinates <code>rectangles</code>, where <code>rectangles[i]</code> is in the form <code>[start<sub>x</sub>, start<sub>y</sub>, end<sub>x</sub>, end<sub>y</sub>]</code>, representing a rectangle on the grid. Each rectangle is defined as follows:</p>

<ul>
	<li><code>(start<sub>x</sub>, start<sub>y</sub>)</code>: The bottom-left corner of the rectangle.</li>
	<li><code>(end<sub>x</sub>, end<sub>y</sub>)</code>: The top-right corner of the rectangle.</li>
</ul>

<p><strong>Note </strong>that the rectangles do not overlap. Your task is to determine if it is possible to make <strong>either two horizontal or two vertical cuts</strong> on the grid such that:</p>

<ul>
	<li>Each of the three resulting sections formed by the cuts contains <strong>at least</strong> one rectangle.</li>
	<li>Every rectangle belongs to <strong>exactly</strong> one section.</li>
</ul>

<p>Return <code>true</code> if such cuts can be made; otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 5, rectangles = [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]]</span></p>

<p><strong>Output:</strong> <span class="example-io">true</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/10/23/tt1drawio.png" style="width: 285px; height: 280px;"></p>

<p>The grid is shown in the diagram. We can make horizontal cuts at <code>y = 2</code> and <code>y = 4</code>. Hence, output is true.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 4, rectangles = [[0,0,1,1],[2,0,3,4],[0,2,2,3],[3,0,4,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">true</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/10/23/tc2drawio.png" style="width: 240px; height: 240px;"></p>

<p>We can make vertical cuts at <code>x = 2</code> and <code>x = 3</code>. Hence, output is true.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 4, rectangles = [[0,2,2,4],[1,0,3,2],[2,2,3,4],[3,0,4,2],[3,2,4,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">false</span></p>

<p><strong>Explanation:</strong></p>

<p>We cannot make two horizontal or two vertical cuts that satisfy the conditions. Hence, output is false.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= n &lt;= 10<sup>9</sup></code></li>
	<li><code>3 &lt;= rectangles.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= rectangles[i][0] &lt; rectangles[i][2] &lt;= n</code></li>
	<li><code>0 &lt;= rectangles[i][1] &lt; rectangles[i][3] &lt;= n</code></li>
	<li>No two rectangles overlap.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sorting`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} rectangles
 * @return {boolean}
 */
const checkValidCuts = function (n, rectangles) {
  const checkCut = direction => {
    const index = direction === 'vertical' ? 0 : 1;
    let intervals = 0;
    let lastEnd = 0;

    rectangles.sort((a, b) => a[index] - b[index]);

    for (const rectangle of rectangles) {
      const start = rectangle[index];
      const end = rectangle[index + 2];

      if (start >= lastEnd) {
        intervals += 1;
        lastEnd = end;
      } else {
        lastEnd = Math.max(end, lastEnd);
      }

      if (intervals >= 3) return true;
    }

    return false;
  };

  return checkCut('vertical') || checkCut('horizontal');
};
```
