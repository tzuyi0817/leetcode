# [1330. Reverse Subarray To Maximize Array Value](https://leetcode.com/problems/reverse-subarray-to-maximize-array-value)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code>. The <em>value</em> of this array is defined as the sum of <code>|nums[i] - nums[i + 1]|</code> for all <code>0 &lt;= i &lt; nums.length - 1</code>.</p>

<p>You are allowed to select any subarray of the given array and reverse it. You can perform this operation <strong>only once</strong>.</p>

<p>Find maximum possible value of the final array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,3,1,5,4]
<strong>Output:</strong> 10
<b>Explanation: </b>By reversing the subarray [3,1,5] the array becomes [2,5,1,3,4] whose value is 10.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2,4,9,24,2,1,10]
<strong>Output:</strong> 68
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
	<li>The answer is guaranteed to fit in a 32-bit integer.</li>
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
const maxValueAfterReverse = function (nums) {
  const n = nums.length;
  let minMax = Number.MAX_SAFE_INTEGER;
  let maxMin = Number.MIN_SAFE_INTEGER;
  let total = 0;

  for (let index = 1; index < n; index++) {
    const a = nums[index - 1];
    const b = nums[index];

    total += Math.abs(a - b);
    minMax = Math.min(minMax, Math.max(a, b));
    maxMin = Math.max(maxMin, Math.min(a, b));
  }
  let maxDiff = (maxMin - minMax) * 2;

  for (let index = 1; index < n; index++) {
    const a = nums[index - 1];
    const b = nums[index];
    const diff = Math.abs(a - b);
    const headDiff = Math.abs(nums[0] - b) - diff;
    const tailDiff = Math.abs(nums[n - 1] - a) - diff;

    maxDiff = Math.max(maxDiff, headDiff, tailDiff);
  }
  return total + maxDiff;
};
```
