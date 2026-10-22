# [3942. Minimum Operations to Sort a Permutation](https://leetcode.com/problems/minimum-operations-to-sort-a-permutation)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an integer array <code>nums</code> of length <code>n</code>, where <code>nums</code> is a <span data-keyword="permutation-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">permutation</button></span> of the integers from 0 to <code>n - 1</code>.</p>

<p>You may perform <strong>only</strong> the following operations:</p>

<ul>
	<li><strong>Reverse</strong> the entire array.</li>
	<li><strong>Rotate Left by One</strong>: Move the first element to the end of the array, and rest elements to left by one position.</li>
</ul>

<p>Return an integer denoting the <strong>minimum</strong> number of operations required to sort the array in <strong>increasing</strong> order. If it is <strong>not possible</strong> to sort the array using only the given operations, return -1.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [0,2,1]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Rotate Left by one: <code>[2, 1, 0]</code></li>
	<li>Reverse the array: <code>[0, 1, 2]</code></li>
</ul>

<p>The array becomes sorted in 2 operations, which is minimal</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,0,2]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Reverse the array: <code>[2, 0, 1]</code></li>
	<li>Rotate Left by one: <code>[0, 1, 2]</code></li>
</ul>

<p>The array becomes sorted in 2 operations, which is minimal.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,0,1,3]</span></p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>

<p><strong>Explanation:</strong></p>

<p>It is impossible to reach <code>[2, 0, 1, 3]</code>. Thus, the answer is -1.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n == nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= nums[i] &lt;= n - 1</code></li>
	<li><code>nums</code> is a permutation of integers from 0 to <code>n - 1</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const minOperations = function (nums) {
  const n = nums.length;

  if (n === 1) return 0;

  const zeroPos = nums.indexOf(0);

  if (isIncrease(nums, zeroPos)) {
    const doubleReverse = n - zeroPos + 2;

    return Math.min(zeroPos, doubleReverse);
  }

  if (isDecrease(nums, zeroPos)) {
    const rotateThenReverse = ((zeroPos + 1) % n) + 1;
    const reverseThenRotate = n - zeroPos;

    return Math.min(rotateThenReverse, reverseThenRotate);
  }

  return -1;
};

function isIncrease(nums, zeroPos) {
  const n = nums.length;

  for (let index = 0; index < n; index++) {
    const num = nums[(index + zeroPos) % n];

    if (num !== index) return false;
  }

  return true;
}

function isDecrease(nums, zeroPos) {
  const n = nums.length;

  for (let index = 0; index < n; index++) {
    const num = nums[(n - index + zeroPos + n) % n];

    if (num !== index) return false;
  }

  return true;
}
```
