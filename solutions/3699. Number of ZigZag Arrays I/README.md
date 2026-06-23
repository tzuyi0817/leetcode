# [3699. Number of ZigZag Arrays I](https://leetcode.com/problems/number-of-zigzag-arrays-i)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given three integers <code>n</code>, <code>l</code>, and <code>r</code>.</p>

<p>A <strong>ZigZag</strong> array of length <code>n</code> is defined as follows:</p>

<ul>
	<li>Each element lies in the range <code>[l, r]</code>.</li>
	<li>No <strong>two</strong> adjacent elements are equal.</li>
	<li>No <strong>three</strong> consecutive elements form a <strong>strictly increasing</strong> or <strong>strictly decreasing</strong> sequence.</li>
</ul>

<p>Return the total number of valid <strong>ZigZag</strong> arrays.</p>

<p>Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>A <strong>sequence</strong> is said to be <strong>strictly increasing</strong> if each element is strictly greater than its previous one (if exists).</p>

<p>A <strong>sequence</strong> is said to be <strong>strictly decreasing</strong> if each element is strictly smaller than its previous one (if exists).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 3, l = 4, r = 5</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>There are only 2 valid ZigZag arrays of length <code>n = 3</code> using values in the range <code>[4, 5]</code>:</p>

<ul>
	<li><code>[4, 5, 4]</code></li>
	<li><code>[5, 4, 5]</code>​​​​​​​</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">n = 3, l = 1, r = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">10</span></p>

<p><strong>Explanation:</strong></p>

<p>There are 10 valid ZigZag arrays of length <code>n = 3</code> using values in the range <code>[1, 3]</code>:</p>

<ul>
	<li><code>[1, 2, 1]</code>, <code>[1, 3, 1]</code>, <code>[1, 3, 2]</code></li>
	<li><code>[2, 1, 2]</code>, <code>[2, 1, 3]</code>, <code>[2, 3, 1]</code>, <code>[2, 3, 2]</code></li>
	<li><code>[3, 1, 2]</code>, <code>[3, 1, 3]</code>, <code>[3, 2, 3]</code></li>
</ul>

<p>All arrays meet the ZigZag conditions.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= n &lt;= 2000</code></li>
	<li><code>1 &lt;= l &lt; r &lt;= 2000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Prefix Sum`**

- Time complexity: <em>O(nr)</em>
- Space complexity: <em>O(r)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
const zigZagArrays = function (n, l, r) {
  const MODULO = 10 ** 9 + 7;
  const incDp = Array.from({ length: r + 1 }, () => 0);
  const decDp = Array.from({ length: r + 1 }, () => 0);
  const incSum = Array.from({ length: r + 1 }, () => 0);
  const decSum = Array.from({ length: r + 1 }, () => 0);

  for (let index = l; index <= r; index++) {
    const len = index - l + 1;

    incDp[index] = 1;
    decDp[index] = 1;
    incSum[index] = len;
    decSum[index] = len;
  }

  let len = 1;

  while (len < n) {
    for (let index = l; index <= r; index++) {
      incDp[index] = (decSum[r] - decSum[index] + MODULO) % MODULO;
      decDp[index] = incSum[index - 1];
    }

    incSum[l] = incDp[l];
    decSum[l] = decDp[l];

    for (let index = l + 1; index <= r; index++) {
      incSum[index] = (incSum[index - 1] + incDp[index]) % MODULO;
      decSum[index] = (decSum[index - 1] + decDp[index]) % MODULO;
    }

    len += 1;
  }

  return (incSum[r] + decSum[r]) % MODULO;
};
```
