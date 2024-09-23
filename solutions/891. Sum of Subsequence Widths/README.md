# [891. Sum of Subsequence Widths](https://leetcode.com/problems/sum-of-subsequence-widths)

## Description

<div class="elfjS" data-track-load="description_content"><p>The <strong>width</strong> of a sequence is the difference between the maximum and minimum elements in the sequence.</p>

<p>Given an array of integers <code>nums</code>, return <em>the sum of the <strong>widths</strong> of all the non-empty <strong>subsequences</strong> of </em><code>nums</code>. Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>A <strong>subsequence</strong> is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, <code>[3,6,2,7]</code> is a subsequence of the array <code>[0,3,1,6,2,2,7]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,1,3]
<strong>Output:</strong> 6
Explanation: The subsequences are [1], [2], [3], [2,1], [2,3], [1,3], [2,1,3].
The corresponding widths are 0, 0, 0, 1, 1, 2, 2.
The sum of these widths is 6.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2]
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Math`**
- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumSubseqWidths = function(nums) {
    const MODULO = 10 ** 9 + 7;
    const n = nums.length;
    let result = 0;
    let count = 1;

    nums.sort((a, b) => a - b);

    for (let index = 0; index < n; index++) {
        const num1 = nums[index];
        const num2 = nums[n - 1 - index];

        result += (num1 - num2) * count;
        result %=  MODULO;
        count = (count * 2) % MODULO;
    }
    return result;
};
```
