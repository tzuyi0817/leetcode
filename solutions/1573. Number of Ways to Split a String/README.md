# [1573. Number of Ways to Split a String](https://leetcode.com/problems/number-of-ways-to-split-a-string)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given a binary string <code>s</code>, you can split <code>s</code> into 3 <strong>non-empty</strong> strings <code>s1</code>, <code>s2</code>, and <code>s3</code> where <code>s1 + s2 + s3 = s</code>.</p>

<p>Return the number of ways <code>s</code> can be split such that the number of ones is the same in <code>s1</code>, <code>s2</code>, and <code>s3</code>. Since the answer may be too large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "10101"
<strong>Output:</strong> 4
<strong>Explanation:</strong> There are four ways to split s in 3 parts where each part contain the same number of letters '1'.
"1|010|1"
"1|01|01"
"10|10|1"
"10|1|01"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "1001"
<strong>Output:</strong> 0
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "0000"
<strong>Output:</strong> 3
<strong>Explanation:</strong> There are three ways to split s in 3 parts.
"0|0|00"
"0|00|0"
"00|0|0"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s[i]</code> is either <code>'0'</code> or <code>'1'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const numWays = function (s) {
  const MODULO = 10 ** 9 + 7;
  const size = s.length;
  let count = 0;

  for (const char of s) {
    char === '1' && (count += 1);
  }
  if (count % 3) return 0;
  if (count === 0) return (((size - 1) * (size - 2)) / 2) % MODULO;
  let current = 0;
  let first = 0;
  let second = 0;

  count /= 3;

  for (const char of s) {
    if (char === '1') current += 1;
    if (current === count) first += 1;
    if (current === count * 2) second += 1;
  }
  return (first * second) % MODULO;
};
```
