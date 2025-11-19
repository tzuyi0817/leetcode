# [1671. Minimum Number of Removals to Make Mountain Array](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>You may recall that an array <code>arr</code> is a <strong>mountain array</strong> if and only if:</p>

<ul>
	<li><code>arr.length &gt;= 3</code></li>
	<li>There exists some index <code>i</code> (<strong>0-indexed</strong>) with <code>0 &lt; i &lt; arr.length - 1</code> such that:
	<ul>
		<li><code>arr[0] &lt; arr[1] &lt; ... &lt; arr[i - 1] &lt; arr[i]</code></li>
		<li><code>arr[i] &gt; arr[i + 1] &gt; ... &gt; arr[arr.length - 1]</code></li>
	</ul>
	</li>
</ul>

<p>Given an integer array <code>nums</code>​​​, return <em>the <strong>minimum</strong> number of elements to remove to make </em><code>nums<em>​​​</em></code><em> </em><em>a <strong>mountain array</strong>.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,3,1]
<strong>Output:</strong> 0
<strong>Explanation:</strong> The array itself is a mountain array so we do not need to remove any elements.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2,1,1,5,6,2,3,1]
<strong>Output:</strong> 3
<strong>Explanation:</strong> One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li>It is guaranteed that you can make a mountain array out of <code>nums</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Binary Search`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumMountainRemovals = function (nums) {
  const n = nums.length;

  const findFirstLargeIndex = (elements, target) => {
    let left = 0;
    let right = elements.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      elements[mid] >= target ? (right = mid) : (left = mid + 1);
    }
    return left;
  };

  const lengthOfLIS = elements => {
    const result = new Array(n).fill(0);
    const current = [];

    for (let index = 0; index < n; index++) {
      const element = elements[index];
      const firstIndex = findFirstLargeIndex(current, element);

      current[firstIndex] = element;
      result[index] = current.length;
    }
    return result;
  };

  const leftLengthOfLIS = lengthOfLIS(nums);
  const rightLengthOfLIS = lengthOfLIS(nums.toReversed()).toReversed();
  let result = 0;

  for (let index = 0; index < n; index++) {
    const left = leftLengthOfLIS[index];
    const right = rightLengthOfLIS[index];

    if (left < 2 || right < 2) continue;

    result = Math.max(left + right - 1, result);
  }
  return n - result;
};
```
