# [149. Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of <code>points</code> where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents a point on the <strong>X-Y</strong> plane, return <em>the maximum number of points that lie on the same straight line</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg" style="width: 300px; height: 294px;">
<pre><strong>Input:</strong> points = [[1,1],[2,2],[3,3]]
<strong>Output:</strong> 3
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg" style="width: 300px; height: 294px;">
<pre><strong>Input:</strong> points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
<strong>Output:</strong> 4
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= points.length &lt;= 300</code></li>
	<li><code>points[i].length == 2</code></li>
	<li><code>-10<sup>4</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
	<li>All the <code>points</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math + Hash Table`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
const maxPoints = function (points) {
  const n = points.length;
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const getSlope = (x1, y1, x2, y2) => {
    if (x1 === x2) return `0,${y1}`;
    if (y1 === y2) return `${x1},0`;
    const dx = x1 - x2;
    const dy = y1 - y2;
    const d = gcd(dx, dy);

    return `${dx / d},${dy / d}`;
  };
  let result = 0;

  for (let a = 0; a < n; a++) {
    const [x1, y1] = points[a];
    const straightMap = new Map();
    let samePoint = 1;
    let sameStraight = 0;

    for (let b = a + 1; b < n; b++) {
      const [x2, y2] = points[b];

      if (x1 === x2 && y1 === y2) {
        samePoint += 1;
        continue;
      }
      const slope = getSlope(x1, y1, x2, y2);
      const count = straightMap.get(slope) ?? 0;

      straightMap.set(slope, count + 1);
      sameStraight = Math.max(count + 1, sameStraight);
    }
    result = Math.max(samePoint + sameStraight, result);
  }
  return result;
};
```
