# [2763. Sum of Imbalance Numbers of All Subarrays](https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>The <strong>imbalance number</strong> of a <strong>0-indexed</strong> integer array <code>arr</code> of length <code>n</code> is defined as the number of indices in <code>sarr = sorted(arr)</code> such that:</p>

<ul>
	<li><code>0 &lt;= i &lt; n - 1</code>, and</li>
	<li><code>sarr[i+1] - sarr[i] &gt; 1</code></li>
</ul>

<p>Here, <code>sorted(arr)</code> is the function that returns the sorted version of <code>arr</code>.</p>

<p>Given a <strong>0-indexed</strong> integer array <code>nums</code>, return <em>the <strong>sum of imbalance numbers</strong> of all its <strong>subarrays</strong></em>.</p>

<p>A <strong>subarray</strong> is a contiguous <strong>non-empty</strong> sequence of elements within an array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,3,1,4]
<strong>Output:</strong> 3
<strong>Explanation:</strong> There are 3 subarrays with non-zero<strong> </strong>imbalance numbers:
- Subarray [3, 1] with an imbalance number of 1.
- Subarray [3, 1, 4] with an imbalance number of 1.
- Subarray [1, 4] with an imbalance number of 1.
The imbalance number of all other subarrays is 0. Hence, the sum of imbalance numbers of all the subarrays of nums is 3. 
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,3,3,3,5]
<strong>Output:</strong> 8
<strong>Explanation:</strong> There are 7 subarrays with non-zero imbalance numbers:
- Subarray [1, 3] with an imbalance number of 1.
- Subarray [1, 3, 3] with an imbalance number of 1.
- Subarray [1, 3, 3, 3] with an imbalance number of 1.
- Subarray [1, 3, 3, 3, 5] with an imbalance number of 2. 
- Subarray [3, 3, 3, 5] with an imbalance number of 1. 
- Subarray [3, 3, 5] with an imbalance number of 1.
- Subarray [3, 5] with an imbalance number of 1.
The imbalance number of all other subarrays is 0. Hence, the sum of imbalance numbers of all the subarrays of nums is 8. </pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>1 &lt;= nums[i] &lt;= nums.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const sumImbalanceNumbers = function (nums) {
  const n = nums.length;
  const left = Array.from({ length: n }, () => -1);
  const right = Array.from({ length: n }, () => n);
  const numToIndex = Array.from({ length: n + 2 }, () => -1);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    left[index] = Math.max(numToIndex[num], numToIndex[num + 1]);
    numToIndex[num] = index;
  }

  numToIndex.fill(n);

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    right[index] = numToIndex[num + 1];
    numToIndex[num] = index;
  }

  for (let index = 0; index < n; index++) {
    const count = (index - left[index]) * (right[index] - index);

    result += count;
  }

  return result - (n * (n + 1)) / 2;
};
```
