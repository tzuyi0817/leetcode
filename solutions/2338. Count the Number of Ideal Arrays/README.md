# [2338. Count the Number of Ideal Arrays](https://leetcode.com/problems/count-the-number-of-ideal-arrays)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two integers <code>n</code> and <code>maxValue</code>, which are used to describe an <strong>ideal</strong> array.</p>

<p>A <strong>0-indexed</strong> integer array <code>arr</code> of length <code>n</code> is considered <strong>ideal</strong> if the following conditions hold:</p>

<ul>
	<li>Every <code>arr[i]</code> is a value from <code>1</code> to <code>maxValue</code>, for <code>0 &lt;= i &lt; n</code>.</li>
	<li>Every <code>arr[i]</code> is divisible by <code>arr[i - 1]</code>, for <code>0 &lt; i &lt; n</code>.</li>
</ul>

<p>Return <em>the number of <strong>distinct</strong> ideal arrays of length </em><code>n</code>. Since the answer may be very large, return it modulo <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 2, maxValue = 5
<strong>Output:</strong> 10
<strong>Explanation:</strong> The following are the possible ideal arrays:
- Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
- Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
- Arrays starting with the value 3 (1 array): [3,3]
- Arrays starting with the value 4 (1 array): [4,4]
- Arrays starting with the value 5 (1 array): [5,5]
There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 5, maxValue = 3
<strong>Output:</strong> 11
<strong>Explanation:</strong> The following are the possible ideal arrays:
- Arrays starting with the value 1 (9 arrays): 
   - With no other distinct values (1 array): [1,1,1,1,1] 
   - With 2<sup>nd</sup> distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
   - With 2<sup>nd</sup> distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
- Arrays starting with the value 2 (1 array): [2,2,2,2,2]
- Arrays starting with the value 3 (1 array): [3,3,3,3,3]
There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= maxValue &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Combinatorics`**

- Time complexity: <em>O(maxValue*log*maxValue)</em>
- Space complexity: <em>O(n+maxValue*log*maxValue)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} maxValue
 * @return {number}
 */
const idealArrays = function (n, maxValue) {
  const MODULO = BigInt(10 ** 9 + 7);
  const maxN = Math.min(n, 14); // 2 ** 14 > 10 ** 4
  const dp = Array.from({ length: maxN + 1 }, () => new Array(maxValue + 1).fill(0n));
  const factors = Array.from({ length: maxValue + 1 }, () => []);
  const comb = Array.from({ length: n }, () => new Array(maxN).fill(-1));
  let result = 0n;

  const nCk = (n, k) => {
    if (!k || n === k) return 1n;
    if (comb[n][k] !== -1) return comb[n][k];
    const count = nCk(n - 1, k) + nCk(n - 1, k - 1);

    comb[n][k] = count;

    return count;
  };

  for (let factor = 1; factor <= maxValue; factor++) {
    for (let value = factor * 2; value <= maxValue; value += factor) {
      factors[value].push(factor);
    }
  }

  for (let value = 1; value <= maxValue; value++) {
    dp[1][value] = 1n;
  }

  for (let len = 2; len <= maxN; len++) {
    for (let value = 1; value <= maxValue; value++) {
      for (const factor of factors[value]) {
        dp[len][value] = (dp[len][value] + dp[len - 1][factor]) % MODULO;
      }
    }
  }

  for (let len = 1; len <= maxN; len++) {
    for (let value = 1; value <= maxValue; value++) {
      dp[len][0] = (dp[len][0] + dp[len][value]) % MODULO;
    }
  }

  for (let len = 1; len <= maxN; len++) {
    result = (result + nCk(n - 1, len - 1) * dp[len][0]) % MODULO;
  }

  return Number(result);
};
```
