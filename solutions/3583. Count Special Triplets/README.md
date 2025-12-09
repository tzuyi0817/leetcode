# [3583. Count Special Triplets](https://leetcode.com/problems/count-special-triplets)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code>.</p>

<p>A <strong>special triplet</strong> is defined as a triplet of indices <code>(i, j, k)</code> such that:</p>

<ul>
	<li><code>0 &lt;= i &lt; j &lt; k &lt; n</code>, where <code>n = nums.length</code></li>
	<li><code>nums[i] == nums[j] * 2</code></li>
	<li><code>nums[k] == nums[j] * 2</code></li>
</ul>

<p>Return the total number of <strong>special triplets</strong> in the array.</p>

<p>Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [6,3,6]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>The only special triplet is <code>(i, j, k) = (0, 1, 2)</code>, where:</p>

<ul>
	<li><code>nums[0] = 6</code>, <code>nums[1] = 3</code>, <code>nums[2] = 6</code></li>
	<li><code>nums[0] = nums[1] * 2 = 3 * 2 = 6</code></li>
	<li><code>nums[2] = nums[1] * 2 = 3 * 2 = 6</code></li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [0,1,0,0]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>The only special triplet is <code>(i, j, k) = (0, 2, 3)</code>, where:</p>

<ul>
	<li><code>nums[0] = 0</code>, <code>nums[2] = 0</code>, <code>nums[3] = 0</code></li>
	<li><code>nums[0] = nums[2] * 2 = 0 * 2 = 0</code></li>
	<li><code>nums[3] = nums[2] * 2 = 0 * 2 = 0</code></li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [8,4,2,8,4]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>There are exactly two special triplets:</p>

<ul>
	<li><code>(i, j, k) = (0, 1, 3)</code>
    <ul>
    	<li><code>nums[0] = 8</code>, <code>nums[1] = 4</code>, <code>nums[3] = 8</code></li>
    	<li><code>nums[0] = nums[1] * 2 = 4 * 2 = 8</code></li>
    	<li><code>nums[3] = nums[1] * 2 = 4 * 2 = 8</code></li>
    </ul>
    </li>
    <li><code>(i, j, k) = (1, 2, 4)</code>
    <ul>
    	<li><code>nums[1] = 4</code>, <code>nums[2] = 2</code>, <code>nums[4] = 4</code></li>
    	<li><code>nums[1] = nums[2] * 2 = 2 * 2 = 4</code></li>
    	<li><code>nums[4] = nums[2] * 2 = 2 * 2 = 4</code></li>
    </ul>
    </li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= n == nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const specialTriplets = function (nums) {
  const MODULO = 10 ** 9 + 7;
  const n = nums.length;
  const numMap = new Map();
  const partialMap = new Map();
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = numMap.get(num) ?? 0;

    numMap.set(num, count + 1);
  }

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const count = partialMap.get(num) ?? 0;
    const target = num * 2;
    const prefixCount = partialMap.get(target);

    partialMap.set(num, count + 1);

    if (prefixCount) {
      const suffixCount = numMap.get(target) - partialMap.get(target);

      result = (result + prefixCount * suffixCount) % MODULO;
    }
  }

  return result;
};
```
