# [1363. Largest Multiple of Three](https://leetcode.com/problems/largest-multiple-of-three)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of digits <code>digits</code>, return <em>the largest multiple of <strong>three</strong> that can be formed by concatenating some of the given digits in <strong>any order</strong></em>. If there is no answer return an empty string.</p>

<p>Since the answer may not fit in an integer data type, return the answer as a string. Note that the returning answer must not contain unnecessary leading zeros.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> digits = [8,1,9]
<strong>Output:</strong> "981"
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> digits = [8,6,7,1,0]
<strong>Output:</strong> "8760"
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> digits = [1]
<strong>Output:</strong> ""
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= digits.length &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= digits[i] &lt;= 9</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(10 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} digits
 * @return {string}
 */
const largestMultipleOfThree = function (digits) {
  const mod1 = [1, 4, 7, 2, 5, 8];
  const mod2 = [2, 5, 8, 1, 4, 7];
  const counts = Array.from({ length: 10 }, () => 0);
  let sum = digits.reduce((result, digit) => result + digit);

  for (const digit of digits) {
    counts[digit] += 1;
  }

  while (sum % 3) {
    const mod = sum % 3 === 1 ? mod1 : mod2;
    const removeDigit = mod.find(digit => counts[digit]);

    counts[removeDigit] -= 1;
    sum -= removeDigit;
  }
  let result = '';

  for (let digit = 9; digit >= 0; digit--) {
    result += `${digit}`.repeat(counts[digit]);
  }

  return result[0] === '0' ? '0' : result;
};
```
