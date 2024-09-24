# [1775. Equal Sum Arrays With Minimum Number of Operations](https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations)

## Description

<div class="xFUwe" data-track-load="description_content"><p>You are given two arrays of integers <code>nums1</code> and <code><font face="monospace">nums2</font></code>, possibly of different lengths. The values in the arrays are between <code>1</code> and <code>6</code>, inclusive.</p>

<p>In one operation, you can change any integer's value in <strong>any </strong>of the arrays to <strong>any</strong> value between <code>1</code> and <code>6</code>, inclusive.</p>

<p>Return <em>the minimum number of operations required to make the sum of values in </em><code>nums1</code><em> equal to the sum of values in </em><code>nums2</code><em>.</em> Return <code>-1</code>​​​​​ if it is not possible to make the sum of the two arrays equal.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
<strong>Output:</strong> 3
<strong>Explanation:</strong> You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed.
- Change nums2[0] to 6. nums1 = [1,2,3,4,5,6], nums2 = [<u><strong>6</strong></u>,1,2,2,2,2].
- Change nums1[5] to 1. nums1 = [1,2,3,4,5,<strong><u>1</u></strong>], nums2 = [6,1,2,2,2,2].
- Change nums1[2] to 2. nums1 = [1,2,<strong><u>2</u></strong>,4,5,1], nums2 = [6,1,2,2,2,2].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,1,1,1,1,1,1], nums2 = [6]
<strong>Output:</strong> -1
<strong>Explanation:</strong> There is no way to decrease the sum of nums1 or to increase the sum of nums2 to make them equal.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums1 = [6,6], nums2 = [1]
<strong>Output:</strong> 3
<strong>Explanation:</strong> You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed. 
- Change nums1[0] to 2. nums1 = [<strong><u>2</u></strong>,6], nums2 = [1].
- Change nums1[1] to 2. nums1 = [2,<strong><u>2</u></strong>], nums2 = [1].
- Change nums2[0] to 4. nums1 = [2,2], nums2 = [<strong><u>4</u></strong>].
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums1.length, nums2.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums1[i], nums2[i] &lt;= 6</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const minOperations = function (nums1, nums2) {
  const size1 = nums1.length;
  const size2 = nums2.length;
  if (size1 * 6 < size2 || size1 > size2 * 6) return -1;

  const sum1 = nums1.reduce((sum, num) => sum + num);
  const sum2 = nums2.reduce((sum, num) => sum + num);
  const operations = (a, b) => {
    let left = (result = 0);
    let right = b.nums.length - 1;

    while (a.sum < b.sum) {
      right < 0 || (left < a.nums.length && 6 - a.nums[left] > b.nums[right] - 1)
        ? (a.sum += 6 - a.nums[left++])
        : (b.sum -= b.nums[right--] - 1);

      result += 1;
    }
    return result;
  };

  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  return sum1 < sum2
    ? operations({ nums: nums1, sum: sum1 }, { nums: nums2, sum: sum2 })
    : operations({ nums: nums2, sum: sum2 }, { nums: nums1, sum: sum1 });
};
```