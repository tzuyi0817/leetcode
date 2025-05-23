# [801. Minimum Swaps To Make Sequences Increasing](https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two integer arrays of the same length <code>nums1</code> and <code>nums2</code>. In one operation, you are allowed to swap <code>nums1[i]</code> with <code>nums2[i]</code>.</p>

<ul>
	<li>For example, if <code>nums1 = [1,2,3,<u>8</u>]</code>, and <code>nums2 = [5,6,7,<u>4</u>]</code>, you can swap the element at <code>i = 3</code> to obtain <code>nums1 = [1,2,3,4]</code> and <code>nums2 = [5,6,7,8]</code>.</li>
</ul>

<p>Return <em>the minimum number of needed operations to make </em><code>nums1</code><em> and </em><code>nums2</code><em> <strong>strictly increasing</strong></em>. The test cases are generated so that the given input always makes it possible.</p>

<p>An array <code>arr</code> is <strong>strictly increasing</strong> if and only if <code>arr[0] &lt; arr[1] &lt; arr[2] &lt; ... &lt; arr[arr.length - 1]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,3,5,4], nums2 = [1,2,3,7]
<strong>Output:</strong> 1
<strong>Explanation:</strong> 
Swap nums1[3] and nums2[3]. Then the sequences are:
nums1 = [1, 3, 5, 7] and nums2 = [1, 2, 3, 4]
which are both strictly increasing.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums1.length &lt;= 10<sup>5</sup></code></li>
	<li><code>nums2.length == nums1.length</code></li>
	<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 2 * 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic programming`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minSwap = function (nums1, nums2) {
  const n = nums1.length;
  let swap = 1;
  let noSwap = 0;

  for (let index = 1; index < n; index++) {
    let currentSwap = n;
    let currentNoSwap = n;

    if (nums1[index] > nums1[index - 1] && nums2[index] > nums2[index - 1]) {
      currentSwap = swap + 1;
      currentNoSwap = noSwap;
    }
    if (nums1[index] > nums2[index - 1] && nums2[index] > nums1[index - 1]) {
      currentSwap = Math.min(currentSwap, noSwap + 1);
      currentNoSwap = Math.min(currentNoSwap, swap);
    }
    swap = currentSwap;
    noSwap = currentNoSwap;
  }
  return Math.min(swap, noSwap);
};
```
