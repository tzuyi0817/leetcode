# [2963. Count the Number of Good Partitions](https://leetcode.com/problems/count-the-number-of-good-partitions)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> array <code>nums</code> consisting of <strong>positive</strong> integers.</p>

<p>A partition of an array into one or more <strong>contiguous</strong> subarrays is called <strong>good</strong> if no two subarrays contain the same number.</p>

<p>Return <em>the <strong>total number</strong> of good partitions of </em><code>nums</code>.</p>

<p>Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4]
<strong>Output:</strong> 8
<strong>Explanation:</strong> The 8 possible good partitions are: ([1], [2], [3], [4]), ([1], [2], [3,4]), ([1], [2,3], [4]), ([1], [2,3,4]), ([1,2], [3], [4]), ([1,2], [3,4]), ([1,2,3], [4]), and ([1,2,3,4]).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,1,1,1]
<strong>Output:</strong> 1
<strong>Explanation:</strong> The only possible good partition is: ([1,1,1,1]).
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1,3]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The 2 possible good partitions are: ([1,2,1], [3]) and ([1,2,1,3]).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table + Combinatorics`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const numberOfGoodPartitions = function (nums) {
  const n = nums.length;
  const MODULO = 10 ** 9 + 7;
  const lastMap = new Map();
  let maxRight = 0;
  let result = 1;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    lastMap.set(num, index);
  }

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (index > maxRight) {
      result = (result * 2) % MODULO;
    }

    maxRight = Math.max(lastMap.get(num), maxRight);
  }

  return result;
};
```
