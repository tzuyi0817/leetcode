# [869. Reordered Power of 2](https://leetcode.com/problems/reordered-power-of-2)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer <code>n</code>. We reorder the digits in any order (including the original order) such that the leading digit is not zero.</p>

<p>Return <code>true</code> <em>if and only if we can do this so that the resulting number is a power of two</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> true
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 10
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Bit Manipulation`**

- Time complexity: <em>O(1)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {boolean}
 */
const reorderedPowerOf2 = function (n) {
  const counter = num => {
    let result = 0;

    while (num) {
      result += Math.pow(10, num % 10);
      num = Math.floor(num / 10);
    }

    return result;
  };

  const count = counter(n);

  for (let index = 0; index < 30; index++) {
    const num = 1 << index;

    if (counter(num) === count) return true;
  }

  return false;
};
```
