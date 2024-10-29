# [44. Wildcard Matching](https://leetcode.com/problems/wildcard-matching)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an input string (<code>s</code>) and a pattern (<code>p</code>), implement wildcard pattern matching with support for <code>'?'</code> and <code>'*'</code> where:</p>

<ul>
	<li><code>'?'</code> Matches any single character.</li>
	<li><code>'*'</code> Matches any sequence of characters (including the empty sequence).</li>
</ul>

<p>The matching should cover the <strong>entire</strong> input string (not partial).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "aa", p = "a"
<strong>Output:</strong> false
<strong>Explanation:</strong> "a" does not match the entire string "aa".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aa", p = "*"
<strong>Output:</strong> true
<strong>Explanation:</strong>&nbsp;'*' matches any sequence.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "cb", p = "?a"
<strong>Output:</strong> false
<strong>Explanation:</strong>&nbsp;'?' matches 'c', but the second letter is 'a', which does not match 'b'.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= s.length, p.length &lt;= 2000</code></li>
	<li><code>s</code> contains only lowercase English letters.</li>
	<li><code>p</code> contains only lowercase English letters, <code>'?'</code> or <code>'*'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(mn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  const n = s.length;
  const m = p.length;
  const dp = new Array(n + 1)
    .fill('')
    .map(_ => new Array(m + 1).fill(false));

  dp[0][0] = true;

  for (let index = 0; index < m; index++) {
    if (p[index] !== '*') continue;
    dp[0][index + 1] = dp[0][index];
  }
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= m; b++) {
      const str = s[a - 1];
      const pattern = p[b - 1];

      if (pattern === '*') {
        dp[a][b] = dp[a - 1][b] || dp[a][b - 1];
        continue;
      }
      if (str !== pattern && pattern !== '?') continue;
      dp[a][b] = dp[a - 1][b - 1];
    }
  }
  return dp[n][m];
};
```
