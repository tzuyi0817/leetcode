# [3266. Final Array State After K Multiplication Operations II](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an integer array <code>nums</code>, an integer <code>k</code>, and an integer <code>multiplier</code>.</p>

<p>You need to perform <code>k</code> operations on <code>nums</code>. In each operation:</p>

<ul>
	<li>Find the <strong>minimum</strong> value <code>x</code> in <code>nums</code>. If there are multiple occurrences of the minimum value, select the one that appears <strong>first</strong>.</li>
	<li>Replace the selected minimum value <code>x</code> with <code>x * multiplier</code>.</li>
</ul>

<p>After the <code>k</code> operations, apply <strong>modulo</strong> <code>10<sup>9</sup> + 7</code> to every value in <code>nums</code>.</p>

<p>Return an integer array denoting the <em>final state</em> of <code>nums</code> after performing all <code>k</code> operations and then applying the modulo.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,1,3,5,6], k = 5, multiplier = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">[8,4,6,5,6]</span></p>

<p><strong>Explanation:</strong></p>

<table><tbody><tr><th>Operation</th><th>Result</th></tr><tr><td>After operation 1</td><td>[2, 2, 3, 5, 6]</td></tr><tr><td>After operation 2</td><td>[4, 2, 3, 5, 6]</td></tr><tr><td>After operation 3</td><td>[4, 4, 3, 5, 6]</td></tr><tr><td>After operation 4</td><td>[4, 4, 6, 5, 6]</td></tr><tr><td>After operation 5</td><td>[8, 4, 6, 5, 6]</td></tr><tr><td>After applying modulo</td><td>[8, 4, 6, 5, 6]</td></tr></tbody></table>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [100000,2000], k = 2, multiplier = 1000000</span></p>

<p><strong>Output:</strong> <span class="example-io">[999999307,999999993]</span></p>

<p><strong>Explanation:</strong></p>

<table><tbody><tr><th>Operation</th><th>Result</th></tr><tr><td>After operation 1</td><td>[100000, 2000000000]</td></tr><tr><td>After operation 2</td><td>[100000000000, 2000000000]</td></tr><tr><td>After applying modulo</td><td>[999999307, 999999993]</td></tr></tbody></table>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= multiplier &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue`**

- Time complexity: <em>O(nlogn+klogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
const getFinalState = function (nums, k, multiplier) {
  if (multiplier === 1) return nums;

  const n = nums.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const maxNum = BigInt(Math.max(...nums));
  const mult = BigInt(multiplier);
  const minHeap = new Heap((a, b) => {
    return a.num - b.num || a.index - b.index;
  });

  for (let index = 0; index < n; index++) {
    const num = BigInt(nums[index]);

    minHeap.push({ num, index });
  }

  while (k && minHeap.top().num * mult <= maxNum) {
    const element = minHeap.pop();
    const num = element.num * mult;

    minHeap.push({ ...element, num });
    k -= 1;
  }

  const rounds = BigInt(Math.floor(k / n));
  const modK = k % n;
  const factor = modPow(mult, rounds, MODULO);

  if (rounds) {
    for (let index = 0; index < n; index++) {
      const element = minHeap.pop();
      const num = element.num * factor;

      minHeap.push({ ...element, num });
    }
  }

  for (let index = 0; index < modK; index++) {
    const element = minHeap.pop();
    const num = element.num * mult;

    minHeap.push({ ...element, num });
  }

  const result = [];

  while (minHeap.size()) {
    const { index, num } = minHeap.pop();

    result[index] = Number(num % MODULO);
  }

  return result;
};

function modPow(base, exp, mod) {
  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
```
