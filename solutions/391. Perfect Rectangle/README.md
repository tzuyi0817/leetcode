# [391. Perfect Rectangle](https://leetcode.com/problems/perfect-rectangle)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array <code>rectangles</code> where <code>rectangles[i] = [x<sub>i</sub>, y<sub>i</sub>, a<sub>i</sub>, b<sub>i</sub>]</code> represents an axis-aligned rectangle. The bottom-left point of the rectangle is <code>(x<sub>i</sub>, y<sub>i</sub>)</code> and the top-right point of it is <code>(a<sub>i</sub>, b<sub>i</sub>)</code>.</p>

<p>Return <code>true</code> <em>if all the rectangles together form an exact cover of a rectangular region</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perectrec1-plane.jpg" style="width: 300px; height: 294px;">
<pre><strong>Input:</strong> rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
<strong>Output:</strong> true
<strong>Explanation:</strong> All 5 rectangles together form an exact cover of a rectangular region.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perfectrec2-plane.jpg" style="width: 300px; height: 294px;">
<pre><strong>Input:</strong> rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
<strong>Output:</strong> false
<strong>Explanation:</strong> Because there is a gap between the two rectangular regions.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/perfecrrec4-plane.jpg" style="width: 300px; height: 294px;">
<pre><strong>Input:</strong> rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
<strong>Output:</strong> false
<strong>Explanation:</strong> Because two of the rectangles overlap with each other.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= rectangles.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>rectangles[i].length == 4</code></li>
	<li><code>-10<sup>5</sup> &lt;= x<sub>i</sub>, y<sub>i</sub>, a<sub>i</sub>, b<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
const isRectangleCover = function (rectangles) {
  const pointSet = new Set();
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  let area = 0;

  for (const [x1, y1, x2, y2] of rectangles) {
    const point1 = `${x1}_${y1}`;
    const point2 = `${x1}_${y2}`;
    const point3 = `${x2}_${y1}`;
    const point4 = `${x2}_${y2}`;

    minX = Math.min(x1, minX);
    minY = Math.min(y1, minY);
    maxX = Math.max(x2, maxX);
    maxY = Math.max(y2, maxY);
    area += (x2 - x1) * (y2 - y1);
    pointSet.has(point1) ? pointSet.delete(point1) : pointSet.add(point1);
    pointSet.has(point2) ? pointSet.delete(point2) : pointSet.add(point2);
    pointSet.has(point3) ? pointSet.delete(point3) : pointSet.add(point3);
    pointSet.has(point4) ? pointSet.delete(point4) : pointSet.add(point4);
  }
  if (pointSet.size !== 4) return false;
  if (!pointSet.has(`${minX}_${minY}`)) return false;
  if (!pointSet.has(`${minX}_${maxY}`)) return false;
  if (!pointSet.has(`${maxX}_${minY}`)) return false;
  if (!pointSet.has(`${maxX}_${maxY}`)) return false;

  return (maxX - minX) * (maxY - minY) === area;
};
```
