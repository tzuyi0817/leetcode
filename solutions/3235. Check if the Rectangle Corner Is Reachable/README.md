# [3235. Check if the Rectangle Corner Is Reachable](https://leetcode.com/problems/check-if-the-rectangle-corner-is-reachable)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given two positive integers <code>xCorner</code> and <code>yCorner</code>, and a 2D array <code>circles</code>, where <code>circles[i] = [x<sub>i</sub>, y<sub>i</sub>, r<sub>i</sub>]</code> denotes a circle with center at <code>(x<sub>i</sub>, y<sub>i</sub>)</code> and radius <code>r<sub>i</sub></code>.</p>

<p>There is a rectangle in the coordinate plane with its bottom left corner at the origin and top right corner at the coordinate <code>(xCorner, yCorner)</code>. You need to check whether there is a path from the bottom left corner to the top right corner such that the <strong>entire path</strong> lies inside the rectangle, <strong>does not</strong> touch or lie inside <strong>any</strong> circle, and touches the rectangle <strong>only</strong> at the two corners.</p>

<p>Return <code>true</code> if such a path exists, and <code>false</code> otherwise.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">xCorner = 3, yCorner = 4, circles = [[2,1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">true</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/05/18/example2circle1.png" style="width: 346px; height: 264px;"></p>

<p>The black curve shows a possible path between <code>(0, 0)</code> and <code>(3, 4)</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">xCorner = 3, yCorner = 3, circles = [[1,1,2]]</span></p>

<p><strong>Output:</strong> <span class="example-io">false</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/05/18/example1circle.png" style="width: 346px; height: 264px;"></p>

<p>No path exists from <code>(0, 0)</code> to <code>(3, 3)</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">xCorner = 3, yCorner = 3, circles = [[2,1,1],[1,2,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">false</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/05/18/example0circle.png" style="width: 346px; height: 264px;"></p>

<p>No path exists from <code>(0, 0)</code> to <code>(3, 3)</code>.</p>
</div>

<p><strong class="example">Example 4:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">xCorner = 4, yCorner = 4, circles = [[5,5,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">true</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/08/04/rectangles.png" style="width: 346px; height: 264px;"></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= xCorner, yCorner &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= circles.length &lt;= 1000</code></li>
	<li><code>circles[i].length == 3</code></li>
	<li><code>1 &lt;= x<sub>i</sub>, y<sub>i</sub>, r<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find + Math`**

- Time complexity: <em>O(n<sup>2</sup>logn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} xCorner
 * @param {number} yCorner
 * @param {number[][]} circles
 * @return {boolean}
 */
const canReachCorner = function (xCorner, yCorner, circles) {
  const n = circles.length;
  const uf = new UnionFind(n + 2);
  const LEFT_TOP = n;
  const RIGHT_BOTTOM = n + 1;
  const X = BigInt(xCorner);
  const Y = BigInt(yCorner);

  for (let a = 0; a < n; a++) {
    const [x1, y1, r1] = circles[a].map(BigInt);

    const startInside = x1 * x1 + y1 * y1 <= r1 * r1;
    const dx = x1 - X;
    const dy = y1 - Y;
    const endInside = dx * dx + dy * dy <= r1 * r1;

    if (startInside || endInside) {
      return false;
    }

    const intersectsLeft = x1 <= r1 && y1 <= Y;
    const intersectsTop = (y1 - Y < 0n ? Y - y1 : y1 - Y) <= r1 && x1 <= X;
    const intersectsRight = (x1 - X < 0n ? X - x1 : x1 - X) <= r1 && y1 <= Y;
    const intersectsBottom = y1 <= r1 && x1 <= X;

    if (intersectsLeft || intersectsTop) {
      uf.union(a, LEFT_TOP);
    }

    if (intersectsRight || intersectsBottom) {
      uf.union(a, RIGHT_BOTTOM);
    }

    for (let b = 0; b < a; b++) {
      const [x2, y2, r2] = circles[b].map(BigInt);
      const dx = x1 - x2;
      const dy = y1 - y2;
      const dist2 = dx * dx + dy * dy;
      const radius = r1 + r2;

      if (dist2 > radius * radius) {
        continue;
      }

      const pxNumerator = x1 * r2 + x2 * r1;
      const pyNumerator = y1 * r2 + y2 * r1;

      if (pxNumerator < radius * X && pyNumerator < radius * Y) {
        uf.union(a, b);
      }
    }
  }

  return uf.find(LEFT_TOP) !== uf.find(RIGHT_BOTTOM);
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = new Array(n).fill(0);
  }

  find(x) {
    if (this.groups[x] === x) {
      return x;
    }

    this.groups[x] = this.find(this.groups[x]);

    return this.groups[x];
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) {
      return false;
    }

    if (this.ranks[groupX] > this.ranks[groupY]) {
      this.groups[groupY] = groupX;
    } else if (this.ranks[groupX] < this.ranks[groupY]) {
      this.groups[groupX] = groupY;
    } else {
      this.groups[groupY] = groupX;
      this.ranks[groupX] += 1;
    }

    return true;
  }
}
```
