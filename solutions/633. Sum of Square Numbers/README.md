# [633. Sum of Square Numbers](https://leetcode.com/problems/sum-of-square-numbers)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a non-negative integer <code>c</code>, decide whether there're two integers <code>a</code> and <code>b</code> such that <code>a<sup>2</sup> + b<sup>2</sup> = c</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> c = 5
<strong>Output:</strong> true
<strong>Explanation:</strong> 1 * 1 + 2 * 2 = 5
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> c = 3
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= c &lt;= 2<sup>31</sup> - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Two Pointers`**
- Time complexity: <em>O(Math.sqrt(c))</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    let left = 0;
    let right = Math.floor(Math.sqrt(c));

    while (left <= right) {
        const sum = left ** 2 + right ** 2;

        if (sum === c) return true;
        sum > c ? right -= 1 : left += 1;
    }
    return false;
};
```
