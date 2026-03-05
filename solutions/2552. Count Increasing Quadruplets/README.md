# [2552. Count Increasing Quadruplets](https://leetcode.com/problems/count-increasing-quadruplets)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a <strong>0-indexed</strong> integer array <code>nums</code> of size <code>n</code> containing all numbers from <code>1</code> to <code>n</code>, return <em>the number of increasing quadruplets</em>.</p>

<p>A quadruplet <code>(i, j, k, l)</code> is increasing if:</p>

<ul>
	<li><code>0 &lt;= i &lt; j &lt; k &lt; l &lt; n</code>, and</li>
	<li><code>nums[i] &lt; nums[k] &lt; nums[j] &lt; nums[l]</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,3,2,4,5]
<strong>Output:</strong> 2
<strong>Explanation:</strong> 
- When i = 0, j = 1, k = 2, and l = 3, nums[i] &lt; nums[k] &lt; nums[j] &lt; nums[l].
- When i = 0, j = 1, k = 2, and l = 4, nums[i] &lt; nums[k] &lt; nums[j] &lt; nums[l]. 
There are no other quadruplets, so we return 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4]
<strong>Output:</strong> 0
<strong>Explanation:</strong> There exists only one quadruplet with i = 0, j = 1, k = 2, l = 3, but since nums[j] &lt; nums[k], we return 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>4 &lt;= nums.length &lt;= 4000</code></li>
	<li><code>1 &lt;= nums[i] &lt;= nums.length</code></li>
	<li>All the integers of <code>nums</code> are <strong>unique</strong>. <code>nums</code> is a permutation.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const countQuadruplets = function (nums) {
  const n = nums.length;
  const dp = Array.from({ length: n }, () => 0);
  let result = 0;

  for (let k = 2; k < n; k++) {
    let lessThanK = 0;

    for (let j = 0; j < k; j++) {
      if (nums[j] < nums[k]) {
        lessThanK += 1;
        result += dp[j];
      } else {
        dp[j] += lessThanK;
      }
    }
  }

  return result;
};
```
