# [2843. Count Symmetric Integers](https://leetcode.com/problems/count-symmetric-integers)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two positive integers <code>low</code> and <code>high</code>.</p>

<p>An integer <code>x</code> consisting of <code>2 * n</code> digits is <strong>symmetric</strong> if the sum of the first <code>n</code> digits of <code>x</code> is equal to the sum of the last <code>n</code> digits of <code>x</code>. Numbers with an odd number of digits are never symmetric.</p>

<p>Return <em>the <strong>number of symmetric</strong> integers in the range</em> <code>[low, high]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> low = 1, high = 100
<strong>Output:</strong> 9
<strong>Explanation:</strong> There are 9 symmetric integers between 1 and 100: 11, 22, 33, 44, 55, 66, 77, 88, and 99.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> low = 1200, high = 1230
<strong>Output:</strong> 4
<strong>Explanation:</strong> There are 4 symmetric integers between 1200 and 1230: 1203, 1212, 1221, and 1230.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= low &lt;= high &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**

- Time complexity: <em>O(high-low)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
const countSymmetricIntegers = function (low, high) {
  let result = 0;

  const isSymmetric = num => {
    if (num < 10) return false;
    if (num < 100) return num % 10 === Math.floor(num / 10);
    if (num < 1000) return false;
    const left = Math.floor(num / 100);
    const right = num % 100;
    const leftSum = (left % 10) + Math.floor(left / 10);
    const rightSum = (right % 10) + Math.floor(right / 10);

    return leftSum === rightSum;
  };

  for (let num = low; num <= high; num++) {
    if (!isSymmetric(num)) continue;

    result += 1;
  }

  return result;
};
```
