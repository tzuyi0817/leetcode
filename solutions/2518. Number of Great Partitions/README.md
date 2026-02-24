# [2518. Number of Great Partitions](https://leetcode.com/problems/number-of-great-partitions)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>nums</code> consisting of <strong>positive</strong> integers and an integer <code>k</code>.</p>

<p><strong>Partition</strong> the array into two ordered <strong>groups</strong> such that each element is in exactly <strong>one</strong> group. A partition is called great if the <strong>sum</strong> of elements of each group is greater than or equal to <code>k</code>.</p>

<p>Return <em>the number of <strong>distinct</strong> great partitions</em>. Since the answer may be too large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>Two partitions are considered distinct if some element <code>nums[i]</code> is in different groups in the two partitions.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4], k = 4
<strong>Output:</strong> 6
<strong>Explanation:</strong> The great partitions are: ([1,2,3], [4]), ([1,3], [2,4]), ([1,4], [2,3]), ([2,3], [1,4]), ([2,4], [1,3]) and ([4], [1,2,3]).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,3,3], k = 4
<strong>Output:</strong> 0
<strong>Explanation:</strong> There are no great partitions for this array.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [6,6], k = 2
<strong>Output:</strong> 2
<strong>Explanation:</strong> We can either put nums[0] in the first partition or in the second partition.
The great partitions will be ([6], [6]) and ([6], [6]).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length, k &lt;= 1000</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nk)</em>
- Space complexity: <em>O(k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countPartitions = function (nums, k) {
  const n = nums.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const sum = nums.reduce((total, num) => total + num);

  const modPow = (base, exponent) => {
    let result = 1n;

    while (exponent) {
      if (exponent % 2n) {
        result = (result * base) % MODULO;
      }

      base = (base * base) % MODULO;
      exponent /= 2n;
    }

    return result;
  };

  const dp = Array.from({ length: k + 1 }, () => 0n);
  let result = modPow(2n, BigInt(n));

  dp[0] = 1n;

  for (const num of nums) {
    for (let index = k; index >= num; index--) {
      dp[index] = (dp[index] + dp[index - num]) % MODULO;
    }
  }

  for (let index = 0; index < k; index++) {
    if (sum - index < k) {
      result -= dp[index];
    } else {
      result -= dp[index] * 2n;
    }
  }

  return Number(((result % MODULO) + MODULO) % MODULO);
};
```
