# [2472. Maximum Number of Non-overlapping Palindrome Substrings](https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> and a <strong>positive</strong> integer <code>k</code>.</p>

<p>Select a set of <strong>non-overlapping</strong> substrings from the string <code>s</code> that satisfy the following conditions:</p>

<ul>
	<li>The <strong>length</strong> of each substring is <strong>at least</strong> <code>k</code>.</li>
	<li>Each substring is a <strong>palindrome</strong>.</li>
</ul>

<p>Return <em>the <strong>maximum</strong> number of substrings in an optimal selection</em>.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abaccdbbd", k = 3
<strong>Output:</strong> 2
<strong>Explanation:</strong> We can select the substrings underlined in s = "<u><strong>aba</strong></u>cc<u><strong>dbbd</strong></u>". Both "aba" and "dbbd" are palindromes and have a length of at least k = 3.
It can be shown that we cannot find a selection with more than two valid substrings.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "adbcda", k = 2
<strong>Output:</strong> 0
<strong>Explanation:</strong> There is no palindrome substring of length at least 2 in the string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= s.length &lt;= 2000</code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nk)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxPalindromes = function (s, k) {
  const n = s.length;
  const dp = Array.from({ length: n + 1 }, () => 0);

  const isPalindrome = (left, right) => {
    if (left < 0) return false;

    while (left < right) {
      if (s[left] !== s[right]) return false;

      left += 1;
      right -= 1;
    }

    return true;
  };

  for (let index = k; index <= n; index++) {
    dp[index] = dp[index - 1];

    if (isPalindrome(index - k, index - 1)) {
      const len = 1 + dp[index - k];

      dp[index] = Math.max(len, dp[index]);
    }

    if (isPalindrome(index - k - 1, index - 1)) {
      const len = 1 + dp[index - k - 1];

      dp[index] = Math.max(len, dp[index]);
    }
  }

  return dp[n];
};
```
