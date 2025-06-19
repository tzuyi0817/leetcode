# [1799. Maximize Score After N Operations](https://leetcode.com/problems/maximize-score-after-n-operations)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given <code>nums</code>, an array of positive integers of size <code>2 * n</code>. You must perform <code>n</code> operations on this array.</p>

<p>In the <code>i<sup>th</sup></code> operation <strong>(1-indexed)</strong>, you will:</p>

<ul>
	<li>Choose two elements, <code>x</code> and <code>y</code>.</li>
	<li>Receive a score of <code>i * gcd(x, y)</code>.</li>
	<li>Remove <code>x</code> and <code>y</code> from <code>nums</code>.</li>
</ul>

<p>Return <em>the maximum score you can receive after performing </em><code>n</code><em> operations.</em></p>

<p>The function <code>gcd(x, y)</code> is the greatest common divisor of <code>x</code> and <code>y</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2]
<strong>Output:</strong> 1
<strong>Explanation:</strong>&nbsp;The optimal choice of operations is:
(1 * gcd(1, 2)) = 1
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,4,6,8]
<strong>Output:</strong> 11
<strong>Explanation:</strong>&nbsp;The optimal choice of operations is:
(1 * gcd(3, 6)) + (2 * gcd(4, 8)) = 3 + 8 = 11
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4,5,6]
<strong>Output:</strong> 14
<strong>Explanation:</strong>&nbsp;The optimal choice of operations is:
(1 * gcd(1, 5)) + (2 * gcd(2, 4)) + (3 * gcd(3, 6)) = 1 + 4 + 9 = 14
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 7</code></li>
	<li><code>nums.length == 2 * n</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(2<sup>n</sup>\*n<sup>2</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxScore = function (nums) {
  const n = nums.length;
  const totalMask = (1 << n) - 1;
  const dp = Array.from({ length: totalMask + 1 }, () => -1);

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const receiveScore = (mask, i) => {
    if (mask === totalMask) return 0;
    if (dp[mask] !== -1) return dp[mask];
    let result = 0;

    for (let a = 0; a < n - 1; a++) {
      if (mask & (1 << a)) continue;

      for (let b = a + 1; b < n; b++) {
        if (mask & (1 << b)) continue;
        const score = i * gcd(nums[a], nums[b]);
        const nextMask = mask | (1 << a) | (1 << b);
        const totalScore = score + receiveScore(nextMask, i + 1);

        result = Math.max(totalScore, result);
      }
    }

    dp[mask] = result;

    return result;
  };

  return receiveScore(0, 1);
};
```
