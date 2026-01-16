# [2975. Maximum Square Area by Removing Fences From a Field](https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a large <code>(m - 1) x (n - 1)</code> rectangular field with corners at <code>(1, 1)</code> and <code>(m, n)</code> containing some horizontal and vertical fences given in arrays <code>hFences</code> and <code>vFences</code> respectively.</p>

<p>Horizontal fences are from the coordinates <code>(hFences[i], 1)</code> to <code>(hFences[i], n)</code> and vertical fences are from the coordinates <code>(1, vFences[i])</code> to <code>(m, vFences[i])</code>.</p>

<p>Return <em>the <strong>maximum</strong> area of a <strong>square</strong> field that can be formed by <strong>removing</strong> some fences (<strong>possibly none</strong>) or </em><code>-1</code> <em>if it is impossible to make a square field</em>.</p>

<p>Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9 </sup>+ 7</code>.</p>

<p><strong>Note: </strong>The field is surrounded by two horizontal fences from the coordinates <code>(1, 1)</code> to <code>(1, n)</code> and <code>(m, 1)</code> to <code>(m, n)</code> and two vertical fences from the coordinates <code>(1, 1)</code> to <code>(m, 1)</code> and <code>(1, n)</code> to <code>(m, n)</code>. These fences <strong>cannot</strong> be removed.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/11/05/screenshot-from-2023-11-05-22-40-25.png"></p>

<pre><strong>Input:</strong> m = 4, n = 3, hFences = [2,3], vFences = [2]
<strong>Output:</strong> 4
<strong>Explanation:</strong> Removing the horizontal fence at 2 and the vertical fence at 2 will give a square field of area 4.
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/11/22/maxsquareareaexample1.png" style="width: 285px; height: 242px;"></p>

<pre><strong>Input:</strong> m = 6, n = 7, hFences = [2], vFences = [4]
<strong>Output:</strong> -1
<strong>Explanation:</strong> It can be proved that there is no way to create a square field by removing fences.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= m, n &lt;= 10<sup>9</sup></code></li>
	<li><code><font face="monospace">1 &lt;= hF</font>ences<font face="monospace">.length, vFences.length &lt;= 600</font></code></li>
	<li><code><font face="monospace">1 &lt; hFences[i] &lt; m</font></code></li>
	<li><code><font face="monospace">1 &lt; vFences[i] &lt; n</font></code></li>
	<li><code><font face="monospace">hFences</font></code><font face="monospace"> and </font><code><font face="monospace">vFences</font></code><font face="monospace"> are unique.</font></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(h<sup>2</sup>+v<sup>2</sup>)</em>
  - h = hFences.length
  - v = vFences.length
- Space complexity: <em>O(h<sup>2</sup>+v<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
const maximizeSquareArea = function (m, n, hFences, vFences) {
  hFences.sort((a, b) => a - b);
  vFences.sort((a, b) => a - b);

  const MODULO = BigInt(10 ** 9 + 7);
  const rowFences = [1, ...hFences, m];
  const colFences = [1, ...vFences, n];
  const rowWidthSet = new Set();
  let maxWidth = 0;

  for (let a = 0; a < rowFences.length; a++) {
    for (let b = a + 1; b < rowFences.length; b++) {
      const width = rowFences[b] - rowFences[a];

      rowWidthSet.add(width);
    }
  }

  for (let a = 0; a < colFences.length; a++) {
    for (let b = a + 1; b < colFences.length; b++) {
      const width = colFences[b] - colFences[a];

      if (rowWidthSet.has(width)) {
        maxWidth = Math.max(width, maxWidth);
      }
    }
  }

  if (maxWidth === 0) return -1;

  const area = BigInt(maxWidth) ** 2n;

  return Number(area % MODULO);
};
```
