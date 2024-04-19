# [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>

<p>The overall run time complexity should be <code>O(log (m+n))</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,3], nums2 = [2]
<strong>Output:</strong> 2.00000
<strong>Explanation:</strong> merged array = [1,2,3] and median is 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]
<strong>Output:</strong> 2.50000
<strong>Explanation:</strong> merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>nums1.length == m</code></li>
	<li><code>nums2.length == n</code></li>
	<li><code>0 &lt;= m &lt;= 1000</code></li>
	<li><code>0 &lt;= n &lt;= 1000</code></li>
	<li><code>1 &lt;= m + n &lt;= 2000</code></li>
	<li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search`**
- Time complexity: <em>O(log(m+n))</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    const medianKthA = Math.floor((m + n + 1) / 2);
    const medianKthB = Math.floor((m + n + 2) / 2);
    const findKth = (a, b, kth) => {
        if (a >= m) return nums2[b + kth - 1];
        if (b >= n) return nums1[a + kth - 1];
        if (kth === 1) return Math.min(nums1[a], nums2[b]);
        const mid = Math.floor(kth / 2);
        const mid1 = a + mid - 1;
        const mid2 = b + mid - 1;
        const midValue1 = mid1 < m ? nums1[mid1] : Number.MAX_SAFE_INTEGER;
        const midValue2 = mid2 < n ? nums2[mid2] : Number.MAX_SAFE_INTEGER;

        return midValue1 < midValue2 
            ? findKth(a + mid, b, kth - mid)
            : findKth(a, b + mid, kth - mid);
    };

    return (findKth(0, 0, medianKthA) + findKth(0, 0, medianKthB)) / 2;
};
```
