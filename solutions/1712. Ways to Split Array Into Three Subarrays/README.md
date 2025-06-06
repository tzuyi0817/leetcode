# [1712. Ways to Split Array Into Three Subarrays](https://leetcode.com/problems/ways-to-split-array-into-three-subarrays)

## Description

<div class="xFUwe" data-track-load="description_content"><p>A split of an integer array is <strong>good</strong> if:</p>

<ul>
	<li>The array is split into three <strong>non-empty</strong> contiguous subarrays - named <code>left</code>, <code>mid</code>, <code>right</code> respectively from left to right.</li>
	<li>The sum of the elements in <code>left</code> is less than or equal to the sum of the elements in <code>mid</code>, and the sum of the elements in <code>mid</code> is less than or equal to the sum of the elements in <code>right</code>.</li>
</ul>

<p>Given <code>nums</code>, an array of <strong>non-negative</strong> integers, return <em>the number of <strong>good</strong> ways to split</em> <code>nums</code>. As the number may be too large, return it <strong>modulo</strong> <code>10<sup>9 </sup>+ 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,1,1]
<strong>Output:</strong> 1
<strong>Explanation:</strong> The only good way to split nums is [1] [1] [1].</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,2,2,5,0]
<strong>Output:</strong> 3
<strong>Explanation:</strong> There are three good ways of splitting nums:
[1] [2] [2,2,5,0]
[1] [2,2] [2,5,0]
[1,2] [2,2] [5,0]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [3,2,1]
<strong>Output:</strong> 0
<strong>Explanation:</strong> There is no good way to split nums.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Two Pointers`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const waysToSplit = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const prefixSum = [nums[0]];
  const size = nums.length;
  let mid = 0;
  let right = 0;
  let result = 0;

  for (let index = 1; index < size; index++) {
    prefixSum[index] = prefixSum[index - 1] + nums[index];
  }
  for (let index = 0; index < size - 2; index++) {
    const current = prefixSum[index];

    mid = Math.max(index + 1, mid);
    while (mid < size - 1 && prefixSum[mid] - current < current) mid += 1;
    right = Math.max(mid, right);
    while (right < size - 1 && prefixSum[right] - current <= prefixSum.at(-1) - prefixSum[right]) {
      right += 1;
    }
    result += right - mid;
    result %= MODULO;
  }
  return result;
};
```
