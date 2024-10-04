# [992. Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the number of <strong>good subarrays</strong> of </em><code>nums</code>.</p>

<p>A <strong>good array</strong> is an array where the number of different integers in that array is exactly <code>k</code>.</p>

<ul>
	<li>For example, <code>[1,2,3,1,2]</code> has <code>3</code> different integers: <code>1</code>, <code>2</code>, and <code>3</code>.</li>
</ul>

<p>A <strong>subarray</strong> is a <strong>contiguous</strong> part of an array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1,2,3], k = 2
<strong>Output:</strong> 7
<strong>Explanation:</strong> Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1,3,4], k = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i], k &lt;= nums.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sliding Window`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysWithKDistinct = function (nums, k) {
  const n = nums.length;

  const subarraysWithMostDistinct = m => {
    const counts = Array(n + 1).fill(0);
    let left = 0;
    let result = 0;

    for (let index = 0; index < n; index++) {
      const num = nums[index];

      counts[num] += 1;
      if (counts[num] === 1) m -= 1;

      while (m < 0) {
        counts[nums[left]] -= 1;
        if (!counts[nums[left]]) m += 1;

        left += 1;
      }
      result += index - left + 1;
    }
    return result;
  };

  return subarraysWithMostDistinct(k) - subarraysWithMostDistinct(k - 1);
};
```
