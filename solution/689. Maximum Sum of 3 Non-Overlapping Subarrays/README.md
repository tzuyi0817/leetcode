# [689. Maximum Sum of 3 Non-Overlapping Subarrays](https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code> and an integer <code>k</code>, find three non-overlapping subarrays of length <code>k</code> with maximum sum and return them.</p>

<p>Return the result as a list of indices representing the starting position of each interval (<strong>0-indexed</strong>). If there are multiple answers, return the lexicographically smallest one.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1,2,6,7,5,1], k = 2
<strong>Output:</strong> [0,3,5]
<strong>Explanation:</strong> Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1,2,1,2,1,2,1], k = 2
<strong>Output:</strong> [0,2,4]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;&nbsp;2<sup>16</sup></code></li>
	<li><code>1 &lt;= k &lt;= floor(nums.length / 3)</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Dynamic Programming`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function(nums, k) {
    const n = nums.length;
    const prefixSum = Array(n).fill(0);
    const leftDp = Array(n).fill(0);
    const rightDp = Array(n).fill(n - k);

    prefixSum[-1] = 0;

    for (let index = 0; index < n; index++) {
        prefixSum[index] = prefixSum[index - 1] + nums[index];
    }
    const getSubSum = (index) => prefixSum[index + k - 1] - prefixSum[index - 1];
    let maxSum = prefixSum[k - 1];

    for (let index = 1; index < n; index++) {
        const currentSum = getSubSum(index);

        if (currentSum > maxSum) {
            maxSum = currentSum;
            leftDp[index] = index;
            continue;
        }
        leftDp[index] = leftDp[index - 1];
    }
    maxSum = prefixSum[n - 1] - prefixSum[n - k - 1];

    for (let index = n - k - 1; index >= 0; index--) {
        const currentSum = getSubSum(index);

        if (currentSum >= maxSum) {
            maxSum = currentSum;
            rightDp[index] = index;
            continue;
        }
        rightDp[index] = rightDp[index + 1];
    }
    let result = [];

    maxSum = 0;

    for (let index = k ; index <= n - k * 2; index++) {
        const left = leftDp[index - k];
        const right = rightDp[index + k];
        const sum = getSubSum(left) + getSubSum(index) + getSubSum(right);

        if (sum <= maxSum) continue;
        result = [left, index, right];
        maxSum = sum;
    }
    return result;
};
```
