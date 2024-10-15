# [996. Number of Squareful Arrays](https://leetcode.com/problems/number-of-squareful-arrays)

## Description

<div class="elfjS" data-track-load="description_content"><p>An array is <strong>squareful</strong> if the sum of every pair of adjacent elements is a <strong>perfect square</strong>.</p>

<p>Given an integer array nums, return <em>the number of permutations of </em><code>nums</code><em> that are <strong>squareful</strong></em>.</p>

<p>Two permutations <code>perm1</code> and <code>perm2</code> are different if there is some index <code>i</code> such that <code>perm1[i] != perm2[i]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,17,8]
<strong>Output:</strong> 2
<strong>Explanation:</strong> [1,8,17] and [17,8,1] are the valid permutations.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2,2,2]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 12</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking + Bitmask`**

- Time complexity: <em>O(n!)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const numSquarefulPerms = function (nums) {
  const n = nums.length;
  let result = 0;

  const findSquarefulPrem = (last, used, length) => {
    if (length === n) {
      result += 1;
      return;
    }

    for (let index = 0; index < n; index++) {
      if ((1 << index) & used) continue;
      const num = nums[index];
      const isPreviousUsed = (1 << (index - 1)) & used;

      if (num === nums[index - 1] && !isPreviousUsed) continue;
      const sum = last + num;

      if (!Number.isInteger(Math.sqrt(sum))) continue;
      findSquarefulPrem(num, (1 << index) | used, length + 1);
    }
  };

  nums.sort((a, b) => a - b);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (num === nums[index - 1]) continue;
    findSquarefulPrem(num, 1 << index, 1);
  }
  return result;
};
```
