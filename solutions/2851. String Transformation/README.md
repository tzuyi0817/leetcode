# [2851. String Transformation](https://leetcode.com/problems/string-transformation)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given two strings <code>s</code> and <code>t</code> of equal length <code>n</code>. You can perform the following operation on the string <code>s</code>:</p>

<ul>
	<li>Remove a <strong>suffix</strong> of <code>s</code> of length <code>l</code> where <code>0 &lt; l &lt; n</code> and append it at the start of <code>s</code>.<br>
	For example, let <code>s = 'abcd'</code> then in one operation you can remove the suffix <code>'cd'</code> and append it in front of <code>s</code> making <code>s = 'cdab'</code>.</li>
</ul>

<p>You are also given an integer <code>k</code>. Return <em>the number of ways in which </em><code>s</code> <em>can be transformed into </em><code>t</code><em> in <strong>exactly</strong> </em><code>k</code><em> operations.</em></p>

<p>Since the answer can be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "abcd", t = "cdab", k = 2
<strong>Output:</strong> 2
<strong>Explanation:</strong> 
First way:
In first operation, choose suffix from index = 3, so resulting s = "dabc".
In second operation, choose suffix from index = 3, so resulting s = "cdab".

Second way:
In first operation, choose suffix from index = 1, so resulting s = "bcda".
In second operation, choose suffix from index = 1, so resulting s = "cdab".
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "ababab", t = "ababab", k = 1
<strong>Output:</strong> 2
<strong>Explanation:</strong> 
First way:
Choose suffix from index = 2, so resulting s = "ababab".

Second way:
Choose suffix from index = 4, so resulting s = "ababab".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= s.length &lt;= 5 * 10<sup>5</sup></code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>15</sup></code></li>
	<li><code>s.length == t.length</code></li>
	<li><code>s</code> and <code>t</code> consist of only lowercase English alphabets.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n+logk)</em>
- Space complexity: <em>O(n+logk)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {number}
 */
const numberOfWays = function (s, t, k) {
  const kMod = BigInt(10 ** 9 + 7);
  const n = s.length;
  const BigK = BigInt(k);
  const BigN = BigInt(n);
  const negOnePowK = BigK % 2n === 0n ? 1n : -1n;
  const z = zFunction(s + t + t);
  const indices = getIndices(z, n);
  const dp = [0, 0];
  let dp1 = (modPow(BigN - 1n, BigK, kMod) - negOnePowK + kMod) % kMod;
  let result = 0n;

  dp1 = (dp1 * modPow(BigN, kMod - 2n, kMod)) % kMod;
  dp[1] = dp1;
  dp[0] = (dp[1] + negOnePowK + kMod) % kMod;

  for (const index of indices) {
    result = (result + dp[index === 0 ? 0 : 1]) % kMod;
  }

  return Number(result);
};

function modPow(base, exp, kMod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % kMod;
    }

    base = (base * base) % kMod;
    exp /= 2n;
  }

  return result;
}

function zFunction(s) {
  const n = s.length;
  const z = Array.from({ length: n }, () => 0);
  let l = 0;
  let r = 0;

  for (let index = 1; index < n; index++) {
    if (index < r) {
      z[index] = Math.min(r - index, z[index - l]);
    }

    while (index + z[index] < n && s[z[index]] === s[index + z[index]]) {
      z[index] += 1;
    }

    if (index + z[index] > r) {
      l = index;
      r = index + z[index];
    }
  }

  return z;
}

function getIndices(z, n) {
  const indices = [];

  for (let index = n; index < n + n; index++) {
    if (z[index] >= n) {
      indices.push(index - n);
    }
  }

  return indices;
}
```
