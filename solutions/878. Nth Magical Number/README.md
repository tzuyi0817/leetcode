# [878. Nth Magical Number](https://leetcode.com/problems/nth-magical-number)

## Description

<div class="elfjS" data-track-load="description_content"><p>A positive integer is <em>magical</em> if it is divisible by either <code>a</code> or <code>b</code>.</p>

<p>Given the three integers <code>n</code>, <code>a</code>, and <code>b</code>, return the <code>n<sup>th</sup></code> magical number. Since the answer may be very large, <strong>return it modulo </strong><code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 1, a = 2, b = 3
<strong>Output:</strong> 2
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 4, a = 2, b = 3
<strong>Output:</strong> 6
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
	<li><code>2 &lt;= a, b &lt;= 4 * 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math + Binary Search`**

- Time complexity: <em>O(log(Min(a,b)\*n))</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const nthMagicalNumber = function (n, a, b) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const MODULO = 10 ** 9 + 7;
  const lcm = (a * b) / gcd(a, b);
  let left = Math.min(a, b);
  let right = n * left;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const nth = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm);

    nth >= n ? (right = mid) : (left = mid + 1);
  }
  return left % MODULO;
};
```
