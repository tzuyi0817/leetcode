# [600. Non-negative Integers without Consecutive Ones](https://leetcode.com/problems/non-negative-integers-without-consecutive-ones)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a positive integer <code>n</code>, return the number of the integers in the range <code>[0, n]</code> whose binary representations <strong>do not</strong> contain consecutive ones.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 5
<strong>Output:</strong> 5
<strong>Explanation:</strong>
Here are the non-negative integers &lt;= 5 with their corresponding binary representations:
0 : 0
1 : 1
2 : 10
3 : 11
4 : 100
5 : 101
Among them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule. 
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 1
<strong>Output:</strong> 2
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 2
<strong>Output:</strong> 3
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(logn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
var findIntegers = function(n) {
    const bits = n.toString(2);
    const size = bits.length;
    const zeros = Array(size).fill(0);
    const ones = Array(size).fill(0);

    zeros[0] = ones[0] = 1;

    for (let index = 1; index < size; index++) {
        zeros[index] = zeros[index - 1] + ones[index - 1];
        ones[index] = zeros[index - 1];
    }
    let result = zeros[size - 1] + ones[size - 1];

    for (let index = 1; index < size; index++) {
        const current = bits[index];
        const previous =  bits[index - 1];

        if (current === '1' && previous === '1') return result;
        if (current === '0' && previous === '0') {
            result -= ones[size - index - 1];
        }
    }
    return result;
};
```
