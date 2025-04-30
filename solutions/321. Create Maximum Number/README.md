# [321. Create Maximum Number](https://leetcode.com/problems/create-maximum-number)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two integer arrays <code>nums1</code> and <code>nums2</code> of lengths <code>m</code> and <code>n</code> respectively. <code>nums1</code> and <code>nums2</code> represent the digits of two numbers. You are also given an integer <code>k</code>.</p>

<p>Create the maximum number of length <code>k &lt;= m + n</code> from digits of the two numbers. The relative order of the digits from the same array must be preserved.</p>

<p>Return an array of the <code>k</code> digits representing the answer.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
<strong>Output:</strong> [9,8,6,5,3]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [6,7], nums2 = [6,0,4], k = 5
<strong>Output:</strong> [6,7,6,0,4]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums1 = [3,9], nums2 = [8,9], k = 3
<strong>Output:</strong> [9,8,9]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == nums1.length</code></li>
	<li><code>n == nums2.length</code></li>
	<li><code>1 &lt;= m, n &lt;= 500</code></li>
	<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 9</code></li>
	<li><code>1 &lt;= k &lt;= m + n</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(k(m+n)<sup>2</sup>)</em>
- Space complexity: <em>O(m+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
const maxNumber = function (nums1, nums2, k) {
  const m = nums1.length;
  const n = nums2.length;
  let result = [];

  const sliceNums = (nums, count) => {
    const result = [];
    let drop = nums.length - count;

    for (const num of nums) {
      while (drop && result.at(-1) < num) {
        result.pop();
        drop -= 1;
      }
      result.push(num);
    }
    return result.slice(0, count);
  };

  const isGreater = (numsA, numsB, a = 0, b = 0) => {
    while (a < numsA.length && b < numsB.length) {
      if (numsA[a] > numsB[b]) return true;
      if (numsA[a] < numsB[b]) return false;
      a += 1;
      b += 1;
    }
    return a < numsA.length;
  };

  const mergeSlice = (numsA, numsB) => {
    const result = [];
    let a = 0;
    let b = 0;

    while (a < numsA.length || b < numsB.length) {
      isGreater(numsA, numsB, a, b) ? result.push(numsA[a++]) : result.push(numsB[b++]);
    }
    return result;
  };

  for (let count = Math.max(0, k - n); count <= Math.min(m, k); count++) {
    const slice1 = sliceNums(nums1, count);
    const slice2 = sliceNums(nums2, k - count);
    const mergeResult = mergeSlice(slice1, slice2);

    if (isGreater(result, mergeResult)) continue;
    result = mergeResult;
  }
  return result;
};
```
