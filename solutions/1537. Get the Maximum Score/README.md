# [1537. Get the Maximum Score](https://leetcode.com/problems/get-the-maximum-score)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two <strong>sorted</strong> arrays of distinct integers <code>nums1</code> and <code>nums2</code>.</p>

<p>A <strong>valid<strong><em> </em></strong>path</strong> is defined as follows:</p>

<ul>
	<li>Choose array <code>nums1</code> or <code>nums2</code> to traverse (from index-0).</li>
	<li>Traverse the current array from left to right.</li>
	<li>If you are reading any value that is present in <code>nums1</code> and <code>nums2</code> you are allowed to change your path to the other array. (Only one repeated value is considered in the valid path).</li>
</ul>

<p>The <strong>score</strong> is defined as the sum of unique values in a valid path.</p>

<p>Return <em>the maximum score you can obtain of all possible <strong>valid paths</strong></em>. Since the answer may be too large, return it modulo <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/07/16/sample_1_1893.png" style="width: 500px; height: 151px;">
<pre><strong>Input:</strong> nums1 = [2,4,5,8,10], nums2 = [4,6,8,9]
<strong>Output:</strong> 30
<strong>Explanation:</strong> Valid paths:
[2,4,5,8,10], [2,4,5,8,9], [2,4,6,8,9], [2,4,6,8,10],  (starting from nums1)
[4,6,8,9], [4,5,8,10], [4,5,8,9], [4,6,8,10]    (starting from nums2)
The maximum is obtained with the path in green <strong>[2,4,6,8,10]</strong>.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,3,5,7,9], nums2 = [3,5,100]
<strong>Output:</strong> 109
<strong>Explanation:</strong> Maximum sum is obtained with the path <strong>[1,3,5,100]</strong>.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10]
<strong>Output:</strong> 40
<strong>Explanation:</strong> There are no common elements between nums1 and nums2.
Maximum sum is obtained with the path [6,7,8,9,10].
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums1.length, nums2.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums1[i], nums2[i] &lt;= 10<sup>7</sup></code></li>
	<li><code>nums1</code> and <code>nums2</code> are strictly increasing.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy + Two Pointers`**

- Time complexity: <em>O(Max(m, n))</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const maxSum = function (nums1, nums2) {
  const MODULO = 10 ** 9 + 7;
  const m = nums1.length;
  const n = nums2.length;
  let a = 0;
  let b = 0;
  let sum1 = 0;
  let sum2 = 0;
  let result = 0;

  while (a < m && b < n) {
    if (nums1[a] < nums2[b]) {
      sum1 += nums1[a];
      a += 1;
    } else if (nums1[a] > nums2[b]) {
      sum2 += nums2[b];
      b += 1;
    } else {
      result = (result + Math.max(sum1, sum2) + nums1[a]) % MODULO;
      sum1 = 0;
      sum2 = 0;
      a += 1;
      b += 1;
    }
  }

  while (a < m) {
    sum1 += nums1[a];
    a += 1;
  }

  while (b < n) {
    sum2 += nums2[b];
    b += 1;
  }

  return (result + Math.max(sum1, sum2)) % MODULO;
};
```
