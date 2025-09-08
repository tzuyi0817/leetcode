# [1317. Convert Integer to the Sum of Two No-Zero Integers](https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers)

## Description

<div class="elfjS" data-track-load="description_content"><p><strong>No-Zero integer</strong> is a positive integer that <strong>does not contain any <code>0</code></strong> in its decimal representation.</p>

<p>Given an integer <code>n</code>, return <em>a list of two integers</em> <code>[a, b]</code> <em>where</em>:</p>

<ul>
	<li><code>a</code> and <code>b</code> are <strong>No-Zero integers</strong>.</li>
	<li><code>a + b = n</code></li>
</ul>

<p>The test cases are generated so that there is at least one valid solution. If there are many valid solutions, you can return any of them.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> [1,1]
<strong>Explanation:</strong> Let a = 1 and b = 1.
Both a and b are no-zero integers, and a + b = 2 = n.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 11
<strong>Output:</strong> [2,9]
<strong>Explanation:</strong> Let a = 2 and b = 9.
Both a and b are no-zero integers, and a + b = 11 = n.
Note that there are other valid answers as [8, 3] that can be accepted.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number[]}
 */
const getNoZeroIntegers = function (n) {
  let a = 0;
  let b = 0;
  let carry = 0;
  let digit = 0;

  while (n) {
    let num = (n % 10) - carry;

    n = Math.floor(n / 10);

    if (num < 0) {
      num += 10;
      n -= 1;
    }

    if (n <= 0 && num <= 0) return [a, b];

    if (num === 1 && n) {
      a += 2 * 10 ** digit;
      b += 9 * 10 ** digit;
      carry = 1;
    } else if (num === 0) {
      a += 5 * 10 ** digit;
      b += 5 * 10 ** digit;
      carry = 1;
    } else {
      const half = Math.floor(num / 2);

      a += half * 10 ** digit;
      b += (num - half) * 10 ** digit;
      carry = 0;
    }

    digit += 1;
  }

  return [a, b];
};
```
