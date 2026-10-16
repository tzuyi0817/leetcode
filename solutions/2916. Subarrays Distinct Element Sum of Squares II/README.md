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

**Solution: `Binary Indexed Tree`**

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
  const tree = new BIT(n);
  const prevMap = new Map();
  let current = 0n;
  let result = 0n;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const prev = prevMap.get(num) ?? -1;
    const start = prev + 1;
    const count = BigInt(tree.queryRange(start, index));

    current = (current + count * 2n + BigInt(index - start + 1)) % MODULO;
    result = (result + current) % MODULO;
    tree.updateRange(start, index, 1);
    prevMap.set(num, index);
  }

  return Number(result);
};

class BIT {
  constructor(n) {
    this.n = n + 2;
    this.tree1 = Array.from({ length: this.n }, () => 0);
    this.tree2 = Array.from({ length: this.n }, () => 0);
  }

  update(index, delta) {
    index += 1;

    const origin = index;

    while (index < this.n) {
      this.tree1[index] += delta;
      this.tree2[index] += origin * delta;
      index += index & -index;
    }
  }

  updateRange(a, b, delta) {
    this.update(a, delta);
    this.update(b + 1, -delta);
  }

  query(index) {
    index += 1;

    const origin = index + 1;
    let result = 0;

    while (index) {
      const sum = origin * this.tree1[index];

      result += sum - this.tree2[index];
      index -= index & -index;
    }

    return result;
  }

  queryRange(a, b) {
    return this.query(b) - this.query(a - 1);
  }
}
```
