# [3025. Find the Number of Ways to Place People I](https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a 2D array <code>points</code> of size <code>n x 2</code> representing integer coordinates of some points on a 2D plane, where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>.</p>

<p>Count the number of pairs of points <code>(A, B)</code>, where</p>

<ul>
	<li><code>A</code> is on the <strong>upper left</strong> side of <code>B</code>, and</li>
	<li>there are no other points in the rectangle (or line) they make (<strong>including the border</strong>).</li>
</ul>

<p>Return the count.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">points = [[1,1],[2,2],[3,3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2024/01/04/example1alicebob.png" style="width: 427px; height: 350px;"></p>

<p>There is no way to choose <code>A</code> and <code>B</code> so <code>A</code> is on the upper left side of <code>B</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">points = [[6,2],[4,4],[2,6]]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p><img height="365" width="1321" src="https://assets.leetcode.com/uploads/2024/06/25/t2.jpg"></p>

<ul>
	<li>The left one is the pair <code>(points[1], points[0])</code>, where <code>points[1]</code> is on the upper left side of <code>points[0]</code> and the rectangle is empty.</li>
	<li>The middle one is the pair <code>(points[2], points[1])</code>, same as the left one it is a valid pair.</li>
	<li>The right one is the pair <code>(points[2], points[0])</code>, where <code>points[2]</code> is on the upper left side of <code>points[0]</code>, but <code>points[1]</code> is inside the rectangle so it's not a valid pair.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">points = [[3,1],[1,3],[1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2024/06/25/t3.jpg" style="width: 1269px; height: 350px;"></p>

<ul>
	<li>The left one is the pair <code>(points[2], points[0])</code>, where <code>points[2]</code> is on the upper left side of <code>points[0]</code> and there are no other points on the line they form. Note that it is a valid state when the two points form a line.</li>
	<li>The middle one is the pair <code>(points[1], points[2])</code>, it is a valid pair same as the left one.</li>
	<li>The right one is the pair <code>(points[1], points[0])</code>, it is not a valid pair as <code>points[2]</code> is on the border of the rectangle.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 50</code></li>
	<li><code>points[i].length == 2</code></li>
	<li><code>0 &lt;= points[i][0], points[i][1] &lt;= 50</code></li>
	<li>All <code>points[i]</code> are distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
const numberOfPairs = function (points) {
  const n = points.length;
  let result = 0;

  points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  for (let a = 0; a < n - 1; a++) {
    const y1 = points[a][1];
    let maxY = Number.MIN_SAFE_INTEGER;

    for (let b = a + 1; b < n; b++) {
      const y2 = points[b][1];

      if (y1 < y2 || y2 <= maxY) continue;

      result += 1;
      maxY = y2;
    }
  }

  return result;
};
```
