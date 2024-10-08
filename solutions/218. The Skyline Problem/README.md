# [218. The Skyline Problem](https://leetcode.com/problems/the-skyline-problem)

## Description

<div class="elfjS" data-track-load="description_content"><p>A city's <strong>skyline</strong> is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return <em>the <strong>skyline</strong> formed by these buildings collectively</em>.</p>

<p>The geometric information of each building is given in the array <code>buildings</code> where <code>buildings[i] = [left<sub>i</sub>, right<sub>i</sub>, height<sub>i</sub>]</code>:</p>

<ul>
	<li><code>left<sub>i</sub></code> is the x coordinate of the left edge of the <code>i<sup>th</sup></code> building.</li>
	<li><code>right<sub>i</sub></code> is the x coordinate of the right edge of the <code>i<sup>th</sup></code> building.</li>
	<li><code>height<sub>i</sub></code> is the height of the <code>i<sup>th</sup></code> building.</li>
</ul>

<p>You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height <code>0</code>.</p>

<p>The <strong>skyline</strong> should be represented as a list of "key points" <strong>sorted by their x-coordinate</strong> in the form <code>[[x<sub>1</sub>,y<sub>1</sub>],[x<sub>2</sub>,y<sub>2</sub>],...]</code>. Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, which always has a y-coordinate <code>0</code> and is used to mark the skyline's termination where the rightmost building ends. Any ground between the leftmost and rightmost buildings should be part of the skyline's contour.</p>

<p><b>Note:</b> There must be no consecutive horizontal lines of equal height in the output skyline. For instance, <code>[...,[2 3],[4 5],[7 5],[11 5],[12 7],...]</code> is not acceptable; the three lines of height 5 should be merged into one in the final output as such: <code>[...,[2 3],[4 5],[12 7],...]</code></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/merged.jpg" style="width: 800px; height: 331px;">
<pre><strong>Input:</strong> buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
<strong>Output:</strong> [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
<strong>Explanation:</strong>
Figure A shows the buildings of the input.
Figure B shows the skyline formed by those buildings. The red points in figure B represent the key points in the output list.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> buildings = [[0,2,3],[2,5,3]]
<strong>Output:</strong> [[0,3],[5,0]]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= buildings.length &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= left<sub>i</sub> &lt; right<sub>i</sub> &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>1 &lt;= height<sub>i</sub> &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>buildings</code> is sorted by <code>left<sub>i</sub></code> in&nbsp;non-decreasing order.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
const getSkyline = function (buildings) {
  const result = [];
  const heights = [0];
  const builds = buildings.reduce((result, [left, right, height]) => {
    result.push({ point: left, height }, { point: right, height: -height });
    return result;
  }, []);
  let previousHeight = -1;

  builds.sort((a, b) => a.point - b.point || b.height - a.height);

  const findHeight = height => {
    let left = 0;
    let right = heights.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      heights[mid] >= height ? (right = mid - 1) : (left = mid + 1);
    }
    return left;
  };

  for (const { point, height } of builds) {
    const index = findHeight(Math.abs(height));

    height > 0 ? heights.splice(index, 0, height) : heights.splice(index, 1);

    const currentHeight = heights.at(-1);

    if (previousHeight === currentHeight) continue;
    result.push([point, currentHeight]);
    previousHeight = currentHeight;
  }
  return result;
};
```
