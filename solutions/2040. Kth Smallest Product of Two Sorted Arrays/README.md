# [2040. Kth Smallest Product of Two Sorted Arrays](https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays)

## Description

<div class="elfjS" data-track-load="description_content">Given two <strong>sorted 0-indexed</strong> integer arrays <code>nums1</code> and <code>nums2</code> as well as an integer <code>k</code>, return <em>the </em><code>k<sup>th</sup></code><em> (<strong>1-based</strong>) smallest product of </em><code>nums1[i] * nums2[j]</code><em> where </em><code>0 &lt;= i &lt; nums1.length</code><em> and </em><code>0 &lt;= j &lt; nums2.length</code>.
<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [2,5], nums2 = [3,4], k = 2
<strong>Output:</strong> 8
<strong>Explanation:</strong> The 2 smallest products are:
- nums1[0] * nums2[0] = 2 * 3 = 6
- nums1[0] * nums2[1] = 2 * 4 = 8
The 2<sup>nd</sup> smallest product is 8.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [-4,-2,0,3], nums2 = [2,4], k = 6
<strong>Output:</strong> 0
<strong>Explanation:</strong> The 6 smallest products are:
- nums1[0] * nums2[1] = (-4) * 4 = -16
- nums1[0] * nums2[0] = (-4) * 2 = -8
- nums1[1] * nums2[1] = (-2) * 4 = -8
- nums1[1] * nums2[0] = (-2) * 2 = -4
- nums1[2] * nums2[0] = 0 * 2 = 0
- nums1[2] * nums2[1] = 0 * 4 = 0
The 6<sup>th</sup> smallest product is 0.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums1 = [-2,-1,0,1,2], nums2 = [-3,-1,2,4,5], k = 3
<strong>Output:</strong> -6
<strong>Explanation:</strong> The 3 smallest products are:
- nums1[0] * nums2[4] = (-2) * 5 = -10
- nums1[0] * nums2[3] = (-2) * 4 = -8
- nums1[4] * nums2[0] = 2 * (-3) = -6
The 3<sup>rd</sup> smallest product is -6.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums1.length, nums2.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>-10<sup>5</sup> &lt;= nums1[i], nums2[j] &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= k &lt;= nums1.length * nums2.length</code></li>
	<li><code>nums1</code> and <code>nums2</code> are sorted.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search`**

- Time complexity: <em>O((n+m)\*log(maxProduct))</em>
- Space complexity: <em>O(n+m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
const kthSmallestProduct = function (nums1, nums2, k) {
  const negNums1 = [];
  const posNums1 = [];
  let negNums2 = [];
  let posNums2 = [];

  for (const num of nums1) {
    num < 0 ? negNums1.push(-num) : posNums1.push(num);
  }

  for (const num of nums2) {
    num < 0 ? negNums2.push(-num) : posNums2.push(num);
  }

  const negCount = negNums1.length * posNums2.length + posNums1.length * negNums2.length;
  let sign = 1;
  let left = 0;
  let right = 10 ** 10;

  negNums1.reverse();
  negNums2.reverse();

  if (k > negCount) {
    k -= negCount;
  } else {
    sign = -1;
    k = negCount - k + 1;
    [negNums2, posNums2] = [posNums2, negNums2];
  }

  const getSmallerCount = (a, b, product) => {
    let count = 0;
    let index = b.length - 1;

    for (const num of a) {
      while (index >= 0 && num * b[index] > product) {
        index -= 1;
      }

      count += index + 1;
    }

    return count;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const kth = getSmallerCount(negNums1, negNums2, mid) + getSmallerCount(posNums1, posNums2, mid);

    kth >= k ? (right = mid) : (left = mid + 1);
  }

  return left * sign;
};
```
