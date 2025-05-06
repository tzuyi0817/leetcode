# [1638. Count Substrings That Differ by One Character](https://leetcode.com/problems/count-substrings-that-differ-by-one-character)

## Description

<div class="xFUwe" data-track-load="description_content"><p>Given two strings <code>s</code> and <code>t</code>, find the number of ways you can choose a non-empty substring of <code>s</code> and replace a <strong>single character</strong> by a different character such that the resulting substring is a substring of <code>t</code>. In other words, find the number of substrings in <code>s</code> that differ from some substring in <code>t</code> by <strong>exactly</strong> one character.</p>

<p>For example, the underlined substrings in <code>"<u>compute</u>r"</code> and <code>"<u>computa</u>tion"</code> only differ by the <code>'e'</code>/<code>'a'</code>, so this is a valid way.</p>

<p>Return <em>the number of substrings that satisfy the condition above.</em></p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aba", t = "baba"
<strong>Output:</strong> 6
<strong>Explanation:</strong> The following are the pairs of substrings from s and t that differ by exactly 1 character:
("<u>a</u>ba", "<u>b</u>aba")
("<u>a</u>ba", "ba<u>b</u>a")
("ab<u>a</u>", "<u>b</u>aba")
("ab<u>a</u>", "ba<u>b</u>a")
("a<u>b</u>a", "b<u>a</u>ba")
("a<u>b</u>a", "bab<u>a</u>")
The underlined portions are the substrings that are chosen from s and t.
</pre>

​​<strong class="example">Example 2:</strong>

<pre><strong>Input:</strong> s = "ab", t = "bb"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The following are the pairs of substrings from s and t that differ by 1 character:
("<u>a</u>b", "<u>b</u>b")
("<u>a</u>b", "b<u>b</u>")
("<u>ab</u>", "<u>bb</u>")
​​​​The underlined portions are the substrings that are chosen from s and t.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length, t.length &lt;= 100</code></li>
	<li><code>s</code> and <code>t</code> consist of lowercase English letters only.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Continuous Matching`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const countSubstrings = function (s, t) {
  const m = s.length;
  const n = t.length;
  let result = 0;

  const checkSubstring = (a, b) => {
    let current = 0;
    let previous = 0;

    while (a < m && b < n) {
      current += 1;

      if (s[a] !== t[b]) {
        previous = current;
        current = 0;
      }
      result += previous;
      a += 1;
      b += 1;
    }
  };

  for (let index = 0; index < m; index++) checkSubstring(index, 0);
  for (let index = 1; index < n; index++) checkSubstring(0, index);
  return result;
};
```
