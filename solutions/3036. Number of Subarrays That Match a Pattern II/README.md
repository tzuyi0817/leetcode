# [3036. Number of Subarrays That Match a Pattern II](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code> of size <code>n</code>, and a <strong>0-indexed</strong> integer array <code>pattern</code> of size <code>m</code> consisting of integers <code>-1</code>, <code>0</code>, and <code>1</code>.</p>

<p>A <span data-keyword="subarray" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1l_" data-state="closed" class="">subarray</button></span> <code>nums[i..j]</code> of size <code>m + 1</code> is said to match the <code>pattern</code> if the following conditions hold for each element <code>pattern[k]</code>:</p>

<ul>
	<li><code>nums[i + k + 1] &gt; nums[i + k]</code> if <code>pattern[k] == 1</code>.</li>
	<li><code>nums[i + k + 1] == nums[i + k]</code> if <code>pattern[k] == 0</code>.</li>
	<li><code>nums[i + k + 1] &lt; nums[i + k]</code> if <code>pattern[k] == -1</code>.</li>
</ul>

<p>Return <em>the<strong> count</strong> of subarrays in</em> <code>nums</code> <em>that match the</em> <code>pattern</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4,5,6], pattern = [1,1]
<strong>Output:</strong> 4
<strong>Explanation:</strong> The pattern [1,1] indicates that we are looking for strictly increasing subarrays of size 3. In the array nums, the subarrays [1,2,3], [2,3,4], [3,4,5], and [4,5,6] match this pattern.
Hence, there are 4 subarrays in nums that match the pattern.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,4,4,1,3,5,5,3], pattern = [1,0,-1]
<strong>Output:</strong> 2
<strong>Explanation: </strong>Here, the pattern [1,0,-1] indicates that we are looking for a sequence where the first number is smaller than the second, the second is equal to the third, and the third is greater than the fourth. In the array nums, the subarrays [1,4,4,1], and [3,5,5,3] match this pattern.
Hence, there are 2 subarrays in nums that match the pattern.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n == nums.length &lt;= 10<sup>6</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= m == pattern.length &lt; n</code></li>
	<li><code>-1 &lt;= pattern[i] &lt;= 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Knuth-Morris-Pratt Algorithm`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[]} pattern
 * @return {number}
 */
const countMatchingSubarrays = function (nums, pattern) {
  const n = nums.length;
  const m = pattern.length;
  const lps = getLPS(pattern);
  const numsPattern = [];
  let a = 0;
  let b = 0;
  let result = 0;

  for (let index = 1; index < n; index++) {
    const prev = nums[index - 1];
    const num = nums[index];
    const value = Math.sign(num - prev);

    numsPattern.push(value);
  }

  while (a < n) {
    if (numsPattern[a] === pattern[b]) {
      a += 1;
      b += 1;

      if (b === m) {
        result += 1;
        b = lps[b - 1];
      }
    } else if (b) {
      b = lps[b - 1];
    } else {
      a += 1;
    }
  }

  return result;
};

function getLPS(pattern) {
  const n = pattern.length;
  const lps = Array.from({ length: n }, () => 0);
  let left = 0;

  for (let index = 1; index < n; index++) {
    while (left && pattern[index] !== pattern[left]) {
      left = lps[left - 1];
    }

    if (pattern[index] === pattern[left]) {
      lps[index] = left + 1;
      left += 1;
    }
  }

  return lps;
}
```
