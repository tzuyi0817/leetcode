# [1977. Number of Ways to Separate Numbers](https://leetcode.com/problems/number-of-ways-to-separate-numbers)

## Description

<div class="elfjS" data-track-load="description_content"><p>You wrote down many <strong>positive</strong> integers in a string called <code>num</code>. However, you realized that you forgot to add commas to seperate the different numbers. You remember that the list of integers was <strong>non-decreasing</strong> and that <strong>no</strong> integer had leading zeros.</p>

<p>Return <em>the <strong>number of possible lists of integers</strong> that you could have written down to get the string </em><code>num</code>. Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> num = "327"
<strong>Output:</strong> 2
<strong>Explanation:</strong> You could have written down the numbers:
3, 27
327
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> num = "094"
<strong>Output:</strong> 0
<strong>Explanation:</strong> No numbers can have leading zeros and all numbers must be positive.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> num = "0"
<strong>Output:</strong> 0
<strong>Explanation:</strong> No numbers can have leading zeros and all numbers must be positive.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= num.length &lt;= 3500</code></li>
	<li><code>num</code> consists of digits <code>'0'</code> through <code>'9'</code>.</li>
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
 * @param {string} num
 * @return {number}
 */
const numberOfCombinations = function (num) {
  if (num[0] === '0') return 0;

  const MODULO = BigInt(10 ** 9 + 7);
  const n = num.length;
  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(0n));
  const lcs = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  for (let a = n - 1; a >= 0; a--) {
    for (let b = a + 1; b < n; b++) {
      if (num[a] !== num[b]) continue;

      lcs[a][b] = lcs[a + 1][b + 1] + 1;
    }
  }

  for (let index = 0; index < n; index++) {
    for (let len = 1; len <= index + 1; len++) {
      const start = index - len + 1;

      dp[index][len] += dp[index][len - 1];
      dp[index][len] %= MODULO;

      if (num[start] === '0') continue;
      if (start === 0) {
        dp[index][len] += 1n;
        continue;
      }

      if (start < len) {
        dp[index][len] += dp[start - 1][start];
        continue;
      }

      const lc = lcs[start - len][start];

      if (lc >= len || num[start - len + lc] <= num[start + lc]) {
        dp[index][len] += dp[start - 1][len];
      } else {
        dp[index][len] += dp[start - 1][len - 1];
      }
    }
  }

  return Number(dp[n - 1][n] % MODULO);
};
```
