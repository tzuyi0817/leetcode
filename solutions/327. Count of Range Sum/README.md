# [327. Count of Range Sum](https://leetcode.com/problems/count-of-range-sum)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code> and two integers <code>lower</code> and <code>upper</code>, return <em>the number of range sums that lie in</em> <code>[lower, upper]</code> <em>inclusive</em>.</p>

<p>Range sum <code>S(i, j)</code> is defined as the sum of the elements in <code>nums</code> between indices <code>i</code> and <code>j</code> inclusive, where <code>i &lt;= j</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [-2,5,-1], lower = -2, upper = 2
<strong>Output:</strong> 3
<strong>Explanation:</strong> The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [0], lower = 0, upper = 0
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>-10<sup>5</sup> &lt;= lower &lt;= upper &lt;= 10<sup>5</sup></code></li>
	<li>The answer is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</li>
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
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
const countRangeSum = function (nums, lower, upper) {
  const n = nums.length;
  const prefixSum = new Array(n + 1).fill(0);

  for (let index = 0; index < n; index++) {
    prefixSum[index + 1] = prefixSum[index] + nums[index];
  }

  const sortedPrefixSum = [...new Set(prefixSum)].toSorted((a, b) => a - b);
  const bit = Array.from({ length: sortedPrefixSum.length + 2 }).fill(0);

  const getIndex = value => {
    let left = 0;
    let right = sortedPrefixSum.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      sortedPrefixSum[mid] >= value ? (right = mid - 1) : (left = mid + 1);
    }
    return left;
  };

  const updateBit = index => {
    while (index < bit.length) {
      bit[index] += 1;
      index += index & -index;
    }
  };

  const queryBit = index => {
    let count = 0;

    while (index > 0) {
      count += bit[index];
      index -= index & -index;
    }
    return count;
  };

  let result = 0;

  for (const sum of prefixSum) {
    const leftIndex = getIndex(sum - upper);
    const rightIndex = getIndex(sum - lower + 1);

    result += queryBit(rightIndex) - queryBit(leftIndex);
    updateBit(getIndex(sum) + 1);
  }
  return result;
};
```
