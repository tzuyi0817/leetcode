# [2478. Number of Beautiful Partitions](https://leetcode.com/problems/number-of-beautiful-partitions)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> that consists of the digits <code>'1'</code> to <code>'9'</code> and two integers <code>k</code> and <code>minLength</code>.</p>

<p>A partition of <code>s</code> is called <strong>beautiful</strong> if:</p>

<ul>
	<li><code>s</code> is partitioned into <code>k</code> non-intersecting substrings.</li>
	<li>Each substring has a length of <strong>at least</strong> <code>minLength</code>.</li>
	<li>Each substring starts with a <strong>prime</strong> digit and ends with a <strong>non-prime</strong> digit. Prime digits are <code>'2'</code>, <code>'3'</code>, <code>'5'</code>, and <code>'7'</code>, and the rest of the digits are non-prime.</li>
</ul>

<p>Return<em> the number of <strong>beautiful</strong> partitions of </em><code>s</code>. Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>A <strong>substring</strong> is a contiguous sequence of characters within a string.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> s = "23542185131", k = 3, minLength = 2
<strong>Output:</strong> 3
<strong>Explanation:</strong> There exists three ways to create a beautiful partition:
"2354 | 218 | 5131"
"2354 | 21851 | 31"
"2354218 | 51 | 31"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> s = "23542185131", k = 3, minLength = 3
<strong>Output:</strong> 1
<strong>Explanation:</strong> There exists one way to create a beautiful partition: "2354 | 218 | 5131".
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> s = "3312958", k = 3, minLength = 1
<strong>Output:</strong> 1
<strong>Explanation:</strong> There exists one way to create a beautiful partition: "331 | 29 | 58".
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k, minLength &lt;= s.length &lt;= 1000</code></li>
	<li><code>s</code> consists of the digits <code>'1'</code> to <code>'9'</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nk)</em>
- Space complexity: <em>O(nk)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @param {number} minLength
 * @return {number}
 */
const beautifulPartitions = function (s, k, minLength) {
  const MODULO = 10 ** 9 + 7;
  const n = s.length;
  const primes = new Set(['2', '3', '5', '7']);

  if (!primes.has(s[0]) || primes.has(s[n - 1])) return 0;

  const dp = Array.from({ length: n }, () => new Array(k).fill(-1));

  const getPartitions = (index, parts) => {
    if (index <= n && parts === 0) return 1;

    if (index >= n) return 0;

    if (dp[index][parts] !== -1) return dp[index][parts];

    const isPrevPrime = primes.has(s[index - 1]);
    const isPrime = primes.has(s[index]);
    let result = getPartitions(index + 1, parts);

    if (isPrime && !isPrevPrime) {
      const count = getPartitions(index + minLength, parts - 1);

      result = (result + count) % MODULO;
    }

    dp[index][parts] = result;

    return result;
  };

  return getPartitions(minLength, k - 1);
};
```
