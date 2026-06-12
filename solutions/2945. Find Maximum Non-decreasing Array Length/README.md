# [2943. Maximize Area of Square Hole in Grid](https://leetcode.com/problems/find-maximum-non-decreasing-array-length)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code>.</p>

<p>You can perform any number of operations, where each operation involves selecting a <strong>subarray</strong> of the array and replacing it with the <strong>sum</strong> of its elements. For example, if the given array is <code>[1,3,5,6]</code> and you select subarray <code>[3,5]</code> the array will convert to <code>[1,8,6]</code>.</p>

<p>Return <em>the </em><strong><em>maximum</em></strong><em> length of a </em><strong><em>non-decreasing</em></strong><em> array that can be made after applying operations.</em></p>

<p>A <strong>subarray</strong> is a contiguous <strong>non-empty</strong> sequence of elements within an array.</p>

<p>&nbsp;</p>
<p><strong>Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [5,2,2]
<strong>Output:</strong> 1
<strong>Explanation:</strong> This array with length 3 is not non-decreasing.
We have two ways to make the array length two.
First, choosing subarray [2,2] converts the array to [5,4].
Second, choosing subarray [5,2] converts the array to [7,2].
In these two ways the array is not non-decreasing.
And if we choose subarray [5,2,2] and replace it with [9] it becomes non-decreasing. 
So the answer is 1.
</pre>

<p><strong>Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4]
<strong>Output:</strong> 4
<strong>Explanation:</strong> The array is non-decreasing. So the answer is 4.
</pre>

<p><strong>Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [4,3,2,6]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Replacing [3,2] with [5] converts the given array to [4,5,6] that is non-decreasing.
Because the given array is not non-decreasing, the maximum possible answer is 3.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Binary Search + Dynamic Programming`**

- Time complexity: <em>O(nlign)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaximumLength = function (nums) {
  const n = nums.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0);
  const dp = Array.from({ length: n + 1 }, () => 0);
  const bestLeft = Array.from({ length: n + 2 }, () => 0);

  for (let index = 1; index <= n; index++) {
    prefixSum[index] = prefixSum[index - 1] + nums[index - 1];
  }

  const findFirstGreaterEqual = target => {
    let left = 0;
    let right = n;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      prefixSum[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (let index = 1; index <= n; index++) {
    bestLeft[index] = Math.max(bestLeft[index], bestLeft[index - 1]);

    const l = bestLeft[index];
    const target = prefixSum[index] * 2 - prefixSum[l];
    const r = findFirstGreaterEqual(target);

    dp[index] = dp[l] + 1;

    if (r < bestLeft.length) {
      bestLeft[r] = index;
    }
  }

  return dp[n];
};
```
