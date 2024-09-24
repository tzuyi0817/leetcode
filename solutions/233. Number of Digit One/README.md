# [233. Number of Digit One](https://leetcode.com/problems/number-of-digit-one)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer <code>n</code>, count <em>the total number of digit </em><code>1</code><em> appearing in all non-negative integers less than or equal to</em> <code>n</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 13
<strong>Output:</strong> 6
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 0
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Recursion`**

- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(logn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const countDigitOne = function (n) {
  const sumCount = num => {
    if (num < 1) return 0;
    let first = num;
    let digits = 1;
    let rest = 0;

    while (first >= 10) {
      first = Math.floor(first / 10);
      digits *= 10;
    }
    rest = num % digits;

    const result = first * sumCount(digits - 1) + sumCount(rest);

    return result + (first === 1 ? rest + 1 : digits);
  };

  return sumCount(n);
};
```
