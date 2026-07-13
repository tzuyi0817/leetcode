# [1291. Sequential Digits](https://leetcode.com/problems/sequential-digits)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>An&nbsp;integer has <em>sequential digits</em> if and only if each digit in the number is one more than the previous digit.</p>

<p>Return a <strong>sorted</strong> list of all the integers&nbsp;in the range <code>[low, high]</code>&nbsp;inclusive that have sequential digits.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> low = 100, high = 300
<strong>Output:</strong> [123,234]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> low = 1000, high = 13000
<strong>Output:</strong> [1234,2345,3456,4567,5678,6789,12345]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>10 &lt;= low &lt;= high &lt;= 10^9</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(36 -> 1)</em>
- Space complexity: <em>O(9 -> 1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
const sequentialDigits = function (low, high) {
  const result = [];
  let queue = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  while (queue.length) {
    const nextQueue = [];

    for (const num of queue) {
      if (num > high) continue;

      if (num >= low) {
        result.push(num);
      }

      const prev = num % 10;
      const nextDigit = prev + 1;

      if (nextDigit > 9) continue;

      nextQueue.push(num * 10 + nextDigit);
    }

    queue = nextQueue;
  }

  return result;
};
```
