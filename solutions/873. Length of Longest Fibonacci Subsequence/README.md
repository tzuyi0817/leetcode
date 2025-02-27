# [873. Length of Longest Fibonacci Subsequence](https://leetcode.com/problems/length-of-longest-fibonacci-subsequence)

## Description

<div class="elfjS" data-track-load="description_content"><p>A sequence <code>x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub></code> is <em>Fibonacci-like</em> if:</p>

<ul>
	<li><code>n &gt;= 3</code></li>
	<li><code>x<sub>i</sub> + x<sub>i+1</sub> == x<sub>i+2</sub></code> for all <code>i + 2 &lt;= n</code></li>
</ul>

<p>Given a <b>strictly increasing</b> array <code>arr</code> of positive integers forming a sequence, return <em>the <strong>length</strong> of the longest Fibonacci-like subsequence of</em> <code>arr</code>. If one does not exist, return <code>0</code>.</p>

<p>A <strong>subsequence</strong> is derived from another sequence <code>arr</code> by deleting any number of elements (including none) from <code>arr</code>, without changing the order of the remaining elements. For example, <code>[3, 5, 8]</code> is a subsequence of <code>[3, 4, 5, 6, 7, 8]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr = [1,2,3,4,5,6,7,8]
<strong>Output:</strong> 5
<strong>Explanation:</strong> The longest subsequence that is fibonacci-like: [1,2,3,5,8].</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr = [1,3,7,11,12,14,18]
<strong>Output:</strong> 3
<strong>Explanation</strong>:<strong> </strong>The longest subsequence that is fibonacci-like: [1,11,12], [3,11,14] or [7,11,18].</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= arr.length &lt;= 1000</code></li>
	<li><code>1 &lt;= arr[i] &lt; arr[i + 1] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @return {number}
 */
const lenLongestFibSubseq = function (arr) {
  const n = arr.length;
  const valueMap = new Map();
  const dp = new Map();
  let result = 0;

  for (let index = 0; index < n; index++) {
    valueMap.set(arr[index], index);
  }

  for (let a = 1; a < n; a++) {
    for (let b = 0; b < a; b++) {
      const target = arr[a] - arr[b];

      if (target >= arr[b] || !valueMap.has(target)) continue;
      const c = valueMap.get(target);
      const len = dp.get(`${c},${b}`) ?? 0;

      dp.set(`${b},${a}`, len + 1);
      result = Math.max(len + 1, result);
    }
  }

  return result ? result + 2 : 0;
};
```
