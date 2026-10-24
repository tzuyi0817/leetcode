# [3287. Find the Maximum Sequence Value of Array](https://leetcode.com/problems/find-the-maximum-sequence-value-of-array)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an integer array <code>nums</code> and a <strong>positive</strong> integer <code>k</code>.</p>

<p>The <strong>value</strong> of a sequence <code>seq</code> of size <code>2 * x</code> is defined as:</p>

<ul>
	<li><code>(seq[0] OR seq[1] OR ... OR seq[x - 1]) XOR (seq[x] OR seq[x + 1] OR ... OR seq[2 * x - 1])</code>.</li>
</ul>

<p>Return the <strong>maximum</strong> <strong>value</strong> of any <span data-keyword="subsequence-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">subsequence</button></span> of <code>nums</code> having size <code>2 * k</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,6,7], k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">5</span></p>

<p><strong>Explanation:</strong></p>

<p>The subsequence <code>[2, 7]</code> has the maximum value of <code>2 XOR 7 = 5</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,2,5,6,7], k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>The subsequence <code>[4, 5, 6, 7]</code> has the maximum value of <code>(4 OR 5) XOR (6 OR 7) = 2</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 400</code></li>
	<li><code>1 &lt;= nums[i] &lt; 2<sup>7</sup></code></li>
	<li><code>1 &lt;= k &lt;= nums.length / 2</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(nk\*Max(nums)+n\*Max(nums)<sup>2</sup>)</em>
- Space complexity: <em>O(nk\*Max(nums))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxValue = function (nums, k) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const maxBit = 32 - Math.clz32(maxNum);
  const maxXor = (1 << maxBit) - 1;

  const getPossibleORs = arr => {
    const dp = Array.from({ length: n }, () => {
      return new Array(k + 1).fill('').map(() => new Array(maxXor + 1).fill(false));
    });

    dp[0][1][arr[0]] = true;

    for (let index = 0; index < n; index++) {
      dp[index][0][0] = true;
    }

    for (let index = 1; index < n; index++) {
      for (let count = 1; count <= k; count++) {
        for (let num = 0; num <= maxXor; num++) {
          if (dp[index - 1][count][num]) {
            dp[index][count][num] = true;
          }

          if (dp[index - 1][count - 1][num]) {
            const nextNum = num | arr[index];

            dp[index][count][nextNum] = true;
          }
        }
      }
    }

    return dp;
  };

  const lefts = getPossibleORs(nums);
  const rights = getPossibleORs(nums.toReversed()).toReversed();
  let result = 0;

  for (let index = k - 1; index + k < n; index++) {
    for (let a = 0; a <= maxXor; a++) {
      for (let b = 0; b <= maxXor; b++) {
        if (lefts[index][k][a] && rights[index + 1][k][b]) {
          result = Math.max(a ^ b, result);
        }
      }
    }
  }

  return result;
};
```
