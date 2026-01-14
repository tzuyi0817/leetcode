# [3454. Separate Squares II](https://leetcode.com/problems/separate-squares-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a 2D integer array <code>squares</code>. Each <code>squares[i] = [x<sub>i</sub>, y<sub>i</sub>, l<sub>i</sub>]</code> represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.</p>

<p>Find the <strong>minimum</strong> y-coordinate value of a horizontal line such that the total area covered by squares above the line <em>equals</em> the total area covered by squares below the line.</p>

<p>Answers within <code>10<sup>-5</sup></code> of the actual answer will be accepted.</p>

<p><strong>Note</strong>: Squares <strong>may</strong> overlap. Overlapping areas should be counted <strong>only once</strong> in this version.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">squares = [[0,0,1],[2,2,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">1.00000</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2025/01/15/4065example1drawio.png" style="width: 269px; height: 203px;"></p>

<p>Any horizontal line between <code>y = 1</code> and <code>y = 2</code> results in an equal split, with 1 square unit above and 1 square unit below. The minimum y-value is 1.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">squares = [[0,0,2],[1,1,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">1.00000</span></p>

<p><strong>Explanation:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2025/01/15/4065example2drawio.png" style="width: 269px; height: 203px;"></p>

<p>Since the blue square overlaps with the red square, it will not be counted again. Thus, the line <code>y = 1</code> splits the squares into two equal parts.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= squares.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>squares[i] = [x<sub>i</sub>, y<sub>i</sub>, l<sub>i</sub>]</code></li>
	<li><code>squares[i].length == 3</code></li>
	<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= l<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
	<li>The total area of all the squares will not exceed <code>10<sup>15</sup></code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Line Sweep + Segment Tree`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} squares
 * @return {number}
 */
const separateSquares = function (squares) {
  const events = [];
  const xSet = new Set();

  for (const [xl, y, l] of squares) {
    const xr = xl + l;

    events.push({ y, delta: 1, xl, xr }, { y: y + l, delta: -1, xl, xr });
    xSet.add(xl);
    xSet.add(xr);
  }

  events.sort((a, b) => a.y - b.y);

  const xs = [...xSet].toSorted((a, b) => a - b);
  const halfArea = getTotalArea(events, xs) / 2;
  const tree = new SegmentTree(xs);
  let prevY = 0;
  let area = 0;

  for (const { y, xl, xr, delta } of events) {
    const coveredWidth = tree.getCoveredWidth();
    const currentArea = (y - prevY) * coveredWidth;

    if (area + currentArea >= halfArea) {
      const rest = halfArea - area;

      return prevY + rest / coveredWidth;
    }

    tree.add(xl, xr, delta);
    prevY = y;
    area += currentArea;
  }

  return -1;
};

function getTotalArea(events, xs) {
  const tree = new SegmentTree(xs);
  let prevY = 0;
  let area = 0;

  for (const { y, xl, xr, delta } of events) {
    area += (y - prevY) * tree.getCoveredWidth();
    tree.add(xl, xr, delta);
    prevY = y;
  }

  return area;
}

class SegmentTree {
  constructor(xs) {
    this.xs = xs;
    this.n = xs.length - 1;
    this.coveredCount = new Array(this.n * 4).fill(0);
    this.coveredWidth = new Array(this.n * 4).fill(0);
  }

  add(xl, xr, delta) {
    this.#add(0, 0, this.n - 1, xl, xr, delta);
  }

  #add(index, low, high, xl, xr, delta) {
    if (this.xs[low] >= xr || this.xs[high + 1] <= xl) return;

    if (this.xs[low] >= xl && this.xs[high + 1] <= xr) {
      this.coveredCount[index] += delta;
    } else {
      const mid = Math.floor((low + high) / 2);

      this.#add(index * 2 + 1, low, mid, xl, xr, delta);
      this.#add(index * 2 + 2, mid + 1, high, xl, xr, delta);
    }

    if (this.coveredCount[index] > 0) {
      this.coveredWidth[index] = this.xs[high + 1] - this.xs[low];
    } else if (low === high) {
      this.coveredWidth[index] = 0;
    } else {
      this.coveredWidth[index] = this.coveredWidth[index * 2 + 1] + this.coveredWidth[index * 2 + 2];
    }
  }

  getCoveredWidth() {
    return this.coveredWidth[0];
  }
}
```
