# [2419. Longest Subarray With Maximum Bitwise AND](https://leetcode.com/problems/longest-subarray-with-maximum-bitwise-and)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code> of size <code>n</code>.</p>

<p>Consider a <strong>non-empty</strong> subarray from <code>nums</code> that has the <strong>maximum</strong> possible <strong>bitwise AND</strong>.</p>

<ul>
	<li>In other words, let <code>k</code> be the maximum value of the bitwise AND of <strong>any</strong> subarray of <code>nums</code>. Then, only subarrays with a bitwise AND equal to <code>k</code> should be considered.</li>
</ul>

<p>Return <em>the length of the <strong>longest</strong> such subarray</em>.</p>

<p>The bitwise AND of an array is the bitwise AND of all the numbers in it.</p>

<p>A <strong>subarray</strong> is a contiguous sequence of elements within an array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,3,2,2]
<strong>Output:</strong> 2
<strong>Explanation:</strong>
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4]
<strong>Output:</strong> 1
<strong>Explanation:</strong>
The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const longestSubarray = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  let length = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num === maxNum) {
      length += 1;
    } else {
      length = 0;
    }

    result = Math.max(length, result);
  }

  return result;
};
```
