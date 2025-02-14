# [1453. Maximum Number of Darts Inside of a Circular Dartboard](https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard)

## Description

<div class="elfjS" data-track-load="description_content"><p>Alice is throwing <code>n</code> darts on a very large wall. You are given an array <code>darts</code> where <code>darts[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> is the position of the <code>i<sup>th</sup></code> dart that Alice threw on the wall.</p>

<p>Bob knows the positions of the <code>n</code> darts on the wall. He wants to place a dartboard of radius <code>r</code> on the wall so that the maximum number of darts that Alice throws lie&nbsp;on the dartboard.</p>

<p>Given the integer <code>r</code>, return <em>the maximum number of darts that can lie on the dartboard</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/04/29/sample_1_1806.png" style="width: 248px; height: 211px;">
<pre><strong>Input:</strong> darts = [[-2,0],[2,0],[0,2],[0,-2]], r = 2
<strong>Output:</strong> 4
<strong>Explanation:</strong> Circle dartboard with center in (0,0) and radius = 2 contain all points.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/04/29/sample_2_1806.png" style="width: 306px; height: 244px;">
<pre><strong>Input:</strong> darts = [[-3,0],[3,0],[2,6],[5,4],[0,9],[7,8]], r = 5
<strong>Output:</strong> 5
<strong>Explanation:</strong> Circle dartboard with center in (0,4) and radius = 5 contain all points except the point (7,8).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= darts.length &lt;= 100</code></li>
	<li><code>darts[i].length == 2</code></li>
	<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
	<li>All the <code>darts</code>&nbsp;are unique</li>
	<li><code>1 &lt;= r &lt;= 5000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} darts
 * @param {number} r
 * @return {number}
 */
const numPoints = function (darts, r) {
  const getDistance = (x1, x2, y1, y2) => {
    return Math.hypot((x1 - x2), (y1 - y2));
  };

  const getCircularCenters = (x1, x2, y1, y2) => {
    const distance = getDistance(x1, x2, y1, y2);

    if (distance > r * 2) return [];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const h = Math.sqrt(r ** 2 - (distance / 2) ** 2);
    const dx = (x2 - x1) / distance;
    const dy = (y2 - y1) / distance;
    const center1 = { cx: mx - h * dy, cy: my + h * dx };
    const center2 = { cx: mx + h * dy, cy: my - h * dx };

    return [center1, center2];
  };

  const n = darts.length;
  let result = 1;

  for (let a = 0; a < n - 1; a++) {
    const [x1, y1] = darts[a];

    for (let b = a + 1; b < n; b++) {
      const [x2, y2] = darts[b];
      const centers = getCircularCenters(x1, x2, y1, y2);

      for (const { cx, cy } of centers) {
        let points = 0;

        for (const [x, y] of darts) {
          const distance = getDistance(x, cx, y, cy);

          points += distance <= r ? 1 : 0;
        }

        result = Math.max(points, result);
      }
    }
  }

  return result;
};
```
