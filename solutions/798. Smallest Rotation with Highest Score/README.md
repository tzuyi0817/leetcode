# [798. Smallest Rotation with Highest Score](https://leetcode.com/problems/smallest-rotation-with-highest-score)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>nums</code>. You can rotate it by a non-negative integer <code>k</code> so that the array becomes <code>[nums[k], nums[k + 1], ... nums[nums.length - 1], nums[0], nums[1], ..., nums[k-1]]</code>. Afterward, any entries that are less than or equal to their index are worth one point.</p>

<ul>
	<li>For example, if we have <code>nums = [2,4,1,3,0]</code>, and we rotate by <code>k = 2</code>, it becomes <code>[1,3,0,2,4]</code>. This is worth <code>3</code> points because <code>1 &gt; 0</code> [no points], <code>3 &gt; 1</code> [no points], <code>0 &lt;= 2</code> [one point], <code>2 &lt;= 3</code> [one point], <code>4 &lt;= 4</code> [one point].</li>
</ul>

<p>Return <em>the rotation index </em><code>k</code><em> that corresponds to the highest score we can achieve if we rotated </em><code>nums</code><em> by it</em>. If there are multiple answers, return the smallest such index <code>k</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,3,1,4,0]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Scores for each k are listed below: 
k = 0,  nums = [2,3,1,4,0],    score 2
k = 1,  nums = [3,1,4,0,2],    score 3
k = 2,  nums = [1,4,0,2,3],    score 3
k = 3,  nums = [4,0,2,3,1],    score 4
k = 4,  nums = [0,2,3,1,4],    score 3
So we should choose k = 3, which has the highest score.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,3,0,2,4]
<strong>Output:</strong> 0
<strong>Explanation:</strong> nums will always have 3 points no matter how it shifts.
So we will choose the smallest k, which is 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= nums[i] &lt; nums.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const bestRotation = function (nums) {
  const n = nums.length;
  const change = new Array(n).fill(0);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    change[(index - num + n + 1) % n] -= 1;
  }
  for (let index = 1; index < n; index++) {
    change[index] += change[index - 1] + 1;

    if (change[index] <= change[result]) continue;
    result = index;
  }
  return result;
};
```
