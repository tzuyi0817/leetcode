# [1399. Count Largest Group](https://leetcode.com/problems/count-largest-group)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer <code>n</code>.</p>

<p>Each number from <code>1</code> to <code>n</code> is grouped according to the sum of its digits.</p>

<p>Return <em>the number of groups that have the largest size</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 13
<strong>Output:</strong> 4
<strong>Explanation:</strong> There are 9 groups in total, they are grouped according sum of its digits of numbers from 1 to 13:
[1,10], [2,11], [3,12], [4,13], [5], [6], [7], [8], [9].
There are 4 groups with largest size.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> 2
<strong>Explanation:</strong> There are 2 groups [1], [2] of size 1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const countLargestGroup = function (n) {
  const sumMap = new Map();
  let largestSize = 0;
  let result = 0;

  const getDigitsSum = num => {
    let result = 0;

    while (num) {
      result += num % 10;
      num = Math.floor(num / 10);
    }

    return result;
  };

  for (let num = 1; num <= n; num++) {
    const sum = getDigitsSum(num);
    const size = sumMap.get(sum) ?? 0;

    sumMap.set(sum, size + 1);
    largestSize = Math.max(size + 1, largestSize);
  }

  for (const size of sumMap.values()) {
    if (size === largestSize) result += 1;
  }

  return result;
};
```
