# [1240. Tiling a Rectangle with the Fewest Squares](https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a rectangle of size <code>n</code> x <code>m</code>, return <em>the minimum number of integer-sided squares that tile the rectangle</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/10/17/sample_11_1592.png" style="width: 154px; height: 106px;"></p>

<pre><strong>Input:</strong> n = 2, m = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> <code>3</code> squares are necessary to cover the rectangle.
<code>2</code> (squares of <code>1x1</code>)
<code>1</code> (square of <code>2x2</code>)</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/10/17/sample_22_1592.png" style="width: 224px; height: 126px;"></p>

<pre><strong>Input:</strong> n = 5, m = 8
<strong>Output:</strong> 5
</pre>

<p><strong class="example">Example 3:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/10/17/sample_33_1592.png" style="width: 224px; height: 189px;"></p>

<pre><strong>Input:</strong> n = 11, m = 13
<strong>Output:</strong> 6
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n, m &lt;= 13</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(mn\*2<sup>m</sup>)</em>
- Space complexity: <em>O(2<sup>m</sup>+m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
const tilingRectangle = function (n, m) {
  const memo = new Map();
  const heights = Array.from({ length: m }, () => 0);

  const getHeightsHash = () => {
    const BASE_HASH = 13;

    return heights.reduce((hash, height) => hash * BASE_HASH + height, 0);
  };

  const tilingRect = () => {
    const hash = getHeightsHash();

    if (memo.has(hash)) return memo.get(hash);
    const minHeight = Math.min(...heights);

    if (minHeight === n) return 0;
    const start = heights.indexOf(minHeight);
    let result = m * n;

    for (let length = 1; length <= Math.min(m - start, n - minHeight); length++) {
      if (heights.slice(start, start + length).some(height => height !== minHeight)) break;

      for (let index = start; index < start + length; index++) {
        heights[index] += length;
      }
      result = Math.min(tilingRect(), result);

      for (let index = start; index < start + length; index++) {
        heights[index] -= length;
      }
    }
    memo.set(hash, result + 1);
    return result + 1;
  };

  return tilingRect();
};
```
