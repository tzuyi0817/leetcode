# [850. Rectangle Area II](https://leetcode.com/problems/rectangle-area-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a 2D array of axis-aligned <code>rectangles</code>. Each <code>rectangle[i] = [x<sub>i1</sub>, y<sub>i1</sub>, x<sub>i2</sub>, y<sub>i2</sub>]</code> denotes the <code>i<sup>th</sup></code> rectangle where <code>(x<sub>i1</sub>, y<sub>i1</sub>)</code> are the coordinates of the <strong>bottom-left corner</strong>, and <code>(x<sub>i2</sub>, y<sub>i2</sub>)</code> are the coordinates of the <strong>top-right corner</strong>.</p>

<p>Calculate the <strong>total area</strong> covered by all <code>rectangles</code> in the plane. Any area covered by two or more rectangles should only be counted <strong>once</strong>.</p>

<p>Return <em>the <strong>total area</strong></em>. Since the answer may be too large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png" style="width: 600px; height: 450px;">
<pre><strong>Input:</strong> rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
<strong>Output:</strong> 6
<strong>Explanation:</strong> A total area of 6 is covered by all three rectangles, as illustrated in the picture.
From (1,1) to (2,2), the green and red rectangles overlap.
From (1,0) to (2,3), all three rectangles overlap.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> rectangles = [[0,0,1000000000,1000000000]]
<strong>Output:</strong> 49
<strong>Explanation:</strong> The answer is 10<sup>18</sup> modulo (10<sup>9</sup> + 7), which is 49.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= rectangles.length &lt;= 200</code></li>
	<li><code>rectanges[i].length == 4</code></li>
	<li><code>0 &lt;= x<sub>i1</sub>, y<sub>i1</sub>, x<sub>i2</sub>, y<sub>i2</sub> &lt;= 10<sup>9</sup></code></li>
	<li><code>x<sub>i1 &lt;= </sub>x<sub>i2</sub></code></li>
	<li><code>y<sub>i1 &lt;=</sub> y<sub>i2</sub></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Line Sweep`**
- Time complexity: <em>O(n<sup>2</sup>logn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} rectangles
 * @return {number}
 */
var rectangleArea = function(rectangles) {
    const MODULO = BigInt(10 ** 9 + 7);
    const events = [];
    
    for (const [x1, y1, x2, y2] of rectangles) {
        events.push({ x: x1, y1, y2, type: 'start' });
        events.push({ x: x2, y1, y2, type: 'end' });
    }
    events.sort((a, b) => a.x - b.x);

    const pairsY = [];
    let prevX = 0;
    let result = 0n;

    const getHeight = () => {
        let prevY = 0;
        let height = 0;

        for (const { y1, y2 } of pairsY) {
            prevY = Math.max(y1, prevY);
            if (prevY >= y2) continue;

            height += y2 - prevY;
            prevY = y2;
        }
        return height;
    };
    
    for (const { x, y1, y2, type } of events) {
        if (x > prevX) {
            const width = x - prevX;
            const height = getHeight();
            const area = (BigInt(width) * BigInt(height)) % MODULO;

            result = (result + area) % MODULO;
            prevX = x;
        }
        if (type === 'start') {
            pairsY.push({ y1, y2 });
            pairsY.sort((a, b) => a.y1 - b.y1);
            continue;
        }
        const index = pairsY.findIndex(pairs => pairs.y1 === y1 && pairs.y2 === y2);

        pairsY.splice(index, 1);
    }
    return result;
};
```
