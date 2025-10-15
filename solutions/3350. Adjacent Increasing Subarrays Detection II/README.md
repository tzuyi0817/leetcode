# [3350. Adjacent Increasing Subarrays Detection II](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array <code>nums</code> of <code>n</code> integers, your task is to find the <strong>maximum</strong> value of <code>k</code> for which there exist <strong>two</strong> adjacent <span data-keyword="subarray-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1n:" data-state="closed" class="">subarrays</button></span> of length <code>k</code> each, such that both subarrays are <strong>strictly</strong> <strong>increasing</strong>. Specifically, check if there are <strong>two</strong> subarrays of length <code>k</code> starting at indices <code>a</code> and <code>b</code> (<code>a &lt; b</code>), where:</p>

<ul>
	<li>Both subarrays <code>nums[a..a + k - 1]</code> and <code>nums[b..b + k - 1]</code> are <strong>strictly increasing</strong>.</li>
	<li>The subarrays must be <strong>adjacent</strong>, meaning <code>b = a + k</code>.</li>
</ul>

<p>Return the <strong>maximum</strong> <em>possible</em> value of <code>k</code>.</p>

<p>A <strong>subarray</strong> is a contiguous <b>non-empty</b> sequence of elements within an array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,5,7,8,9,2,3,4,3,1]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The subarray starting at index 2 is <code>[7, 8, 9]</code>, which is strictly increasing.</li>
	<li>The subarray starting at index 5 is <code>[2, 3, 4]</code>, which is also strictly increasing.</li>
	<li>These two subarrays are adjacent, and 3 is the <strong>maximum</strong> possible value of <code>k</code> for which two such adjacent strictly increasing subarrays exist.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,4,4,4,4,5,6,7]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The subarray starting at index 0 is <code>[1, 2]</code>, which is strictly increasing.</li>
	<li>The subarray starting at index 2 is <code>[3, 4]</code>, which is also strictly increasing.</li>
	<li>These two subarrays are adjacent, and 2 is the <strong>maximum</strong> possible value of <code>k</code> for which two such adjacent strictly increasing subarrays exist.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxIncreasingSubarrays = function (nums) {
  const n = nums.length;
  let increasing = 1;
  let prevIncreasing = 0;
  let result = 1;

  for (let index = 1; index < n; index++) {
    if (nums[index] > nums[index - 1]) {
      increasing += 1;
    } else {
      prevIncreasing = increasing;
      increasing = 1;
    }

    const len1 = Math.floor(increasing / 2);
    const len2 = Math.min(prevIncreasing, increasing);

    result = Math.max(len1, len2, result);
  }

  return result;
};
```
