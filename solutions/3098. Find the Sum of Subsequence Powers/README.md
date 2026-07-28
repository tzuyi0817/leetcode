# [3098. Find the Sum of Subsequence Powers](https://leetcode.com/problems/find-the-sum-of-subsequence-powers)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>nums</code> of length <code>n</code>, and a <strong>positive</strong> integer <code>k</code>.</p>

<p>The <strong>power</strong> of a <span data-keyword="subsequence-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_21_" data-state="closed" class="">subsequence</button></span> is defined as the <strong>minimum</strong> absolute difference between <strong>any</strong> two elements in the subsequence.</p>

<p>Return <em>the <strong>sum</strong> of <strong>powers</strong> of <strong>all</strong> subsequences of </em><code>nums</code><em> which have length</em> <strong><em>equal to</em></strong> <code>k</code>.</p>

<p>Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9 </sup>+ 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,4], k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>There are 4 subsequences in <code>nums</code> which have length 3: <code>[1,2,3]</code>, <code>[1,3,4]</code>, <code>[1,2,4]</code>, and <code>[2,3,4]</code>. The sum of powers is <code>|2 - 3| + |3 - 4| + |2 - 1| + |3 - 4| = 4</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,2], k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>The only subsequence in <code>nums</code> which has length 2 is&nbsp;<code>[2,2]</code>. The sum of powers is <code>|2 - 2| = 0</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,3,-1], k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">10</span></p>

<p><strong>Explanation:</strong></p>

<p>There are 3 subsequences in <code>nums</code> which have length 2: <code>[4,3]</code>, <code>[4,-1]</code>, and <code>[3,-1]</code>. The sum of powers is <code>|4 - 3| + |4 - (-1)| + |3 - (-1)| = 10</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n == nums.length &lt;= 50</code></li>
	<li><code>-10<sup>8</sup> &lt;= nums[i] &lt;= 10<sup>8</sup> </code></li>
	<li><code>2 &lt;= k &lt;= n</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>4</sup>k)</em>
- Space complexity: <em>O(n<sup>3</sup>k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const sumOfPowers = function (nums, k) {
  const n = nums.length;
  const MODULO = 10 ** 9 + 7;
  const dp = Array.from({ length: k + 1 }, () => {
    return new Array((n + 1) ** 3).fill(-1);
  });

  nums.sort((a, b) => a - b);

  const getHash = (a, b, c) => {
    return (a + 1) * (n + 1) ** 2 + (b + 1) * (n + 1) + (c + 1);
  };

  const getPowerSum = (index, prev1, prev2, lastPick, len) => {
    if (!len) return nums[prev2] - nums[prev1];

    if (index >= n) return 0;

    const hash = getHash(prev1, prev2, lastPick);

    if (dp[len][hash] !== -1) return dp[len][hash];

    const num = nums[index];
    let nextPrev1 = prev1;
    let nextPrev2 = prev2;

    if (prev1 === -1) {
      nextPrev1 = index;
    } else if (prev2 === -1) {
      nextPrev2 = index;
    } else if (nums[prev2] - nums[prev1] > num - nums[lastPick]) {
      nextPrev1 = lastPick;
      nextPrev2 = index;
    }

    const skip = getPowerSum(index + 1, prev1, prev2, lastPick, len);
    const pick = getPowerSum(index + 1, nextPrev1, nextPrev2, index, len - 1);
    const result = (skip + pick) % MODULO;

    dp[len][hash] = result;

    return result;
  };

  return getPowerSum(0, -1, -1, -1, k);
};
```
