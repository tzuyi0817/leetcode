# [3049. Earliest Second to Mark Indices II](https://leetcode.com/problems/earliest-second-to-mark-indices-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given two <strong>1-indexed</strong> integer arrays, <code>nums</code> and, <code>changeIndices</code>, having lengths <code>n</code> and <code>m</code>, respectively.</p>

<p>Initially, all indices in <code>nums</code> are unmarked. Your task is to mark <strong>all</strong> indices in <code>nums</code>.</p>

<p>In each second, <code>s</code>, in order from <code>1</code> to <code>m</code> (<strong>inclusive</strong>), you can perform <strong>one</strong> of the following operations:</p>

<ul>
	<li>Choose an index <code>i</code> in the range <code>[1, n]</code> and <strong>decrement</strong> <code>nums[i]</code> by <code>1</code>.</li>
	<li>Set <code>nums[changeIndices[s]]</code> to any <strong>non-negative</strong> value.</li>
	<li>Choose an index <code>i</code> in the range <code>[1, n]</code>, where <code>nums[i]</code> is <strong>equal</strong> to <code>0</code>, and <strong>mark</strong> index <code>i</code>.</li>
	<li>Do nothing.</li>
</ul>

<p>Return <em>an integer denoting the <strong>earliest second</strong> in the range </em><code>[1, m]</code><em> when <strong>all</strong> indices in </em><code>nums</code><em> can be marked by choosing operations optimally, or </em><code>-1</code><em> if it is impossible.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [3,2,3], changeIndices = [1,3,2,2,2,2,3]
<strong>Output:</strong> 6
<strong>Explanation:</strong> In this example, we have 7 seconds. The following operations can be performed to mark all indices:
Second 1: Set nums[changeIndices[1]] to 0. nums becomes [0,2,3].
Second 2: Set nums[changeIndices[2]] to 0. nums becomes [0,2,0].
Second 3: Set nums[changeIndices[3]] to 0. nums becomes [0,0,0].
Second 4: Mark index 1, since nums[1] is equal to 0.
Second 5: Mark index 2, since nums[2] is equal to 0.
Second 6: Mark index 3, since nums[3] is equal to 0.
Now all indices have been marked.
It can be shown that it is not possible to mark all indices earlier than the 6th second.
Hence, the answer is 6.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [0,0,1,2], changeIndices = [1,2,1,2,1,2,1,2]
<strong>Output:</strong> 7
<strong>Explanation:</strong> In this example, we have 8 seconds. The following operations can be performed to mark all indices:
Second 1: Mark index 1, since nums[1] is equal to 0.
Second 2: Mark index 2, since nums[2] is equal to 0.
Second 3: Decrement index 4 by one. nums becomes [0,0,1,1].
Second 4: Decrement index 4 by one. nums becomes [0,0,1,0].
Second 5: Decrement index 3 by one. nums becomes [0,0,0,0].
Second 6: Mark index 3, since nums[3] is equal to 0.
Second 7: Mark index 4, since nums[4] is equal to 0.
Now all indices have been marked.
It can be shown that it is not possible to mark all indices earlier than the 7th second.
Hence, the answer is 7.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3], changeIndices = [1,2,3]
<strong>Output:</strong> -1
<strong>Explanation: </strong>In this example, it can be shown that it is impossible to mark all indices, as we don't have enough seconds. 
Hence, the answer is -1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n == nums.length &lt;= 5000</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= m == changeIndices.length &lt;= 5000</code></li>
	<li><code>1 &lt;= changeIndices[i] &lt;= n</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Priority Queue`**

- Time complexity: <em>O(m+n+mlogm)</em>
- Space complexity: <em>O(m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[]} changeIndices
 * @return {number}
 */
const earliestSecondToMarkIndices = function (nums, changeIndices) {
  const n = nums.length;
  const m = changeIndices.length;
  const sum = nums.reduce((total, num) => total + num);
  const marked = new Set();
  const secondToIndexMap = new Map();
  let left = 0;
  let right = m;

  for (let second = 0; second < m; second++) {
    const index = changeIndices[second] - 1;
    const num = nums[index];

    if (num && !marked.has(index)) {
      secondToIndexMap.set(second, index);
      marked.add(index);
    }
  }

  const getHeapSum = heap => {
    let heapSum = 0;

    while (heap.size()) {
      heapSum += heap.pop();
    }

    return heapSum;
  };

  const isValidSecond = maxSecond => {
    const minHeap = new MinHeap();
    let marks = 0;

    for (let second = maxSecond - 1; second >= 0; second--) {
      if (secondToIndexMap.has(second)) {
        const index = secondToIndexMap.get(second);
        const num = nums[index];

        minHeap.push(num);

        if (marks) {
          marks -= 1;
        } else {
          minHeap.pop();
          marks += 1;
        }
      } else {
        marks += 1;
      }
    }

    const heapSize = minHeap.size();
    const cost = sum - getHeapSum(minHeap) + heapSize + n;

    return cost <= maxSecond;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    isValidSecond(mid) ? (right = mid - 1) : (left = mid + 1);
  }

  return left <= m ? left : -1;
};
```
