# [903. Valid Permutations for DI Sequence](https://leetcode.com/problems/valid-permutations-for-di-sequence)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> of length <code>n</code> where <code>s[i]</code> is either:</p>

<ul>
	<li><code>'D'</code> means decreasing, or</li>
	<li><code>'I'</code> means increasing.</li>
</ul>

<p>A permutation <code>perm</code> of <code>n + 1</code> integers of all the integers in the range <code>[0, n]</code> is called a <strong>valid permutation</strong> if for all valid <code>i</code>:</p>

<ul>
	<li>If <code>s[i] == 'D'</code>, then <code>perm[i] &gt; perm[i + 1]</code>, and</li>
	<li>If <code>s[i] == 'I'</code>, then <code>perm[i] &lt; perm[i + 1]</code>.</li>
</ul>

<p>Return <em>the number of <strong>valid permutations</strong> </em><code>perm</code>. Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "DID"
<strong>Output:</strong> 5
<strong>Explanation:</strong> The 5 valid permutations of (0, 1, 2, 3) are:
(1, 0, 3, 2)
(2, 0, 3, 1)
(2, 1, 3, 0)
(3, 0, 2, 1)
(3, 1, 2, 0)
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "D"
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == s.length</code></li>
	<li><code>1 &lt;= n &lt;= 200</code></li>
	<li><code>s[i]</code> is either <code>'I'</code> or <code>'D'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @return {number}
 */
const numPermsDISequence = function (s) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  let dp = Array(n + 1).fill(1);

  const calculateDecPerms = remain => {
    const nexDp = Array(n + 1).fill(0);
    let prefixSum = 0;

    for (let index = remain - 1; index >= 0; index--) {
      prefixSum = (prefixSum + dp[index + 1]) % MODULO;
      nexDp[index] = prefixSum;
    }
    return nexDp;
  };

  const calculateIncPerms = remain => {
    const nexDp = Array(n + 1).fill(0);
    let prefixSum = 0;

    for (let index = 0; index < remain; index++) {
      prefixSum = (prefixSum + dp[index]) % MODULO;
      nexDp[index] = prefixSum;
    }
    return nexDp;
  };

  for (let index = 0; index < n; index++) {
    const isDec = s[index] === 'D';
    const remain = n - index;

    dp = isDec ? calculateDecPerms(remain) : calculateIncPerms(remain);
  }
  return dp[0];
};
```
