# [3077. Maximum Strength of K Disjoint Subarrays](https://leetcode.com/problems/maximum-strength-of-k-disjoint-subarrays)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an array of integers <code>nums</code> with length <code>n</code>, and a positive <strong>odd</strong> integer <code>k</code>.</p>

<p>Select exactly <b><code>k</code></b> disjoint <span data-keyword="subarray-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1l_" data-state="closed" class="">subarrays</button></span> <b><code>sub<sub>1</sub>, sub<sub>2</sub>, ..., sub<sub>k</sub></code></b> from <code>nums</code> such that the last element of <code>sub<sub>i</sub></code> appears before the first element of <code>sub<sub>{i+1}</sub></code> for all <code>1 &lt;= i &lt;= k-1</code>. The goal is to maximize their combined strength.</p>

<p>The strength of the selected subarrays is defined as:</p>

<p><code>strength = k * sum(sub<sub>1</sub>)- (k - 1) * sum(sub<sub>2</sub>) + (k - 2) * sum(sub<sub>3</sub>) - ... - 2 * sum(sub<sub>{k-1}</sub>) + sum(sub<sub>k</sub>)</code></p>

<p>where <b><code>sum(sub<sub>i</sub>)</code></b> is the sum of the elements in the <code>i</code>-th subarray.</p>

<p>Return the <strong>maximum</strong> possible strength that can be obtained from selecting exactly <b><code>k</code></b> disjoint subarrays from <code>nums</code>.</p>

<p><strong>Note</strong> that the chosen subarrays <strong>don't</strong> need to cover the entire array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,-1,2], k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">22</span></p>

<p><strong>Explanation:</strong></p>

<p>The best possible way to select 3 subarrays is: nums[0..2], nums[3..3], and nums[4..4]. The strength is calculated as follows:</p>

<p><code>strength = 3 * (1 + 2 + 3) - 2 * (-1) + 2 = 22</code></p>

<p>&nbsp;</p>

<p><strong class="example">Example 2:</strong></p>

<p><strong>Input:</strong> <span class="example-io">nums = [12,-2,-2,-2,-2], k = 5</span></p>

<p><strong>Output:</strong> <span class="example-io">64</span></p>

<p><strong>Explanation:</strong></p>

<p>The only possible way to select 5 disjoint subarrays is: nums[0..0], nums[1..1], nums[2..2], nums[3..3], and nums[4..4]. The strength is calculated as follows:</p>

<p><code>strength = 5 * 12 - 4 * (-2) + 3 * (-2) - 2 * (-2) + (-2) = 64</code></p>

<p><strong class="example">Example 3:</strong></p>

<p><strong>Input:</strong> <span class="example-io">nums = [-1,-2,-3], k = </span>1</p>

<p><strong>Output:</strong> <span class="example-io">-1</span></p>

<p><strong>Explanation:</strong></p>

<p>The best possible way to select 1 subarray is: nums[0..0]. The strength is -1.</p>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= k &lt;= n</code></li>
	<li><code>1 &lt;= n * k &lt;= 10<sup>6</sup></code></li>
	<li><code>k</code> is odd.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maximumStrength = function (nums, k) {
  const SAFE_MIN = Number.MIN_SAFE_INTEGER;
  const n = nums.length;
  const dp = Array.from({ length: n }, () => {
    return new Array(2)
      .fill('')
      .map(() => new Array(k + 1).fill(null));
  });

  const getMaxStrength = (index, kth, isStart) => {
    if (n - index < kth) return SAFE_MIN;
    if (index === n) return kth ? SAFE_MIN : 0;
    if (kth === 0) return 0;

    const s = Number(isStart);

    if (dp[index][s][kth] !== null) return dp[index][s][kth];

    const num = nums[index];
    const skip = isStart ? getMaxStrength(index + 1, kth, true) : SAFE_MIN;
    const strength = kth * (kth % 2 ? 1 : -1) * num;
    const includeNum = getMaxStrength(index + 1, kth, false) + strength;
    const startSub = getMaxStrength(index + 1, kth - 1, true) + strength;
    const result = Math.max(skip, includeNum, startSub);

    dp[index][s][kth] = result;

    return result;
  };

  return getMaxStrength(0, k, true);
};
```
