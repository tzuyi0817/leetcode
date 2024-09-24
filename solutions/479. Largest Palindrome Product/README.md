# [479. Largest Palindrome Product](https://leetcode.com/problems/largest-palindrome-product)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer n, return <em>the <strong>largest palindromic integer</strong> that can be represented as the product of two <code>n</code>-digits integers</em>. Since the answer can be very large, return it <strong>modulo</strong> <code>1337</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> 987
Explanation: 99 x 91 = 9009, 9009 % 1337 = 987
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 9
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 8</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(10<sup>n</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const largestPalindrome = function (n) {
  const MODULO = 1337n;
  const maximum = BigInt(10 ** n - 1);
  const minimum = BigInt(10 ** (n - 1));

  for (let num = maximum; num >= minimum; num -= 1n) {
    const str = `${num}`;
    let palindrome = str;

    for (let index = str.length - 1; index >= 0; index--) {
      palindrome += str[index];
    }
    palindrome = BigInt(palindrome);

    for (let current = maximum; current ** 2n > palindrome; current -= 1n) {
      if (palindrome % current) continue;
      return palindrome % MODULO;
    }
  }
  return 9;
};
```
