# [940. Distinct Subsequences II](https://leetcode.com/problems/distinct-subsequences-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string s, return <em>the number of <strong>distinct non-empty subsequences</strong> of</em> <code>s</code>. Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>
A <strong>subsequence</strong> of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., <code>"ace"</code> is a subsequence of <code>"<u>a</u>b<u>c</u>d<u>e</u>"</code> while <code>"aec"</code> is not.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abc"
<strong>Output:</strong> 7
<strong>Explanation:</strong> The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "aba"
<strong>Output:</strong> 6
<strong>Explanation:</strong> The 6 distinct subsequences are "a", "b", "ab", "aa", "ba", and "aba".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "aaa"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The 3 distinct subsequences are "a", "aa" and "aaa".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2000</code></li>
	<li><code>s</code> consists of lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n \* 26)</em>
- Space complexity: <em>O(26)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const distinctSubseqII = function (s) {
  const MODULO = 10 ** 9 + 7;
  const BASE_CODE = 'a'.charCodeAt(0);
  const dp = Array.from({length: 26}).fill(0);
  const accumulate = nums => nums.reduce((sum, num) => sum + num);

  for (const letter of s) {
    const code = letter.charCodeAt(0) - BASE_CODE;

    dp[code] = (accumulate(dp) + 1) % MODULO;
  }
  return accumulate(dp) % MODULO;
};
```
