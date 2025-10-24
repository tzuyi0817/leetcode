# [2172. Maximum AND Sum of Array](https://leetcode.com/problems/maximum-and-sum-of-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code> of length <code>n</code> and an integer <code>numSlots</code> such that <code>2 * numSlots &gt;= n</code>. There are <code>numSlots</code> slots numbered from <code>1</code> to <code>numSlots</code>.</p>

<p>You have to place all <code>n</code> integers into the slots such that each slot contains at <strong>most</strong> two numbers. The <strong>AND sum</strong> of a given placement is the sum of the <strong>bitwise</strong> <code>AND</code> of every number with its respective slot number.</p>

<ul>
	<li>For example, the <strong>AND sum</strong> of placing the numbers <code>[1, 3]</code> into slot <u><code>1</code></u> and <code>[4, 6]</code> into slot <u><code>2</code></u> is equal to <code>(1 AND <u>1</u>) + (3 AND <u>1</u>) + (4 AND <u>2</u>) + (6 AND <u>2</u>) = 1 + 1 + 0 + 2 = 4</code>.</li>
</ul>

<p>Return <em>the maximum possible <strong>AND sum</strong> of </em><code>nums</code><em> given </em><code>numSlots</code><em> slots.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4,5,6], numSlots = 3
<strong>Output:</strong> 9
<strong>Explanation:</strong> One possible placement is [1, 4] into slot <u>1</u>, [2, 6] into slot <u>2</u>, and [3, 5] into slot <u>3</u>. 
This gives the maximum AND sum of (1 AND <u>1</u>) + (4 AND <u>1</u>) + (2 AND <u>2</u>) + (6 AND <u>2</u>) + (3 AND <u>3</u>) + (5 AND <u>3</u>) = 1 + 0 + 2 + 2 + 3 + 1 = 9.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,3,10,4,7,1], numSlots = 9
<strong>Output:</strong> 24
<strong>Explanation:</strong> One possible placement is [1, 1] into slot <u>1</u>, [3] into slot <u>3</u>, [4] into slot <u>4</u>, [7] into slot <u>7</u>, and [10] into slot <u>9</u>.
This gives the maximum AND sum of (1 AND <u>1</u>) + (1 AND <u>1</u>) + (3 AND <u>3</u>) + (4 AND <u>4</u>) + (7 AND <u>7</u>) + (10 AND <u>9</u>) = 1 + 1 + 3 + 4 + 7 + 8 = 24.
Note that slots 2, 5, 6, and 8 are empty which is permitted.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= numSlots &lt;= 9</code></li>
	<li><code>1 &lt;= n &lt;= 2 * numSlots</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 15</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(n\*2<sup>n</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} numSlots
 * @return {number}
 */
const maximumANDSum = function (nums, numSlots) {
  const n = nums.length;
  const dp = Array.from({ length: 1 << (numSlots * 2) }, () => -1);

  const maxSum = (index, slotMask) => {
    if (index >= n) return 0;
    if (dp[slotMask] !== -1) return dp[slotMask];

    const num = nums[index];
    let result = 0;

    for (let slot = 0; slot < numSlots * 2; slot++) {
      const numSlot = Math.floor(slot / 2) + 1;

      if ((slotMask >> slot) & 1) continue;

      const nextSlotMask = slotMask | (1 << slot);
      const sum = (num & numSlot) + maxSum(index + 1, nextSlotMask);

      result = Math.max(sum, result);
    }

    dp[slotMask] = result;

    return result;
  };

  return maxSum(0, 0);
};
```
