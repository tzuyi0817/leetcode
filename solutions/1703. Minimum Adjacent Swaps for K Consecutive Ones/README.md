# [1703. Minimum Adjacent Swaps for K Consecutive Ones](https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array, <code>nums</code>, and an integer <code>k</code>. <code>nums</code> comprises of only <code>0</code>'s and <code>1</code>'s. In one move, you can choose two <strong>adjacent</strong> indices and swap their values.</p>

<p>Return <em>the <strong>minimum</strong> number of moves required so that </em><code>nums</code><em> has </em><code>k</code><em> <strong>consecutive</strong> </em><code>1</code><em>'s</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,0,0,1,0,1], k = 2
<strong>Output:</strong> 1
<strong>Explanation:</strong> In 1 move, nums could be [1,0,0,0,<u>1</u>,<u>1</u>] and have 2 consecutive 1's.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,0,0,0,0,0,1,1], k = 3
<strong>Output:</strong> 5
<strong>Explanation:</strong> In 5 moves, the leftmost 1 can be shifted right until nums = [0,0,0,0,0,<u>1</u>,<u>1</u>,<u>1</u>].
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,1,0,1], k = 2
<strong>Output:</strong> 0
<strong>Explanation:</strong> nums already has 2 consecutive 1's.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>nums[i]</code> is <code>0</code> or <code>1</code>.</li>
	<li><code>1 &lt;= k &lt;= sum(nums)</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Sliding Window`**

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
const minMoves = function (nums, k) {
  const n = nums.length;
  const ones = [];

  for (let index = 0; index < n; index++) {
    if (nums[index]) {
      ones.push(index);
    }
  }

  const getMedian = index => Math.floor((index + index + k - 1) / 2);
  const median = getMedian(0);
  let moves = 0;

  for (let index = 0; index < k; index++) {
    moves += Math.abs(ones[median] - ones[index]);
  }

  let result = moves;

  for (let index = 1; index <= ones.length - k; index++) {
    const oldMedian = getMedian(index - 1);
    const newMedian = getMedian(index);

    if (k % 2) {
      moves += ones[newMedian] - ones[oldMedian];
    }

    moves -= ones[newMedian] - ones[index - 1];
    moves += ones[index + k - 1] - ones[newMedian];
    result = Math.min(moves, result);
  }

  const nthSum = n => ((1 + n) * n) / 2;
  const leftNthSum = nthSum(Math.floor((k - 1) / 2));
  const rightNthSum = nthSum(Math.floor(k / 2));

  return result - leftNthSum - rightNthSum;
};
```
