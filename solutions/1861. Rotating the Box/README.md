# [1861. Rotating the Box](https://leetcode.com/problems/rotating-the-box)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> matrix of characters <code>box</code> representing a side-view of a box. Each cell of the box is one of the following:</p>

<ul>
	<li>A stone <code>'#'</code></li>
	<li>A stationary obstacle <code>'*'</code></li>
	<li>Empty <code>'.'</code></li>
</ul>

<p>The box is rotated <strong>90 degrees clockwise</strong>, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity <strong>does not</strong> affect the obstacles' positions, and the inertia from the box's rotation <strong>does not </strong>affect the stones' horizontal positions.</p>

<p>It is <strong>guaranteed</strong> that each stone in <code>box</code> rests on an obstacle, another stone, or the bottom of the box.</p>

<p>Return <em>an </em><code>n x m</code><em> matrix representing the box after the rotation described above</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/04/08/rotatingtheboxleetcodewithstones.png" style="width: 300px; height: 150px;"></p>

<pre><strong>Input:</strong> box = [["#",".","#"]]
<strong>Output:</strong> [["."],
&nbsp;        ["#"],
&nbsp;        ["#"]]
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/04/08/rotatingtheboxleetcode2withstones.png" style="width: 375px; height: 195px;"></p>

<pre><strong>Input:</strong> box = [["#",".","*","."],
&nbsp;             ["#","#","*","."]]
<strong>Output:</strong> [["#","."],
&nbsp;        ["#","#"],
&nbsp;        ["*","*"],
&nbsp;        [".","."]]
</pre>

<p><strong class="example">Example 3:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/04/08/rotatingtheboxleetcode3withstone.png" style="width: 400px; height: 218px;"></p>

<pre><strong>Input:</strong> box = [["#","#","*",".","*","."],
&nbsp;             ["#","#","#","*",".","."],
&nbsp;             ["#","#","#",".","#","."]]
<strong>Output:</strong> [[".","#","#"],
&nbsp;        [".","#","#"],
&nbsp;        ["#","#","*"],
&nbsp;        ["#","*","."],
&nbsp;        ["#",".","*"],
&nbsp;        ["#",".","."]]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == box.length</code></li>
	<li><code>n == box[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 500</code></li>
	<li><code>box[i][j]</code> is either <code>'#'</code>, <code>'*'</code>, or <code>'.'</code>.</li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {character[][]} box
 * @return {character[][]}
 */
const rotateTheBox = function (box) {
  const m = box.length;
  const n = box[0].length;
  const result = Array(n)
    .fill('')
    .map(_ => Array(m).fill('.'));

  for (let row = 0; row < m; row++) {
    let fallRow = n - 1;

    for (let col = n - 1; col >= 0; col--) {
      const value = box[row][col];

      if (value === '.') continue;
      if (value === '*') fallRow = col;
      result[fallRow][m - row - 1] = value;
      fallRow -= 1;
    }
  }
  return result;
};
```
