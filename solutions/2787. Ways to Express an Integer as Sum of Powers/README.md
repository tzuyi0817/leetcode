# [2787. Ways to Express an Integer as Sum of Powers](https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two <strong>positive</strong> integers <code>n</code> and <code>x</code>.</p>

<p>Return <em>the number of ways </em><code>n</code><em> can be expressed as the sum of the </em><code>x<sup>th</sup></code><em> power of <strong>unique</strong> positive integers, in other words, the number of sets of unique integers </em><code>[n<sub>1</sub>, n<sub>2</sub>, ..., n<sub>k</sub>]</code><em> where </em><code>n = n<sub>1</sub><sup>x</sup> + n<sub>2</sub><sup>x</sup> + ... + n<sub>k</sub><sup>x</sup></code><em>.</em></p>

<p>Since the result can be very large, return it modulo <code>10<sup>9</sup> + 7</code>.</p>

<p>For example, if <code>n = 160</code> and <code>x = 3</code>, one way to express <code>n</code> is <code>n = 2<sup>3</sup> + 3<sup>3</sup> + 5<sup>3</sup></code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 10, x = 2
<strong>Output:</strong> 1
<strong>Explanation:</strong> We can express n as the following: n = 3<sup>2</sup> + 1<sup>2</sup> = 10.
It can be shown that it is the only way to express 10 as the sum of the 2<sup>nd</sup> power of unique integers.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 4, x = 1
<strong>Output:</strong> 2
<strong>Explanation:</strong> We can express n in the following ways:
- n = 4<sup>1</sup> = 4.
- n = 3<sup>1</sup> + 1<sup>1</sup> = 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 300</code></li>
	<li><code>1 &lt;= x &lt;= 5</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(nlogn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
const numberOfWays = function (n, x) {
  const MODULO = BigInt(10 ** 9 + 7);
  const powers = [];

  for (let base = 1; Math.pow(base, x) <= n; base++) {
    const power = Math.pow(base, x);

    powers.push(power);
  }

  const dp = Array.from({ length: n + 1 }, () => {
    return new Array(powers.length + 1).fill(-1);
  });

  const sumPower = (index, remainder) => {
    if (remainder === 0) return 1n;
    if (remainder < 0 || index >= powers.length) return 0n;
    if (dp[remainder][index] !== -1) return dp[remainder][index];
    let result = sumPower(index + 1, remainder);

    if (powers[index] <= remainder) {
      const nextRemainder = remainder - powers[index];

      result = (result + sumPower(index + 1, nextRemainder)) % MODULO;
    }

    dp[remainder][index] = result;

    return result;
  };

  return Number(sumPower(0, n));
};
```
