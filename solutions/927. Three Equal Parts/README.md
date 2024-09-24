# [927. Three Equal Parts](https://leetcode.com/problems/three-equal-parts)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>arr</code> which consists of only zeros and ones, divide the array into <strong>three non-empty parts</strong> such that all of these parts represent the same binary value.</p>

<p>If it is possible, return any <code>[i, j]</code> with <code>i + 1 &lt; j</code>, such that:</p>

<ul>
	<li><code>arr[0], arr[1], ..., arr[i]</code> is the first part,</li>
	<li><code>arr[i + 1], arr[i + 2], ..., arr[j - 1]</code> is the second part, and</li>
	<li><code>arr[j], arr[j + 1], ..., arr[arr.length - 1]</code> is the third part.</li>
	<li>All three parts have equal binary values.</li>
</ul>

<p>If it is not possible, return <code>[-1, -1]</code>.</p>

<p>Note that the entire part is used when considering what binary value it represents. For example, <code>[1,1,0]</code> represents <code>6</code> in decimal, not <code>3</code>. Also, leading zeros <strong>are allowed</strong>, so <code>[0,1,1]</code> and <code>[1,1]</code> represent the same value.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> arr = [1,0,1,0,1]
<strong>Output:</strong> [0,3]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> arr = [1,1,0,1,1]
<strong>Output:</strong> [-1,-1]
</pre><p><strong class="example">Example 3:</strong></p>
<pre><strong>Input:</strong> arr = [1,1,0,0,1]
<strong>Output:</strong> [0,2]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= arr.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>arr[i]</code> is <code>0</code> or <code>1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @return {number[]}
 */
const threeEqualParts = function (arr) {
  const n = arr.length;
  const ones = arr.reduce((total, value) => total + value);

  if (!ones) return [0, n - 1];
  if (ones % 3) return [-1, -1];

  const preOnes = ones / 3;
  let start = 0;
  let mid = 0;
  let end = 0;
  let currentOnes = 0;

  for (let index = 0; index < n; index++) {
    const value = arr[index];

    if (!value) continue;
    if (!currentOnes) start = index;
    currentOnes += 1;
    if (currentOnes === preOnes + 1) {
      mid = index;
    }
    if (currentOnes === preOnes * 2 + 1) {
      end = index;
    }
  }

  while (end < n && arr[start] === arr[mid] && arr[mid] === arr[end]) {
    start += 1;
    mid += 1;
    end += 1;
  }
  if (end === n) return [start - 1, mid];

  return [-1, -1];
};
```
