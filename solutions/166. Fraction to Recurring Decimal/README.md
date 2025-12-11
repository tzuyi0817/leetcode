# [166. Fraction to Recurring Decimal](https://leetcode.com/problems/fraction-to-recurring-decimal)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two integers representing the <code>numerator</code> and <code>denominator</code> of a fraction, return <em>the fraction in string format</em>.</p>

<p>If the fractional part is repeating, enclose the repeating part in parentheses.</p>

<p>If multiple answers are possible, return <strong>any of them</strong>.</p>

<p>It is <strong>guaranteed</strong> that the length of the answer string is less than <code>10<sup>4</sup></code> for all the given inputs.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> numerator = 1, denominator = 2
<strong>Output:</strong> "0.5"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> numerator = 2, denominator = 1
<strong>Output:</strong> "2"
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> numerator = 4, denominator = 333
<strong>Output:</strong> "0.(012)"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>-2<sup>31</sup> &lt;=&nbsp;numerator, denominator &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>denominator != 0</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
const fractionToDecimal = function (numerator, denominator) {
  if (numerator === 0) return '0';

  let result = '';

  if (Math.sign(numerator) !== Math.sign(denominator)) {
    result += '-';
  }

  const den = Math.abs(denominator);
  let num = Math.abs(numerator);

  result += Math.floor(num / den);
  num %= den;

  if (num === 0) return result;

  const numMap = new Map();

  result += '.';

  while (num) {
    if (numMap.has(num)) {
      const index = numMap.get(num);

      return `${result.slice(0, index)}(${result.slice(index)})`;
    }

    numMap.set(num, result.length);
    num *= 10;
    result += Math.floor(num / den);
    num %= den;
  }

  return result;
};
```
