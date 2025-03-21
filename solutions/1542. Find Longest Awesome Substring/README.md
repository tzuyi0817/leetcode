# [1542. Find Longest Awesome Substring](https://leetcode.com/problems/find-longest-awesome-substring)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code>. An <strong>awesome</strong> substring is a non-empty substring of <code>s</code> such that we can make any number of swaps in order to make it a palindrome.</p>

<p>Return <em>the length of the maximum length <strong>awesome substring</strong> of</em> <code>s</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "3242415"
<strong>Output:</strong> 5
<strong>Explanation:</strong> "24241" is the longest awesome substring, we can form the palindrome "24142" with some swaps.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "12345678"
<strong>Output:</strong> 1
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "213123"
<strong>Output:</strong> 6
<strong>Explanation:</strong> "213123" is the longest awesome substring, we can form the palindrome "231132" with some swaps.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists only of digits.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Bit Manipulation`**

- Time complexity: <em>O(10n -> n)</em>
- Space complexity: <em>O(1024 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const longestAwesome = function (s) {
  const n = s.length;
  const prefixIndex = Array.from({ length: 1 << 10 }, () => n);
  let bitmask = 0;
  let result = 0;

  prefixIndex[0] = -1;

  for (let index = 0; index < n; index++) {
    bitmask ^= 1 << Number(s[index]);

    result = Math.max(index - prefixIndex[bitmask], result);

    for (let num = 0; num < 10; num++) {
      const prevIndex = prefixIndex[bitmask ^ (1 << num)];

      result = Math.max(index - prevIndex, result);
    }

    prefixIndex[bitmask] = Math.min(index, prefixIndex[bitmask]);
  }

  return result;
};
```
