# [2013. Detect Squares](https://leetcode.com/problems/detect-squares)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a stream of points on the X-Y plane. Design an algorithm that:</p>

<ul>
	<li><strong>Adds</strong> new points from the stream into a data structure. <strong>Duplicate</strong> points are allowed and should be treated as different points.</li>
	<li>Given a query point, <strong>counts</strong> the number of ways to choose three points from the data structure such that the three points and the query point form an <strong>axis-aligned square</strong> with <strong>positive area</strong>.</li>
</ul>

<p>An <strong>axis-aligned square</strong> is a square whose edges are all the same length and are either parallel or perpendicular to the x-axis and y-axis.</p>

<p>Implement the <code>DetectSquares</code> class:</p>

<ul>
	<li><code>DetectSquares()</code> Initializes the object with an empty data structure.</li>
	<li><code>void add(int[] point)</code> Adds a new point <code>point = [x, y]</code> to the data structure.</li>
	<li><code>int count(int[] point)</code> Counts the number of ways to form <strong>axis-aligned squares</strong> with point <code>point = [x, y]</code> as described above.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/09/01/image.png" style="width: 869px; height: 504px;">
<pre><strong>Input</strong>
["DetectSquares", "add", "add", "add", "count", "count", "add", "count"]
[[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]]
<strong>Output</strong>
[null, null, null, null, 1, 0, null, 2]

<strong>Explanation</strong>
DetectSquares detectSquares = new DetectSquares();
detectSquares.add([3, 10]);
detectSquares.add([11, 2]);
detectSquares.add([3, 2]);
detectSquares.count([11, 10]); // return 1. You can choose:
                               //   - The first, second, and third points
detectSquares.count([14, 8]);  // return 0. The query point cannot form a square with any points in the data structure.
detectSquares.add([11, 2]);    // Adding duplicate points is allowed.
detectSquares.count([11, 10]); // return 2. You can choose:
                               //   - The first, second, and third points
                               //   - The first, third, and fourth points
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>point.length == 2</code></li>
	<li><code>0 &lt;= x, y &lt;= 1000</code></li>
	<li>At most <code>3000</code> calls <strong>in total</strong> will be made to <code>add</code> and <code>count</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js

var DetectSquares = function() {
    this.coordinateMap = new Map();
};

/** 
 * @param {number[]} point
 * @return {void}
 */
DetectSquares.prototype.add = function(point) {
    const [x, y] = point;
    const key = `${x},${y}`;
    const coordinate = this.coordinateMap.get(key) ?? { point, count: 0 };

    coordinate.count += 1;
    this.coordinateMap.set(key, coordinate);
};

/** 
 * @param {number[]} point
 * @return {number}
 */
DetectSquares.prototype.count = function(point) {
    const [px, py] = point;
    let result = 0;

    for (const { point: coordinate, count } of this.coordinateMap.values()) {
        const [x, y] = coordinate;

        if (px === x || py === y) continue;
        if (Math.abs(px - x) !== Math.abs(py - y)) continue;
        const a = this.coordinateMap.get(`${px},${y}`)?.count ?? 0;
        const b = this.coordinateMap.get(`${x},${py}`)?.count ?? 0;

        result += a * b * count;
    }
    return result;
};

/** 
 * Your DetectSquares object will be instantiated and called as such:
 * var obj = new DetectSquares()
 * obj.add(point)
 * var param_2 = obj.count(point)
 */
```
