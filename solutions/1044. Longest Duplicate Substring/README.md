# [1044. Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code>, consider all <em>duplicated substrings</em>: (contiguous) substrings of s that occur 2 or more times.&nbsp;The occurrences&nbsp;may overlap.</p>

<p>Return <strong>any</strong> duplicated&nbsp;substring that has the longest possible length.&nbsp;If <code>s</code> does not have a duplicated substring, the answer is <code>""</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> s = "banana"
<strong>Output:</strong> "ana"
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> s = "abcd"
<strong>Output:</strong> ""
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Rolling Hash`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {string}
 */
const longestDupSubstring = function (s) {
  const MODULO = 2 ** 47 - 1;
  const BASE_HASH = 26;
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const codes = [...s].map(letter => letter.charCodeAt(0) - BASE_CODE);

  let left = 1;
  let right = n;
  let start = -1;
  let end = -1;

  const rollingHash = length => {
    const seen = new Set();
    let hash = 0;
    let power = 1;

    for (let index = 0; index < length; index++) {
      const code = codes[index];

      hash = (hash * BASE_HASH + code) % MODULO;
      power = (power * BASE_HASH) % MODULO;
    }
    seen.add(hash);

    for (let last = length; last < n; last++) {
      const removeCode = codes[last - length];
      const code = codes[last];

      hash = (hash * BASE_HASH) % MODULO;
      hash = (((hash - power * removeCode) % MODULO) + MODULO) % MODULO;
      hash = (hash + code) % MODULO;

      if (seen.has(hash)) {
        return { start: last - length + 1, end: last + 1 };
      }
      seen.add(hash);
    }
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const range = rollingHash(mid);

    if (range) {
      start = range.start;
      end = range.end;
    }
    range ? (left = mid + 1) : (right = mid);
  }
  return s.slice(start, end);
};
```
