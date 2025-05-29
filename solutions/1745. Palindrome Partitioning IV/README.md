# [1745. Palindrome Partitioning IV](https://leetcode.com/problems/palindrome-partitioning-iv)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string <code>s</code>, return <code>true</code> <em>if it is possible to split the string</em> <code>s</code> <em>into three <strong>non-empty</strong> palindromic substrings. Otherwise, return </em><code>false</code>.​​​​​</p>

<p>A string is said to be palindrome if it the same string when reversed.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abcbdd"
<strong>Output:</strong> true
<strong>Explanation: </strong>"abcbdd" = "a" + "bcb" + "dd", and all three substrings are palindromes.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "bcbddxy"
<strong>Output:</strong> false
<strong>Explanation: </strong>s cannot be split into 3 palindromes.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= s.length &lt;= 2000</code></li>
	<li><code>s</code>​​​​​​ consists only of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {boolean}
 */
const checkPartitioning = function (s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(null));

  const isPalindrome = (a, b) => {
    if (a >= b) return true;
    if (dp[a][b] !== null) return dp[a][b];
    const result = s[a] === s[b] && isPalindrome(a + 1, b - 1);

    dp[a][b] = result;

    return result;
  };

  for (let a = 0; a < n - 2; a++) {
    const segment1 = isPalindrome(0, a);

    if (!segment1) continue;

    for (let b = a + 1; b < n - 1; b++) {
      const segment2 = isPalindrome(a + 1, b);

      if (!segment2) continue;
      const segment3 = isPalindrome(b + 1, n - 1);

      if (segment3) return true;
    }
  }

  return false;
};
```
