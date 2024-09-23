# [862. Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the length of the shortest non-empty <strong>subarray</strong> of </em><code>nums</code><em> with a sum of at least </em><code>k</code>. If there is no such <strong>subarray</strong>, return <code>-1</code>.</p>

<p>A <strong>subarray</strong> is a <strong>contiguous</strong> part of an array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> nums = [1], k = 1
<strong>Output:</strong> 1
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> nums = [1,2], k = 4
<strong>Output:</strong> -1
</pre><p><strong class="example">Example 3:</strong></p>
<pre><strong>Input:</strong> nums = [2,-1,2], k = 3
<strong>Output:</strong> 3
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Monotonic Queue`**
- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function(nums, k) {
    const n = nums.length;
    const prefixSum = Array(n).fill(0);
    const monotonicQueue = [-1];
    let result = n + 1;

    prefixSum[-1] = 0;

    for (let index = 0; index < n; index++) {
        prefixSum[index] = nums[index] + prefixSum[index - 1];
    }
    for (let index = 0; index < n; index++) {
        const sum = prefixSum[index];

        while (monotonicQueue.length && sum - prefixSum[monotonicQueue[0]] >= k) {
            result = Math.min(index - monotonicQueue[0], result);
            monotonicQueue.shift();
        }
        while (monotonicQueue.length && sum <= prefixSum[monotonicQueue.at(-1)]) {
            monotonicQueue.pop();
        }
        monotonicQueue.push(index);
    }
    return result === n + 1 ? -1 : result;
};
```
