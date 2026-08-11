# [3149. Find the Minimum Cost Array Permutation](https://leetcode.com/problems/find-the-minimum-cost-array-permutation)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an array <code>nums</code> which is a <span data-keyword="permutation" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_17_" data-state="closed" class="">permutation</button></span> of <code>[0, 1, 2, ..., n - 1]</code>. The <strong>score</strong> of any permutation of <code>[0, 1, 2, ..., n - 1]</code> named <code>perm</code> is defined as:</p>

<p><code>score(perm) = |perm[0] - nums[perm[1]]| + |perm[1] - nums[perm[2]]| + ... + |perm[n - 1] - nums[perm[0]]|</code></p>

<p>Return the permutation <code>perm</code> which has the <strong>minimum</strong> possible score. If <em>multiple</em> permutations exist with this score, return the one that is <span data-keyword="lexicographically-smaller-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_18_" data-state="closed" class="">lexicographically smallest</button></span> among them.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,0,2]</span></p>

<p><strong>Output:</strong> <span class="example-io">[0,1,2]</span></p>

<p><strong>Explanation:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2024/04/04/example0gif.gif" style="width: 235px; height: 235px;"></strong></p>

<p>The lexicographically smallest permutation with minimum cost is <code>[0,1,2]</code>. The cost of this permutation is <code>|0 - 0| + |1 - 2| + |2 - 1| = 2</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [0,2,1]</span></p>

<p><strong>Output:</strong> <span class="example-io">[0,2,1]</span></p>

<p><strong>Explanation:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2024/04/04/example1gif.gif" style="width: 235px; height: 235px;"></strong></p>

<p>The lexicographically smallest permutation with minimum cost is <code>[0,2,1]</code>. The cost of this permutation is <code>|0 - 1| + |2 - 2| + |1 - 0| = 2</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n == nums.length &lt;= 14</code></li>
	<li><code>nums</code> is a permutation of <code>[0, 1, 2, ..., n - 1]</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(2<sup>n</sup>\*n<sup>2</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>\*n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findPermutation = function (nums) {
  const n = nums.length;
  const totalMask = 1 << n;
  const dp = Array.from({ length: n }, () => new Array(totalMask).fill(-1));
  const bestPick = Array.from({ length: n }, () => new Array(totalMask).fill(-1));

  const getScore = (last, mask) => {
    if (popcount(mask) === n) {
      return Math.abs(last - nums[0]);
    }

    if (dp[last][mask] !== -1) {
      return dp[last][mask];
    }

    let result = Number.MAX_SAFE_INTEGER;

    for (let index = 1; index < n; index++) {
      if ((mask >> index) & 1) continue;

      const nextMask = mask | (1 << index);
      const score = Math.abs(last - nums[index]) + getScore(index, nextMask);

      if (score < result) {
        result = score;
        bestPick[last][mask] = index;
      }
    }

    dp[last][mask] = result;

    return result;
  };

  const result = [];
  let last = 0;
  let mask = 1;

  getScore(0, 1);

  for (let index = 0; index < n; index++) {
    result.push(last);
    last = bestPick[last][mask];
    mask |= 1 << last;
  }

  return result;
};

function popcount(mask) {
  let count = 0;

  while (mask) {
    mask &= mask - 1;
    count += 1;
  }

  return count;
}
```
