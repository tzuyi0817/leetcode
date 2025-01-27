# [1392. Longest Happy Prefix](https://leetcode.com/problems/longest-happy-prefix)

## Description

<div class="elfjS" data-track-load="description_content"><p>A string is called a <strong>happy prefix</strong> if is a <strong>non-empty</strong> prefix which is also a suffix (excluding itself).</p>

<p>Given a string <code>s</code>, return <em>the <strong>longest happy prefix</strong> of</em> <code>s</code>. Return an empty string <code>""</code> if no such prefix exists.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "level"
<strong>Output:</strong> "l"
<strong>Explanation:</strong> s contains 4 prefix excluding itself ("l", "le", "lev", "leve"), and suffix ("l", "el", "vel", "evel"). The largest prefix which is also suffix is given by "l".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "ababab"
<strong>Output:</strong> "abab"
<strong>Explanation:</strong> "abab" is the largest prefix which is also suffix. They can overlap in the original string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Longest Prefix Suffix`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const longestPrefix = function (s) {
  const n = s.length;
  const lps = Array.from({ length: n }, () => 0);
  let length = 0;

  for (let index = 1; index < n; index++) {
    while (length && s[index] !== s[length]) {
      length = lps[length - 1];
    }
    if (s[index] === s[length]) {
      length += 1;
    }
    lps[index] = length;
  }
  return s.slice(0, lps[n - 1]);
};
```
