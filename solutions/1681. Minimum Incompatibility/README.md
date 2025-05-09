# [1681. Minimum Incompatibility](https://leetcode.com/problems/minimum-incompatibility)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code>​​​ and an integer <code>k</code>. You are asked to distribute this array into <code>k</code> subsets of <strong>equal size</strong> such that there are no two equal elements in the same subset.</p>

<p>A subset's <strong>incompatibility</strong> is the difference between the maximum and minimum elements in that array.</p>

<p>Return <em>the <strong>minimum possible sum of incompatibilities</strong> of the </em><code>k</code> <em>subsets after distributing the array optimally, or return </em><code>-1</code><em> if it is not possible.</em></p>

<p>A subset is a group integers that appear in the array with no particular order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1,4], k = 2
<strong>Output:</strong> 4
<strong>Explanation:</strong> The optimal distribution of subsets is [1,2] and [1,4].
The incompatibility is (2-1) + (4-1) = 4.
Note that [1,1] and [2,4] would result in a smaller sum, but the first subset contains 2 equal elements.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [6,3,8,1,3,1,2,2], k = 4
<strong>Output:</strong> 6
<strong>Explanation:</strong> The optimal distribution of subsets is [1,2], [2,3], [6,8], and [1,3].
The incompatibility is (2-1) + (3-2) + (8-6) + (3-1) = 6.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [5,3,3,6,3,3], k = 3
<strong>Output:</strong> -1
<strong>Explanation:</strong> It is impossible to distribute nums into 3 subsets where no two elements are equal in the same subset.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= nums.length &lt;= 16</code></li>
	<li><code>nums.length</code> is divisible by <code>k</code></li>
	<li><code>1 &lt;= nums[i] &lt;= nums.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(2<sup>n</sup>\*n)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minimumIncompatibility = function (nums, k) {
  const n = nums.length;
  const totalMask = 1 << n;
  const subsetSize = n / k;
  const subsetMap = new Map();
  const dp = Array.from({ length: totalMask }, () => -1);

  const isValidSubsetSize = mask => {
    let count = 0;

    while (mask) {
      count += mask & 1;

      if (count > subsetSize) return false;

      mask >>= 1;
    }

    return count === subsetSize;
  };

  const getIncompatibility = mask => {
    if (!isValidSubsetSize(mask)) return -1;
    const visited = new Set();
    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;

    for (let index = 0; index < n; index++) {
      if ((mask & (1 << index)) === 0) continue;
      const num = nums[index];

      if (visited.has(num)) return -1;

      visited.add(num);
      min = Math.min(num, min);
      max = Math.max(num, max);
    }

    return max - min;
  };

  for (let mask = 0; mask < totalMask; mask++) {
    const incompatibility = getIncompatibility(mask);

    if (incompatibility === -1) continue;

    subsetMap.set(mask, incompatibility);
  }

  const distributeSubset = mask => {
    if (mask === totalMask - 1) return 0;
    if (dp[mask] !== -1) return dp[mask];
    let result = Number.MAX_SAFE_INTEGER;

    for (const [subset, incompatibility] of subsetMap) {
      if (subset & mask) continue;
      const sum = incompatibility + distributeSubset(mask | subset);

      result = Math.min(sum, result);
    }

    dp[mask] = result;

    return result;
  };

  const result = distributeSubset(0);

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
```
