# [1787. Make the XOR of All Segments Equal to Zero](https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>nums</code>​​​ and an integer <code>k</code>​​​​​. The <font face="monospace">XOR</font> of a segment <code>[left, right]</code> where <code>left &lt;= right</code> is the <code>XOR</code> of all the elements with indices between <code>left</code> and <code>right</code>, inclusive: <code>nums[left] XOR nums[left+1] XOR ... XOR nums[right]</code>.</p>

<p>Return <em>the minimum number of elements to change in the array </em>such that the <code>XOR</code> of all segments of size <code>k</code>​​​​​​ is equal to zero.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,0,3,0], k = 1
<strong>Output:</strong> 3
<strong>Explanation: </strong>Modify the array from [<u><strong>1</strong></u>,<u><strong>2</strong></u>,0,<u><strong>3</strong></u>,0] to from [<u><strong>0</strong></u>,<u><strong>0</strong></u>,0,<u><strong>0</strong></u>,0].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,4,5,2,1,7,3,4,7], k = 3
<strong>Output:</strong> 3
<strong>Explanation: </strong>Modify the array from [3,4,<strong><u>5</u></strong>,<strong><u>2</u></strong>,<strong><u>1</u></strong>,7,3,4,7] to [3,4,<strong><u>7</u></strong>,<strong><u>3</u></strong>,<strong><u>4</u></strong>,7,3,4,7].
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,4,1,2,5,1,2,6], k = 3
<strong>Output:</strong> 3
<strong>Explanation: </strong>Modify the array from [1,2,<strong><u>4,</u></strong>1,2,<strong><u>5</u></strong>,1,2,<strong><u>6</u></strong>] to [1,2,<strong><u>3</u></strong>,1,2,<strong><u>3</u></strong>,1,2,<strong><u>3</u></strong>].</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= nums.length &lt;= 2000</code></li>
	<li><code>​​​​​​0 &lt;= nums[i] &lt; 2<sup>10</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(nk)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minChanges = function (nums, k) {
  const MAX_XOR = 1024;
  const n = nums.length;
  const counts = Array.from({ length: k }, () => new Map());
  const dp = Array.from({ length: k }, () => new Array(MAX_XOR).fill(n));

  const getGroupCount = index => Math.floor(n / k) + (n % k > index ? 1 : 0);

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const group = counts[index % k];
    const count = group.get(num) ?? 0;

    group.set(num, count + 1);
  }

  for (let xor = 0; xor < MAX_XOR; xor++) {
    const count = counts[k - 1].get(xor) ?? 0;

    dp[k - 1][xor] = getGroupCount(k - 1) - count;
  }

  for (let index = k - 2; index >= 0; index--) {
    const groupCount = getGroupCount(index);
    const nextMin = Math.min(...dp[index + 1]);

    for (let xor = 0; xor < MAX_XOR; xor++) {
      dp[index][xor] = groupCount + nextMin;

      for (const [num, count] of counts[index]) {
        const cost = groupCount - count;

        dp[index][xor] = Math.min(dp[index][xor], dp[index + 1][xor ^ num] + cost);
      }
    }
  }

  return dp[0][0];
};
```
