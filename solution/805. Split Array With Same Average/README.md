# [805. Split Array With Same Average](https://leetcode.com/problems/split-array-with-same-average)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code>.</p>

<p>You should move each element of <code>nums</code> into one of the two arrays <code>A</code> and <code>B</code> such that <code>A</code> and <code>B</code> are non-empty, and <code>average(A) == average(B)</code>.</p>

<p>Return <code>true</code> if it is possible to achieve that and <code>false</code> otherwise.</p>

<p><strong>Note</strong> that for an array <code>arr</code>, <code>average(arr)</code> is the sum of all the elements of <code>arr</code> over the length of <code>arr</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4,5,6,7,8]
<strong>Output:</strong> true
<strong>Explanation:</strong> We can split the array into [1,4,5,8] and [2,3,6,7], and both of them have an average of 4.5.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,1]
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 30</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n<sup>2</sup>*2<sup>n</sup>)</em>
- Space complexity: <em>O(n*2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var splitArraySameAverage = function(nums) {
    const n = nums.length;
    const sum = nums.reduce((result, num) => result + num);

    /* 
        sum / n === sum1 / count1 === sum2 / (n - count1)

        => sum1 = sum * count1 / n
        => sum * count1 % n === 0
    **/

    const sums = Array(n).fill('').map(_ => new Set());

    sums[0].add(0);

    for (const num of nums) {
        for (let count = n - 1; count > 0; count--) {
            const target = sum * count / n;

            for (const previous of sums[count - 1]) {
                const current = previous + num;

                sums[count].add(current);
                if (sum * count % n !== 0) continue;
                if (current === target) return true;
            }
        }
    }
    return false;
};
```
