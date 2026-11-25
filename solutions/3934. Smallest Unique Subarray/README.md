# [3934. Smallest Unique Subarray](https://leetcode.com/problems/smallest-unique-subarray)

## Description

<div class="xg0bVG_html" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an integer array <code>nums</code>.</p>

<p>Find the <strong>minimum </strong>length of a <span data-keyword="subarray" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_u_" data-state="closed" class="">subarray</button></span> that is <strong>not</strong> <strong>identical</strong> to any other <strong>subarray</strong> in <code>nums</code>.</p>

<p>Return an integer denoting the <strong>minimum possible length</strong> of such a <strong>subarray</strong>.</p>

<p>Two <strong>subarrays</strong> are considered identical if they have the same length and the same elements in corresponding positions.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [3,3,3]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Subarrays of length 1: <code>[3]</code> → appears 3 times</li>
	<li>Subarrays of length 2: <code>[3, 3]</code> → appears 2 times</li>
	<li>Subarrays of length 3: <code>[3, 3, 3]</code> → appears once</li>
</ul>

<p>The subarray <code>[3, 3, 3]</code> is unique, so the smallest unique subarray length is 3.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,1,2,3,3]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>Subarrays of length 1:</p>

<ul>
	<li><code>[2]</code> → appears 2 times</li>
	<li><code>[1]</code> → appears once</li>
	<li><code>[3]</code> → appears 2 times</li>
</ul>
The subarray <code>[1]</code> is unique, so the smallest unique subarray length is 1.</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,1,2,2,1]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>Subarrays of length 1:</p>

<ul>
	<li><code>[1]</code> → appears 3 times</li>
	<li><code>[2]</code> → appears 2 times</li>
</ul>

<p>Subarrays of length 2:</p>

<ul>
	<li><code>[1, 1]</code> → appears once</li>
	<li><code>[1, 2]</code> → appears once</li>
	<li><code>[2, 2]</code> → appears once</li>
	<li><code>[2, 1]</code> → appears once</li>
</ul>
There is at least one subarray of length 2 that is unique, so the smallest unique subarray length is 2.</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Rolling Hash`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const smallestUniqueSubarray = function (nums) {
  const BASE_A = 100_019;
  const BASE_B = 100_043;
  const MOD_A = 10 ** 9 + 7;
  const MOD_B = 10 ** 9 + 9;
  const n = nums.length;
  let left = 1;
  let right = n;

  const hasUniqueSub = len => {
    const hashMap = new Map();
    let lenA = 1;
    let lenB = 1;
    let hashA = 0;
    let hashB = 0;

    for (let index = 0; index < len; index++) {
      lenA = (lenA * BASE_A) % MOD_A;
      lenB = (lenB * BASE_B) % MOD_B;
    }

    for (let index = 0; index < len; index++) {
      const num = nums[index];

      hashA = (hashA * BASE_A + num) % MOD_A;
      hashB = (hashB * BASE_B + num) % MOD_B;
    }

    hashMap.set(`${hashA},${hashB}`, 1);

    for (let index = len; index < n; index++) {
      const num = nums[index];
      const prev = nums[index - len];

      hashA = (hashA * BASE_A + num - ((lenA * prev) % MOD_A) + MOD_A) % MOD_A;
      hashB = (hashB * BASE_B + num - ((lenB * prev) % MOD_B) + MOD_B) % MOD_B;

      const key = `${hashA},${hashB}`;
      const count = hashMap.get(key) ?? 0;

      hashMap.set(key, count + 1);
    }

    for (const count of hashMap.values()) {
      if (count === 1) return true;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    hasUniqueSub(mid) ? (right = mid - 1) : (left = mid + 1);
  }

  return left;
};
```
