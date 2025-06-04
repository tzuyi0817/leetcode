# [1755. Closest Subsequence Sum](https://leetcode.com/problems/closest-subsequence-sum)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code> and an integer <code>goal</code>.</p>

<p>You want to choose a subsequence of <code>nums</code> such that the sum of its elements is the closest possible to <code>goal</code>. That is, if the sum of the subsequence's elements is <code>sum</code>, then you want to <strong>minimize the absolute difference</strong> <code>abs(sum - goal)</code>.</p>

<p>Return <em>the <strong>minimum</strong> possible value of</em> <code>abs(sum - goal)</code>.</p>

<p>Note that a subsequence of an array is an array formed by removing some elements <strong>(possibly all or none)</strong> of the original array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [5,-7,3,5], goal = 6
<strong>Output:</strong> 0
<strong>Explanation:</strong> Choose the whole array as a subsequence, with a sum of 6.
This is equal to the goal, so the absolute difference is 0.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [7,-9,15,-2], goal = -5
<strong>Output:</strong> 1
<strong>Explanation:</strong> Choose the subsequence [7,-9,-2], with a sum of -4.
The absolute difference is abs(-4 - (-5)) = abs(1) = 1, which is the minimum.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3], goal = -7
<strong>Output:</strong> 7
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 40</code></li>
	<li><code>-10<sup>7</sup> &lt;= nums[i] &lt;= 10<sup>7</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= goal &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search + Binary Search`**

- Time complexity: <em>O(n\*2<sup>n/2</sup>)</em>
- Space complexity: <em>O(2<sup>n/2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
const minAbsDifference = function (nums, goal) {
  const n = nums.length;
  const half = Math.floor(n / 2);
  const lNums = nums.slice(0, half);
  const rNums = nums.slice(half, n);
  let lSums = new Set();
  let rSums = new Set();
  let result = Number.MAX_SAFE_INTEGER;

  const getSums = (values, index, sum, sums) => {
    if (index >= values.length) {
      sums.add(sum);
      return;
    }
    const value = values[index];

    getSums(values, index + 1, sum, sums);
    getSums(values, index + 1, sum + value, sums);
  };

  getSums(lNums, 0, 0, lSums);
  getSums(rNums, 0, 0, rSums);
  lSums = [...lSums];
  rSums = [...rSums].sort((a, b) => a - b);

  const findFirstGreaterEqual = (sums, target) => {
    let left = 0;
    let right = sums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      sums[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (const sum of lSums) {
    const index = findFirstGreaterEqual(rSums, goal - sum);

    if (index < rSums.length) {
      result = Math.min(Math.abs(goal - sum - rSums[index]), result);
    }

    if (index > 0) {
      result = Math.min(Math.abs(goal - sum - rSums[index - 1]), result);
    }
  }

  return result;
};
```
