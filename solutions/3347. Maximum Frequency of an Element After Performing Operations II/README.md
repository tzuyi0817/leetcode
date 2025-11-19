# [3347. Maximum Frequency of an Element After Performing Operations II](https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code> and two integers <code>k</code> and <code>numOperations</code>.</p>

<p>You must perform an <strong>operation</strong> <code>numOperations</code> times on <code>nums</code>, where in each operation you:</p>

<ul>
	<li>Select an index <code>i</code> that was <strong>not</strong> selected in any previous operations.</li>
	<li>Add an integer in the range <code>[-k, k]</code> to <code>nums[i]</code>.</li>
</ul>

<p>Return the <strong>maximum</strong> possible <span data-keyword="frequency-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1n:" data-state="closed" class="">frequency</button></span> of any element in <code>nums</code> after performing the <strong>operations</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,4,5], k = 1, numOperations = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>We can achieve a maximum frequency of two by:</p>

<ul>
	<li>Adding 0 to <code>nums[1]</code>, after which <code>nums</code> becomes <code>[1, 4, 5]</code>.</li>
	<li>Adding -1 to <code>nums[2]</code>, after which <code>nums</code> becomes <code>[1, 4, 4]</code>.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [5,11,20,20], k = 5, numOperations = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>We can achieve a maximum frequency of two by:</p>

<ul>
	<li>Adding 0 to <code>nums[1]</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= k &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= numOperations &lt;= nums.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sweep Line`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
const maxFrequency = function (nums, k, numOperations) {
  const countMap = new Map();
  const lineMap = new Map();
  const candidates = new Set();
  let adjustable = 0;
  let result = 1;

  for (const num of nums) {
    const startNum = num - k;
    const endNum = num + k + 1;
    const count = countMap.get(num) ?? 0;
    const startCount = lineMap.get(startNum) ?? 0;
    const endCount = lineMap.get(endNum) ?? 0;

    countMap.set(num, count + 1);
    lineMap.set(startNum, startCount + 1);
    lineMap.set(endNum, endCount - 1);
    candidates.add(num);
    candidates.add(startNum);
    candidates.add(endNum);
  }

  const sortedCandidates = [...candidates].toSorted((a, b) => a - b);

  for (const num of sortedCandidates) {
    if (lineMap.has(num)) {
      adjustable += lineMap.get(num);
    }

    const count = countMap.get(num) ?? 0;
    const adjusted = adjustable - count;
    const operations = Math.min(adjusted, numOperations);

    result = Math.max(operations + count, result);
  }

  return result;
};
```
