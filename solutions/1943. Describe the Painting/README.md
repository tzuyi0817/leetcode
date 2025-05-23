# [1943. Describe the Painting](https://leetcode.com/problems/describe-the-painting)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a long and thin painting that can be represented by a number line. The painting was painted with multiple overlapping segments where each segment was painted with a <strong>unique</strong> color. You are given a 2D integer array <code>segments</code>, where <code>segments[i] = [start<sub>i</sub>, end<sub>i</sub>, color<sub>i</sub>]</code> represents the <strong>half-closed segment</strong> <code>[start<sub>i</sub>, end<sub>i</sub>)</code> with <code>color<sub>i</sub></code> as the color.</p>

<p>The colors in the overlapping segments of the painting were <strong>mixed</strong> when it was painted. When two or more colors mix, they form a new color that can be represented as a <strong>set</strong> of mixed colors.</p>

<ul>
	<li>For example, if colors <code>2</code>, <code>4</code>, and <code>6</code> are mixed, then the resulting mixed color is <code>{2,4,6}</code>.</li>
</ul>

<p>For the sake of simplicity, you should only output the <strong>sum</strong> of the elements in the set rather than the full set.</p>

<p>You want to <strong>describe</strong> the painting with the <strong>minimum</strong> number of non-overlapping <strong>half-closed segments</strong> of these mixed colors. These segments can be represented by the 2D array <code>painting</code> where <code>painting[j] = [left<sub>j</sub>, right<sub>j</sub>, mix<sub>j</sub>]</code> describes a <strong>half-closed segment</strong> <code>[left<sub>j</sub>, right<sub>j</sub>)</code> with the mixed color <strong>sum</strong> of <code>mix<sub>j</sub></code>.</p>

<ul>
	<li>For example, the painting created with <code>segments = [[1,4,5],[1,7,7]]</code> can be described by <code>painting = [[1,4,12],[4,7,7]]</code> because:
	<ul>
		<li><code>[1,4)</code> is colored <code>{5,7}</code> (with a sum of <code>12</code>) from both the first and second segments.</li>
		<li><code>[4,7)</code> is colored <code>{7}</code> from only the second segment.</li>
	</ul>
	</li>
</ul>

<p>Return <em>the 2D array </em><code>painting</code><em> describing the finished painting (excluding any parts that are <strong>not </strong>painted). You may return the segments in <strong>any order</strong></em>.</p>

<p>A <strong>half-closed segment</strong> <code>[a, b)</code> is the section of the number line between points <code>a</code> and <code>b</code> <strong>including</strong> point <code>a</code> and <strong>not including</strong> point <code>b</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/18/1.png" style="width: 529px; height: 241px;">
<pre><strong>Input:</strong> segments = [[1,4,5],[4,7,7],[1,7,9]]
<strong>Output:</strong> [[1,4,14],[4,7,16]]
<strong>Explanation: </strong>The painting can be described as follows:
- [1,4) is colored {5,9} (with a sum of 14) from the first and third segments.
- [4,7) is colored {7,9} (with a sum of 16) from the second and third segments.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/18/2.png" style="width: 532px; height: 219px;">
<pre><strong>Input:</strong> segments = [[1,7,9],[6,8,15],[8,10,7]]
<strong>Output:</strong> [[1,6,9],[6,7,24],[7,8,15],[8,10,7]]
<strong>Explanation: </strong>The painting can be described as follows:
- [1,6) is colored 9 from the first segment.
- [6,7) is colored {9,15} (with a sum of 24) from the first and second segments.
- [7,8) is colored 15 from the second segment.
- [8,10) is colored 7 from the third segment.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/04/c1.png" style="width: 529px; height: 289px;">
<pre><strong>Input:</strong> segments = [[1,4,5],[1,4,7],[4,7,1],[4,7,11]]
<strong>Output:</strong> [[1,4,12],[4,7,12]]
<strong>Explanation: </strong>The painting can be described as follows:
- [1,4) is colored {5,7} (with a sum of 12) from the first and second segments.
- [4,7) is colored {1,11} (with a sum of 12) from the third and fourth segments.
Note that returning a single segment [1,7) is incorrect because the mixed color sets are different.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= segments.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>segments[i].length == 3</code></li>
	<li><code>1 &lt;= start<sub>i</sub> &lt; end<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= color<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
	<li>Each <code>color<sub>i</sub></code> is distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} segments
 * @return {number[][]}
 */
const splitPainting = function (segments) {
  const paintMap = segments.reduce((map, [start, end, color]) => {
    map[start] = (map[start] ?? 0) + color;
    map[end] = (map[end] ?? 0) - color;

    return map;
  }, {});
  const paints = Object.keys(paintMap).sort((a, b) => a - b);
  let currentMix = 0;
  let left = 0;

  return paints.reduce((result, right) => {
    currentMix > 0 && result.push([+left, +right, currentMix]);
    left = right;
    currentMix += paintMap[right];
    return result;
  }, []);
};
```
