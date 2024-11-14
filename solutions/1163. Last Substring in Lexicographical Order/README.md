# [1163. Last Substring in Lexicographical Order](https://leetcode.com/problems/last-substring-in-lexicographical-order)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code>, return <em>the last substring of</em> <code>s</code> <em>in lexicographical order</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abab"
<strong>Output:</strong> "bab"
<strong>Explanation:</strong> The substrings are ["a", "ab", "aba", "abab", "b", "ba", "bab"]. The lexicographically maximum substring is "bab".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "leetcode"
<strong>Output:</strong> "tcode"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 4 * 10<sup>5</sup></code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Two Pointers`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const lastSubstring = function (s) {
  const n = s.length;
  let a = 0;
  let b = 1;
  let length = 1;

  while (b + length <= n) {
    const letterA = s[a + length - 1];
    const letterB = s[b + length - 1];

    if (letterA === letterB) length += 1;
    else if (letterA < letterB) {
      a = Math.max(a + length, b);
      b = a + 1;
      length = 1;
    } else {
      b += length;
      length = 1;
    }
  }
  return s.slice(a);
};
```
