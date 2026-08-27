# [3139. Minimum Cost to Equalize Array](https://leetcode.com/problems/minimum-cost-to-equalize-array)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>nums</code> and two integers <code>cost1</code> and <code>cost2</code>. You are allowed to perform <strong>either</strong> of the following operations <strong>any</strong> number of times:</p>

<ul>
	<li>Choose an index <code>i</code> from <code>nums</code> and <strong>increase</strong> <code>nums[i]</code> by <code>1</code> for a cost of <code>cost1</code>.</li>
	<li>Choose two <strong>different</strong> indices <code>i</code>, <code>j</code>, from <code>nums</code> and <strong>increase</strong> <code>nums[i]</code> and <code>nums[j]</code> by <code>1</code> for a cost of <code>cost2</code>.</li>
</ul>

<p>Return the <strong>minimum</strong> <strong>cost</strong> required to make all elements in the array <strong>equal</strong><em>. </em></p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,1], cost1 = 5, cost2 = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">15</span></p>

<p><strong>Explanation: </strong></p>

<p>The following operations can be performed to make the values equal:</p>

<ul>
	<li>Increase <code>nums[1]</code> by 1 for a cost of 5. <code>nums</code> becomes <code>[4,2]</code>.</li>
	<li>Increase <code>nums[1]</code> by 1 for a cost of 5. <code>nums</code> becomes <code>[4,3]</code>.</li>
	<li>Increase <code>nums[1]</code> by 1 for a cost of 5. <code>nums</code> becomes <code>[4,4]</code>.</li>
</ul>

<p>The total cost is 15.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,3,3,3,5], cost1 = 2, cost2 = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">6</span></p>

<p><strong>Explanation: </strong></p>

<p>The following operations can be performed to make the values equal:</p>

<ul>
	<li>Increase <code>nums[0]</code> and <code>nums[1]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[3,4,3,3,5]</code>.</li>
	<li>Increase <code>nums[0]</code> and <code>nums[2]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[4,4,4,3,5]</code>.</li>
	<li>Increase <code>nums[0]</code> and <code>nums[3]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[5,4,4,4,5]</code>.</li>
	<li>Increase <code>nums[1]</code> and <code>nums[2]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[5,5,5,4,5]</code>.</li>
	<li>Increase <code>nums[3]</code> by 1 for a cost of 2. <code>nums</code> becomes <code>[5,5,5,5,5]</code>.</li>
</ul>

<p>The total cost is 6.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [3,5,3], cost1 = 1, cost2 = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The following operations can be performed to make the values equal:</p>

<ul>
	<li>Increase <code>nums[0]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[4,5,3]</code>.</li>
	<li>Increase <code>nums[0]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[5,5,3]</code>.</li>
	<li>Increase <code>nums[2]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[5,5,4]</code>.</li>
	<li>Increase <code>nums[2]</code> by 1 for a cost of 1. <code>nums</code> becomes <code>[5,5,5]</code>.</li>
</ul>

<p>The total cost is 4.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
	<li><code>1 &lt;= cost1 &lt;= 10<sup>6</sup></code></li>
	<li><code>1 &lt;= cost2 &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(Max(nums))</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} cost1
 * @param {number} cost2
 * @return {number}
 */
const minCostToEqualizeArray = function (nums, cost1, cost2) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const sum = nums.reduce((total, num) => total + BigInt(num), 0n);
  const minNum = Math.min(...nums);
  const maxNum = Math.max(...nums);
  const bigCost1 = BigInt(cost1);
  const bigCost2 = BigInt(cost2);

  if (cost1 * 2 <= cost2 || n < 3) {
    const diff = BigInt(maxNum * n) - sum;

    return Number((diff * bigCost1) % MODULO);
  }

  let result = -1n;

  for (let target = maxNum; target <= maxNum * 2; target++) {
    const maxGap = BigInt(target - minNum);
    const totalGap = BigInt(target * n) - sum;
    const limit1 = totalGap / 2n;
    const limit2 = totalGap - maxGap;
    const pairs = Math.min(limit1, limit2);
    const totalCost1 = bigCost1 * (totalGap - 2n * pairs);
    const totalCost2 = bigCost2 * pairs;
    const cost = totalCost1 + totalCost2;

    if (result === -1n || (result !== -1n && result > cost)) {
      result = cost;
    }
  }

  return Number(result % MODULO);
};
```
