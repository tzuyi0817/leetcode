# [2916. Subarrays Distinct Element Sum of Squares II](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed </strong>integer array <code>nums</code>.</p>

<p>The <strong>distinct count</strong> of a subarray of <code>nums</code> is defined as:</p>

<ul>
	<li>Let <code>nums[i..j]</code> be a subarray of <code>nums</code> consisting of all the indices from <code>i</code> to <code>j</code> such that <code>0 &lt;= i &lt;= j &lt; nums.length</code>. Then the number of distinct values in <code>nums[i..j]</code> is called the distinct count of <code>nums[i..j]</code>.</li>
</ul>

<p>Return <em>the sum of the <strong>squares</strong> of <strong>distinct counts</strong> of all subarrays of </em><code>nums</code>.</p>

<p>Since the answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>A subarray is a contiguous <strong>non-empty</strong> sequence of elements within an array.</p>

<p>&nbsp;</p>
<p><strong>Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,1]
<strong>Output:</strong> 15
<strong>Explanation:</strong> Six possible subarrays are:
[1]: 1 distinct value
[2]: 1 distinct value
[1]: 1 distinct value
[1,2]: 2 distinct values
[2,1]: 2 distinct values
[1,2,1]: 2 distinct values
The sum of the squares of the distinct counts in all subarrays is equal to 1<sup>2</sup> + 1<sup>2</sup> + 1<sup>2</sup> + 2<sup>2</sup> + 2<sup>2</sup> + 2<sup>2</sup> = 15.
</pre>

<p><strong>Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2,2]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Three possible subarrays are:
[2]: 1 distinct value
[2]: 1 distinct value
[2,2]: 1 distinct value
The sum of the squares of the distinct counts in all subarrays is equal to 1<sup>2</sup> + 1<sup>2</sup> + 1<sup>2</sup> = 3.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const sumCounts = function (nums) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = nums.length;
  const lastSeenMap = new Map();
  const tree = new LazySegmentTree(n);
  let result = 0n;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const prev = lastSeenMap.get(num) ?? -1;

    tree.updateRange(prev + 1, index);
    result += tree.getSquaredSum();
    result %= MODULO;
    lastSeenMap.set(num, index);
  }

  return Number(result);
};

class LazySegmentTree {
  constructor(n) {
    this.mod = BigInt(10 ** 9 + 7);
    this.n = n;
    this.lazy = Array.from({ length: 4 * n }, () => 0n);
    this.sums = Array.from({ length: 4 * n }, () => 0n);
    this.squareSums = Array.from({ length: 4 * n }, () => 0n);
  }

  updateRange(l, r) {
    this.#updateRange(0, 0, this.n - 1, l, r);
  }

  #updateRange(index, start, end, l, r) {
    this.#propagate(index, start, end);

    if (start > r || end < l) return;

    if (start >= l && end <= r) {
      this.lazy[index] = 1n;
      this.#propagate(index, start, end);

      return;
    }

    const mid = Math.floor((start + end) / 2);
    const a = index * 2 + 1;
    const b = index * 2 + 2;

    this.#updateRange(a, start, mid, l, r);
    this.#updateRange(b, mid + 1, end, l, r);
    this.sums[index] = (this.sums[a] + this.sums[b]) % this.mod;
    this.squareSums[index] = (this.squareSums[a] + this.squareSums[b]) % this.mod;
  }

  #propagate(index, start, end) {
    if (!this.lazy[index]) return;

    const lazyVal = this.lazy[index];
    const len = BigInt(end - start + 1);

    this.squareSums[index] += 2n * this.sums[index] * lazyVal + len * lazyVal * lazyVal;
    this.squareSums[index] %= this.mod;
    this.sums[index] += len * lazyVal;
    this.sums[index] %= this.mod;

    if (start < end) {
      this.lazy[index * 2 + 1] += lazyVal;
      this.lazy[index * 2 + 2] += lazyVal;
    }

    this.lazy[index] = 0n;
  }

  getSquaredSum() {
    return this.squareSums[0];
  }
}
```
