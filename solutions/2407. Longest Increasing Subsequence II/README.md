# [2407. Longest Increasing Subsequence II](https://leetcode.com/problems/longest-increasing-subsequence-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code> and an integer <code>k</code>.</p>

<p>Find the longest subsequence of <code>nums</code> that meets the following requirements:</p>

<ul>
	<li>The subsequence is <strong>strictly increasing</strong> and</li>
	<li>The difference between adjacent elements in the subsequence is <strong>at most</strong> <code>k</code>.</li>
</ul>

<p>Return<em> the length of the <strong>longest</strong> <strong>subsequence</strong> that meets the requirements.</em></p>

<p>A <strong>subsequence</strong> is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [4,2,1,4,3,4,5,8,15], k = 3
<strong>Output:</strong> 5
<strong>Explanation:</strong>
The longest subsequence that meets the requirements is [1,3,4,5,8].
The subsequence has a length of 5, so we return 5.
Note that the subsequence [1,3,4,5,8,15] does not meet the requirements because 15 - 8 = 7 is larger than 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [7,4,5,1,8,12,4,7], k = 5
<strong>Output:</strong> 4
<strong>Explanation:</strong>
The longest subsequence that meets the requirements is [4,5,8,12].
The subsequence has a length of 4, so we return 4.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,5], k = 1
<strong>Output:</strong> 1
<strong>Explanation:</strong>
The longest subsequence that meets the requirements is [1].
The subsequence has a length of 1, so we return 1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i], k &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(nlog\*Max(nums))</em>
- Space complexity: <em>O(Max(nums))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const lengthOfLIS = function (nums, k) {
  const maxNum = Math.max(...nums);
  const tree = new SegmentTree(maxNum + 1);
  let result = 0;

  for (const num of nums) {
    const min = Math.max(0, num - k);
    const max = num - 1;
    const longestSubseq = tree.query(min, max) + 1;

    tree.update(num, longestSubseq);
    result = Math.max(longestSubseq, result);
  }

  return result;
};

class SegmentTree {
  constructor(n) {
    this.n = n;
    this.longestSubseq = Array.from({ length: this.n * 4 }, () => 0);
  }

  update(num, len) {
    this.#update(0, 0, this.n - 1, num, len);
  }

  #update(index, low, high, num, len) {
    if (num < low || num > high) return;

    if (low === high) {
      this.longestSubseq[index] = Math.max(len, this.longestSubseq[index]);
      return;
    }

    const mid = Math.floor((low + high) / 2);

    if (num <= mid) {
      this.#update(index * 2 + 1, low, mid, num, len);
    } else {
      this.#update(index * 2 + 2, mid + 1, high, num, len);
    }

    this.longestSubseq[index] = Math.max(this.longestSubseq[index * 2 + 1], this.longestSubseq[index * 2 + 2]);
  }

  query(left, right) {
    return this.#query(0, 0, this.n - 1, left, right);
  }

  #query(index, low, high, left, right) {
    if (left > high || right < low) return 0;

    if (low >= left && high <= right) {
      return this.longestSubseq[index];
    }

    const mid = Math.floor((low + high) / 2);
    const leftQuery = this.#query(index * 2 + 1, low, mid, left, right);
    const rightQuery = this.#query(index * 2 + 2, mid + 1, high, left, right);

    return Math.max(leftQuery, rightQuery);
  }
}
```
