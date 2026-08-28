# [3177. Find the Maximum Length of a Good Subsequence II](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an integer array <code>nums</code> and a <strong>non-negative</strong> integer <code>k</code>. A sequence of integers <code>seq</code> is called <strong>good</strong> if there are <strong>at most</strong> <code>k</code> indices <code>i</code> in the range <code>[0, seq.length - 2]</code> such that <code>seq[i] != seq[i + 1]</code>.</p>

<p>Return the <strong>maximum</strong> possible length of a <strong>good</strong> <span data-keyword="subsequence-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1a_" data-state="closed" class="">subsequence</button></span> of <code>nums</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,1,1,3], k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The maximum length subsequence is <code>[<u>1</u>,<u>2</u>,<u>1</u>,<u>1</u>,3]</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,4,5,1], k = 0</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>The maximum length subsequence is <code>[<u>1</u>,2,3,4,5,<u>1</u>]</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>3</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= k &lt;= min(50, nums.length)</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nk)</em>
- Space complexity: <em>O(nk)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumLength = function (nums, k) {
  const dp = Array.from({ length: k + 1 }, () => new Map());
  const maxLen = Array.from({ length: k + 1 }, () => 0);

  for (const num of nums) {
    for (let count = k; count >= 0; count--) {
      const countMap = dp[count];
      let len = 1 + (countMap.get(num) ?? 0);

      if (count > 0) {
        len = Math.max(len, 1 + maxLen[count - 1]);
      }

      countMap.set(num, len);
      maxLen[count] = Math.max(len, maxLen[count]);
    }
  }

  return maxLen[k];
};
```
