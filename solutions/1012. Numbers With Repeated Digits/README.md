# [1012. Numbers With Repeated Digits](https://leetcode.com/problems/numbers-with-repeated-digits)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer <code>n</code>, return <em>the number of positive integers in the range </em><code>[1, n]</code><em> that have <strong>at least one</strong> repeated digit</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 20
<strong>Output:</strong> 1
<strong>Explanation:</strong> The only positive number (&lt;= 20) with at least 1 repeated digit is 11.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 100
<strong>Output:</strong> 10
<strong>Explanation:</strong> The positive numbers (&lt;= 100) with atleast 1 repeated digit are 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 1000
<strong>Output:</strong> 262
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
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
 * @param {number} n
 * @return {number}
 */
const numDupDigitsAtMostN = function (n) {
  const nums = `${n + 1}`.split('').map(Number);
  let result = 0;

  const specialCount = (count, digits) => {
    if (digits === 0) return 1;

    return specialCount(count, digits - 1) * (count - digits + 1);
  };

  for (let digits = 1; digits < nums.length; digits++) {
    result += 9 * specialCount(9, digits - 1);
  }

  const seen = new Set();

  for (let index = 0; index < nums.length; index++) {
    for (let num = index > 0 ? 0 : 1; num < nums[index]; num++) {
      if (seen.has(num)) continue;

      result += specialCount(9 - index, nums.length - index - 1);
    }

    if (seen.has(nums[index])) break;
    seen.add(nums[index]);
  }

  return n - result;
};
```
