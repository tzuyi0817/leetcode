# [3625. Count Number of Trapezoids II](https://leetcode.com/problems/count-number-of-trapezoids-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p data-end="189" data-start="146">You are given a 2D integer array <code>points</code> where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents the coordinates of the <code>i<sup>th</sup></code> point on the Cartesian plane.</p>

<p data-end="189" data-start="146">Return <em data-end="330" data-start="297">the number of unique </em><em>trapezoids</em> that can be formed by choosing any four distinct points from <code>points</code>.</p>

<p data-end="579" data-start="405">A<b> </b><strong>trapezoid</strong> is a convex quadrilateral with <strong data-end="496" data-start="475">at least one pair</strong> of parallel sides. Two lines are parallel if and only if they have the same slope.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">points = [[-3,2],[3,0],[2,3],[3,2],[2,-3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2025/04/29/desmos-graph-4.png" style="width: 250px; height: 250px;"> <img alt="" src="https://assets.leetcode.com/uploads/2025/04/29/desmos-graph-3.png" style="width: 250px; height: 250px;"></p>

<p>There are two distinct ways to pick four points that form a trapezoid:</p>

<ul>
	<li>The points <code>[-3,2], [2,3], [3,2], [2,-3]</code> form one trapezoid.</li>
	<li>The points <code>[2,3], [3,2], [3,0], [2,-3]</code> form another trapezoid.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">points = [[0,0],[1,0],[0,1],[2,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2025/04/29/desmos-graph-5.png" style="width: 250px; height: 250px;"></p>

<p>There is only one trapezoid which can be formed.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>4 &lt;= points.length &lt;= 500</code></li>
	<li><code>–1000 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 1000</code></li>
	<li>All points are pairwise distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map + Math`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
const countTrapezoids = function (points) {
  const n = points.length;
  const slopeMap = new Map();
  const vectorMap = new Map();

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const addSide = (map, key, constant) => {
    if (!map.has(key)) {
      map.set(key, new Map());
    }

    const sideMap = map.get(key);
    const count = sideMap.get(constant) ?? 0;

    sideMap.set(constant, count + 1);
  };

  const countTrapezoid = map => {
    let result = 0;

    for (const sideMap of map.values()) {
      let sides = 0;

      for (const count of sideMap.values()) {
        result = result + sides * count;
        sides += count;
      }
    }

    return result;
  };

  for (let a = 0; a < n; a++) {
    const [x1, y1] = points[a];

    for (let b = a + 1; b < n; b++) {
      const [x2, y2] = points[b];
      let dx = x1 - x2;
      let dy = y1 - y2;

      if (dx < 0 || (dx === 0 && dy < 0)) {
        dx = -dx;
        dy = -dy;
      }

      const g = gcd(dx, Math.abs(dy));
      const sx = dx / g;
      const sy = dy / g;
      const constant = sx * y1 - sy * x1;
      const slopeKey = (sx << 12) | (sy + 2000);
      const vectorKey = (dx << 12) | (dy + 2000);

      addSide(slopeMap, slopeKey, constant);
      addSide(vectorMap, vectorKey, constant);
    }
  }

  return countTrapezoid(slopeMap) - countTrapezoid(vectorMap) / 2;
};
```
