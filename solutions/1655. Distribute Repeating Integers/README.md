# [1655. Distribute Repeating Integers](https://leetcode.com/problems/distribute-repeating-integers)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array of <code>n</code> integers, <code>nums</code>, where there are at most <code>50</code> unique values in the array. You are also given an array of <code>m</code> customer order quantities, <code>quantity</code>, where <code>quantity[i]</code> is the amount of integers the <code>i<sup>th</sup></code> customer ordered. Determine if it is possible to distribute <code>nums</code> such that:</p>

<ul>
	<li>The <code>i<sup>th</sup></code> customer gets <strong>exactly</strong> <code>quantity[i]</code> integers,</li>
	<li>The integers the <code>i<sup>th</sup></code> customer gets are <strong>all equal</strong>, and</li>
	<li>Every customer is satisfied.</li>
</ul>

<p>Return <code>true</code><em> if it is possible to distribute </em><code>nums</code><em> according to the above conditions</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4], quantity = [2]
<strong>Output:</strong> false
<strong>Explanation:</strong> The 0<sup>th</sup> customer cannot be given two different integers.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,3], quantity = [2]
<strong>Output:</strong> true
<strong>Explanation:</strong> The 0<sup>th</sup> customer is given [3,3]. The integers [1,2] are not used.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [1,1,2,2], quantity = [2,2]
<strong>Output:</strong> true
<strong>Explanation:</strong> The 0<sup>th</sup> customer is given [1,1], and the 1st customer is given [2,2].
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>
	<li><code>m == quantity.length</code></li>
	<li><code>1 &lt;= m &lt;= 10</code></li>
	<li><code>1 &lt;= quantity[i] &lt;= 10<sup>5</sup></code></li>
	<li>There are at most <code>50</code> unique values in <code>nums</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(50\*3<sup>m</sup>)</em>
- Space complexity: <em>O(50\*2<sup>m</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
const canDistribute = function (nums, quantity) {
  const m = quantity.length;
  const numMap = new Map();
  const memo = new Map();
  const totalMask = (1 << m) - 1;

  for (const num of nums) {
    const count = numMap.get(num) ?? 0;

    numMap.set(num, count + 1);
  }
  const counts = [...numMap.values()];
  const sums = Array.from({ length: 1 << m }, () => 0);

  for (let mask = 1; mask <= totalMask; mask++) {
    for (let index = 0; index < m; index++) {
      if (mask & (1 << index)) {
        sums[mask] += quantity[index];
      }
    }
  }

  const distributeInteger = (index, mask) => {
    if (mask === 0) return true;
    if (index >= counts.length) return false;
    const key = `${index},${mask}`;

    if (memo.has(key)) return memo.get(key);
    if (distributeInteger(index + 1, mask)) {
      memo.set(key, true);

      return true;
    }
    let subMask = mask;

    while (subMask) {
      if (sums[subMask] <= counts[index] && distributeInteger(index + 1, mask ^ subMask)) {
        memo.set(key, true);

        return true;
      }

      subMask = (subMask - 1) & mask;
    }

    memo.set(key, false);

    return false;
  };

  return distributeInteger(0, totalMask);
};
```
