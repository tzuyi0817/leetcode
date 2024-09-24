# [902. Numbers At Most N Given Digit Set](https://leetcode.com/problems/numbers-at-most-n-given-digit-set)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of <code>digits</code> which is sorted in <strong>non-decreasing</strong> order. You can write numbers using each <code>digits[i]</code> as many times as we want. For example, if <code>digits = ['1','3','5']</code>, we may write numbers such as <code>'13'</code>, <code>'551'</code>, and <code>'1351315'</code>.</p>

<p>Return <em>the number of positive integers that can be generated </em>that are less than or equal to a given integer <code>n</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> digits = ["1","3","5","7"], n = 100
<strong>Output:</strong> 20
<strong>Explanation: </strong>
The 20 numbers that can be written are:
1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> digits = ["1","4","9"], n = 1000000000
<strong>Output:</strong> 29523
<strong>Explanation: </strong>
We can write 3 one digit numbers, 9 two digit numbers, 27 three digit numbers,
81 four digit numbers, 243 five digit numbers, 729 six digit numbers,
2187 seven digit numbers, 6561 eight digit numbers, and 19683 nine digit numbers.
In total, this is 29523 integers that can be written using the digits array.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> digits = ["7"], n = 8
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= digits.length &lt;= 9</code></li>
	<li><code>digits[i].length == 1</code></li>
	<li><code>digits[i]</code> is a digit from&nbsp;<code>'1'</code>&nbsp;to <code>'9'</code>.</li>
	<li>All the values in&nbsp;<code>digits</code> are <strong>unique</strong>.</li>
	<li><code>digits</code> is sorted in&nbsp;<strong>non-decreasing</strong> order.</li>
	<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
const atMostNGivenDigitSet = function (digits, n) {
  let result = 0;

  n = `${n}`;

  for (let index = 1; index < n.length; index++) {
    result += digits.length ** index;
  }

  for (let index = 0; index < n.length; index++) {
    const current = n[index];

    for (const digit of digits) {
      if (digit >= current) continue;

      result += digits.length ** (n.length - index - 1);
    }
    if (!digits.includes(current)) return result;
  }
  return result + 1;
};
```