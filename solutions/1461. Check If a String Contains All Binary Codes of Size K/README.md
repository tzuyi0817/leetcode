# [1461. Check If a String Contains All Binary Codes of Size K](https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k)

## Description

<div class="_1l1MA" data-track-load="description_content"><p>Given a binary string <code>s</code> and an integer <code>k</code>, return <code>true</code> <em>if every binary code of length</em> <code>k</code> <em>is a substring of</em> <code>s</code>. Otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "00110110", k = 2
<strong>Output:</strong> true
<strong>Explanation:</strong> The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "0110", k = 1
<strong>Output:</strong> true
<strong>Explanation:</strong> The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring. 
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "0110", k = 2
<strong>Output:</strong> false
<strong>Explanation:</strong> The binary code "00" is of length 2 and does not exist in the array.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>5</sup></code></li>
	<li><code>s[i]</code> is either <code>'0'</code> or <code>'1'</code>.</li>
	<li><code>1 &lt;= k &lt;= 20</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `String`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
const hasAllCodes = function (s, k) {
  const targetCount = 2 ** k;
  const codeSet = new Set();

  for (let index = k; index <= s.length; index++) {
    const code = s.slice(index - k, index);

    codeSet.add(code);
    if (codeSet.size === targetCount) return true;
  }
  return false;
};
```
