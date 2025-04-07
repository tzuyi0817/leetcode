# [416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code>, return <code>true</code> <em>if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or </em><code>false</code><em> otherwise</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,5,11,5]
<strong>Output:</strong> true
<strong>Explanation:</strong> The array can be partitioned as [1, 5, 5] and [11].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,5]
<strong>Output:</strong> false
<strong>Explanation:</strong> The array cannot be partitioned into equal sum subsets.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 200</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 100</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n\*SUM(nums)/2)</em>
- Space complexity: <em>O(SUM(nums)/2)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canPartition = function (nums) {
  const totalSum = nums.reduce((sum, num) => sum + num);

  if (totalSum % 2) return false;
  const subsetSum = totalSum / 2;
  const dp = Array.from({ length: subsetSum + 1 }, () => false);

  dp[0] = true;

  for (const num of nums) {
    for (let sum = subsetSum; sum >= num; sum--) {
      dp[sum] = dp[sum - num] || dp[sum];
    }
  }

  return dp[subsetSum];
};
```
