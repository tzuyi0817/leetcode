# [1960. Maximum Product of the Length of Two Palindromic Substrings](https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-substrings)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> string <code>s</code> and are tasked with finding two <strong>non-intersecting palindromic </strong>substrings of <strong>odd</strong> length such that the product of their lengths is maximized.</p>

<p>More formally, you want to choose four integers <code>i</code>, <code>j</code>, <code>k</code>, <code>l</code> such that <code>0 &lt;= i &lt;= j &lt; k &lt;= l &lt; s.length</code> and both the substrings <code>s[i...j]</code> and <code>s[k...l]</code> are palindromes and have odd lengths. <code>s[i...j]</code> denotes a substring from index <code>i</code> to index <code>j</code> <strong>inclusive</strong>.</p>

<p>Return <em>the <strong>maximum</strong> possible product of the lengths of the two non-intersecting palindromic substrings.</em></p>

<p>A <strong>palindrome</strong> is a string that is the same forward and backward. A <strong>substring</strong> is a contiguous sequence of characters in a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "ababbb"
<strong>Output:</strong> 9
<strong>Explanation:</strong> Substrings "aba" and "bbb" are palindromes with odd length. product = 3 * 3 = 9.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "zaaaxbbby"
<strong>Output:</strong> 9
<strong>Explanation:</strong> Substrings "aaa" and "bbb" are palindromes with odd length. product = 3 * 3 = 9.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Manacher’s Algorithm`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const maxProduct = function (s) {
  const n = s.length;

  const manacher = str => {
    const maxExtends = Array.from({ length: n }, () => 0);
    const leftToRight = Array.from({ length: n }, () => 1);
    let center = 0;

    for (let index = 0; index < n; index++) {
      const r = center + maxExtends[center] - 1;
      const mirrorIndex = center - (index - center);
      let extend = index > r ? 1 : Math.min(maxExtends[mirrorIndex], r - index + 1);

      while (index - extend >= 0 && index + extend < n && str[index - extend] === str[index + extend]) {
        leftToRight[index + extend] = 2 * extend + 1;
        extend += 1;
      }

      maxExtends[index] = extend;

      if (index + maxExtends[index] >= r) {
        center = index;
      }
    }

    for (let index = 1; index < n; index++) {
      leftToRight[index] = Math.max(leftToRight[index], leftToRight[index - 1]);
    }

    return leftToRight;
  };

  const maxLeft = manacher(s);
  const reversed = s.split('').toReversed().join('');
  const maxRight = manacher(reversed).toReversed();
  let result = 1;

  for (let index = 1; index < n; index++) {
    result = Math.max(result, maxLeft[index - 1] * maxRight[index]);
  }

  return result;
};
```
