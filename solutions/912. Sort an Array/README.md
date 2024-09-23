# [912. Sort an Array](https://leetcode.com/problems/sort-an-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of integers <code>nums</code>, sort the array in ascending order and return it.</p>

<p>You must solve the problem <strong>without using any built-in</strong> functions in <code>O(nlog(n))</code> time complexity and with the smallest space complexity possible.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [5,2,3,1]
<strong>Output:</strong> [1,2,3,5]
<strong>Explanation:</strong> After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [5,1,1,2,0,0]
<strong>Output:</strong> [0,0,1,1,2,5]
<strong>Explanation:</strong> Note that the values of nums are not necessairly unique.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>-5 * 10<sup>4</sup> &lt;= nums[i] &lt;= 5 * 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Merge Sort`**
- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    if (nums.length <= 1) return nums;

    const mid = Math.floor(nums.length / 2);
    const prefix = nums.slice(0, mid);
    const suffix = nums.slice(mid);

    const mergeSort = (nums1, nums2) => {
        const result = [];
        let a = b = 0;

        while (a < nums1.length && b < nums2.length) {
            const num = nums1[a] < nums2[b] ? nums1[a++] : nums2[b++];

            result.push(num);
        }
        while (a < nums1.length) result.push(nums1[a++]);
        while (b < nums2.length) result.push(nums2[b++]);

        return result;
    };

    return mergeSort(sortArray(prefix), sortArray(suffix));
};
```
