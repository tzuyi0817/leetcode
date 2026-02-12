# [2484. Count Palindromic Subsequences](https://leetcode.com/problems/count-palindromic-subsequences)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a string of digits <code>s</code>, return <em>the number of <strong>palindromic subsequences</strong> of</em> <code>s</code><em> having length </em><code>5</code>. Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p><strong>Note:</strong></p>

<ul>
	<li>A string is <strong>palindromic</strong> if it reads the same forward and backward.</li>
	<li>A <strong>subsequence</strong> is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "103301"
<strong>Output:</strong> 2
<strong>Explanation:</strong> 
There are 6 possible subsequences of length 5: "10330","10331","10301","10301","13301","03301". 
Two of them (both equal to "10301") are palindromic.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "0000000"
<strong>Output:</strong> 21
<strong>Explanation:</strong> All 21 subsequences are "00000", which is palindromic.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "9999900000"
<strong>Output:</strong> 2
<strong>Explanation:</strong> The only two palindromic subsequences are "99999" and "00000".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>s</code> consists of digits.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(9*9*5\*n -> n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const countPalindromes = function (s) {
  const SUBSEQ_SIZE = 5;
  const MODULO = 10 ** 9 + 7;
  let result = 0;

  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      const palindromic = [`${a}`, `${b}`, '#', `${b}`, `${a}`];
      const dp = new Array(SUBSEQ_SIZE + 1).fill(0);

      dp[SUBSEQ_SIZE] = 1;

      for (const char of s) {
        for (let index = 0; index < SUBSEQ_SIZE; index++) {
          const current = palindromic[index];

          if (current === '#' || current === char) {
            dp[index] = (dp[index] + dp[index + 1]) % MODULO;
          }
        }
      }

      result = (result + dp[0]) % MODULO;
    }
  }

  return result;
};
```
