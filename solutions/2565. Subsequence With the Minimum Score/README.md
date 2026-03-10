# [2565. Subsequence With the Minimum Score](https://leetcode.com/problems/subsequence-with-the-minimum-score)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two strings <code>s</code> and <code>t</code>.</p>

<p>You are allowed to remove any number of characters from the string <code>t</code>.</p>

<p>The score of the string is <code>0</code> if no characters are removed from the string <code>t</code>, otherwise:</p>

<ul>
	<li>Let <code>left</code> be the minimum index among all removed characters.</li>
	<li>Let <code>right</code> be the maximum index among all removed characters.</li>
</ul>

<p>Then the score of the string is <code>right - left + 1</code>.</p>

<p>Return <em>the minimum possible score to make </em><code>t</code><em>&nbsp;a subsequence of </em><code>s</code><em>.</em></p>

<p>A <strong>subsequence</strong> of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., <code>"ace"</code> is a subsequence of <code>"<u>a</u>b<u>c</u>d<u>e</u>"</code> while <code>"aec"</code> is not).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abacaba", t = "bzaa"
<strong>Output:</strong> 1
<strong>Explanation:</strong> In this example, we remove the character "z" at index 1 (0-indexed).
The string t becomes "baa" which is a subsequence of the string "abacaba" and the score is 1 - 1 + 1 = 1.
It can be proven that 1 is the minimum score that we can achieve.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "cde", t = "xyz"
<strong>Output:</strong> 3
<strong>Explanation:</strong> In this example, we remove characters "x", "y" and "z" at indices 0, 1, and 2 (0-indexed).
The string t becomes "" which is a subsequence of the string "cde" and the score is 2 - 0 + 1 = 3.
It can be proven that 3 is the minimum score that we can achieve.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length, t.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> and <code>t</code> consist of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Two Pointers + Prefix Sum`**

- Time complexity: <em>O(m+n)</em>
- Space complexity: <em>O(m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const minimumScore = function (s, t) {
  const m = s.length;
  const n = t.length;
  const prefixSum = Array.from({ length: m }, () => 0);
  const suffixSum = Array.from({ length: m }, () => 0);
  let j = 0;

  for (let index = 0; index < m; index++) {
    if (s[index] === t[j]) {
      prefixSum[index] += 1;
      j += 1;
    }

    prefixSum[index] += prefixSum[index - 1] ?? 0;
  }

  j = n - 1;

  for (let index = m - 1; index >= 0; index--) {
    if (s[index] === t[j]) {
      suffixSum[index] += 1;
      j -= 1;
    }

    suffixSum[index] += suffixSum[index + 1] ?? 0;
  }

  let result = n - Math.max(prefixSum[m - 1], suffixSum[0]);

  for (let index = 0; index < m - 1; index++) {
    const score = n - prefixSum[index] - suffixSum[index + 1];

    result = Math.min(score, result);
  }

  return Math.max(result, 0);
};
```
