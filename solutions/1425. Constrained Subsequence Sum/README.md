# [1425. Constrained Subsequence Sum](https://leetcode.com/problems/constrained-subsequence-sum)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the maximum sum of a <strong>non-empty</strong> subsequence of that array such that for every two <strong>consecutive</strong> integers in the subsequence, <code>nums[i]</code> and <code>nums[j]</code>, where <code>i &lt; j</code>, the condition <code>j - i &lt;= k</code> is satisfied.</p>

<p>A <em>subsequence</em> of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [10,2,-10,5,20], k = 2
<strong>Output:</strong> 37
<b>Explanation:</b> The subsequence is [10, 2, 5, 20].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [-1,-2,-3], k = 1
<strong>Output:</strong> -1
<b>Explanation:</b> The subsequence must be non-empty, so we choose the largest number.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [10,-2,-10,-5,20], k = 2
<strong>Output:</strong> 23
<b>Explanation:</b> The subsequence is [10, -2, -5, 20].
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Deque`**

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
const constrainedSubsetSum = function (nums, k) {
  const n = nums.length;
  const dp = [...nums];
  const deque = [];
  let result = Number.MIN_SAFE_INTEGER;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (deque.length && index - deque[0] > k) {
      deque.shift();
    }

    if (deque.length) {
      dp[index] = Math.max(dp[index], dp[deque[0]] + num);
    }

    result = Math.max(dp[index], result);

    while (deque.length && dp[deque.at(-1)] < dp[index]) {
      deque.pop();
    }

    deque.push(index);
  }

  return result;
};
```
