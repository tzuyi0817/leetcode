# [1608. Special Array With X Elements Greater Than or Equal X](https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>nums</code> of non-negative integers. <code>nums</code> is considered <strong>special</strong> if there exists a number <code>x</code> such that there are <strong>exactly</strong> <code>x</code> numbers in <code>nums</code> that are <strong>greater than or equal to</strong> <code>x</code>.</p>

<p>Notice that <code>x</code> <strong>does not</strong> have to be an element in <code>nums</code>.</p>

<p>Return <code>x</code> <em>if the array is <strong>special</strong>, otherwise, return </em><code>-1</code>. It can be proven that if <code>nums</code> is special, the value for <code>x</code> is <strong>unique</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [3,5]
<strong>Output:</strong> 2
<strong>Explanation:</strong> There are 2 values (3 and 5) that are greater than or equal to 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [0,0]
<strong>Output:</strong> -1
<strong>Explanation:</strong> No numbers fit the criteria for x.
If x = 0, there should be 0 numbers &gt;= x, but there are 2.
If x = 1, there should be 1 number &gt;= x, but there are 0.
If x = 2, there should be 2 numbers &gt;= x, but there are 0.
x cannot be greater since there are only 2 numbers in nums.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [0,4,3,0,4]
<strong>Output:</strong> 3
<strong>Explanation:</strong> There are 3 values that are greater than or equal to 3.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 100</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const specialArray = function (nums) {
  const n = nums.length;
  const findGreaterCount = x => {
    let left = 0;
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] >= x ? (left = mid + 1) : (right = mid - 1);
    }
    return left;
  };

  nums.sort((a, b) => b - a);

  for (let x = 1; x <= n; x++) {
    if (x === findGreaterCount(x)) return x;
  }
  return -1;
};
```
