# [1877. Minimize Maximum Pair Sum in Array](https://leetcode.com/problems/minimize-maximum-pair-sum-in-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>The <strong>pair sum</strong> of a pair <code>(a,b)</code> is equal to <code>a + b</code>. The <strong>maximum pair sum</strong> is the largest <strong>pair sum</strong> in a list of pairs.</p>

<ul>
	<li>For example, if we have pairs <code>(1,5)</code>, <code>(2,3)</code>, and <code>(4,4)</code>, the <strong>maximum pair sum</strong> would be <code>max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8</code>.</li>
</ul>

<p>Given an array <code>nums</code> of <strong>even</strong> length <code>n</code>, pair up the elements of <code>nums</code> into <code>n / 2</code> pairs such that:</p>

<ul>
	<li>Each element of <code>nums</code> is in <strong>exactly one</strong> pair, and</li>
	<li>The <strong>maximum pair sum </strong>is <strong>minimized</strong>.</li>
</ul>

<p>Return <em>the minimized <strong>maximum pair sum</strong> after optimally pairing up the elements</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [3,5,2,3]
<strong>Output:</strong> 7
<strong>Explanation:</strong> The elements can be paired up into pairs (3,3) and (5,2).
The maximum pair sum is max(3+3, 5+2) = max(6, 7) = 7.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,5,4,2,4,6]
<strong>Output:</strong> 8
<strong>Explanation:</strong> The elements can be paired up into pairs (3,5), (4,4), and (6,2).
The maximum pair sum is max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>n</code> is <strong>even</strong>.</li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const minPairSum = function (nums) {
  nums.sort((a, b) => a - b);

  const size = nums.length;
  let result = 0;

  for (let index = 0; index < size / 2; index++) {
    const sum = nums[index] + nums[size - index - 1];

    result = Math.max(sum, result);
  }
  return result;
};
```
