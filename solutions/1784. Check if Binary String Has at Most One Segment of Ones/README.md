# [1784. Check if Binary String Has at Most One Segment of Ones](https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a binary string <code>s</code> <strong>​​​​​without leading zeros</strong>, return <code>true</code>​​​ <em>if </em><code>s</code><em> contains <strong>at most one contiguous segment of ones</strong></em>. Otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "1001"
<strong>Output:</strong> false
<strong>Explanation: </strong>The ones do not form a contiguous segment.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "110"
<strong>Output:</strong> true</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 100</code></li>
	<li><code>s[i]</code>​​​​ is either <code>'0'</code> or <code>'1'</code>.</li>
	<li><code>s[0]</code> is&nbsp;<code>'1'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {boolean}
 */
const checkOnesSegment = function (s) {
  return !s.includes('01');
};
```
