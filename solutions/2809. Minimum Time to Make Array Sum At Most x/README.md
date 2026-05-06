# [2809. Minimum Time to Make Array Sum At Most x](https://leetcode.com/problems/minimum-time-to-make-array-sum-at-most-x)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given two <strong>0-indexed</strong> integer arrays <code>nums1</code> and <code>nums2</code> of equal length. Every second, for all indices <code>0 &lt;= i &lt; nums1.length</code>, value of <code>nums1[i]</code> is incremented by <code>nums2[i]</code>. <strong>After</strong> this is done, you can do the following operation:</p>

<ul>
	<li>Choose an index <code>0 &lt;= i &lt; nums1.length</code> and make <code>nums1[i] = 0</code>.</li>
</ul>

<p>You are also given an integer <code>x</code>.</p>

<p>Return <em>the <strong>minimum</strong> time in which you can make the sum of all elements of </em><code>nums1</code><em> to be<strong> less than or equal</strong> to </em><code>x</code>, <em>or </em><code>-1</code><em> if this is not possible.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,2,3], nums2 = [1,2,3], x = 4
<strong>Output:</strong> 3
<strong>Explanation:</strong> 
For the 1st second, we apply the operation on i = 0. Therefore nums1 = [0,2+2,3+3] = [0,4,6]. 
For the 2nd second, we apply the operation on i = 1. Therefore nums1 = [0+1,0,6+3] = [1,0,9]. 
For the 3rd second, we apply the operation on i = 2. Therefore nums1 = [1+1,0+2,0] = [2,2,0]. 
Now sum of nums1 = 4. It can be shown that these operations are optimal, so we return 3.

</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,2,3], nums2 = [3,3,3], x = 4
<strong>Output:</strong> -1
<strong>Explanation:</strong> It can be shown that the sum of nums1 will always be greater than x, no matter which operations are performed.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code><font face="monospace">1 &lt;= nums1.length &lt;= 10<sup>3</sup></font></code></li>
	<li><code>1 &lt;= nums1[i] &lt;= 10<sup>3</sup></code></li>
	<li><code>0 &lt;= nums2[i] &lt;= 10<sup>3</sup></code></li>
	<li><code>nums1.length == nums2.length</code></li>
	<li><code>0 &lt;= x &lt;= 10<sup>6</sup></code></li>
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
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} x
 * @return {number}
 */
const minimumTime = function (nums1, nums2, x) {
  const n = nums1.length;
  const sum1 = nums1.reduce((sum, num) => sum + num);
  const sum2 = nums2.reduce((sum, num) => sum + num);
  const dp = Array.from({ length: n + 1 }, () => 0);
  const pairs = nums2.map((num, index) => {
    return { num1: nums1[index], num2: num };
  });

  pairs.sort((a, b) => a.num2 - b.num2);

  for (let a = 1; a <= n; a++) {
    const { num1, num2 } = pairs[a - 1];

    for (let b = a; b > 0; b--) {
      const reduceSum = dp[b - 1] + num1 + num2 * b;

      dp[b] = Math.max(reduceSum, dp[b]);
    }
  }

  for (let operation = 0; operation <= n; operation++) {
    const sum = sum1 + sum2 * operation;

    if (sum - dp[operation] <= x) {
      return operation;
    }
  }

  return -1;
};
```
