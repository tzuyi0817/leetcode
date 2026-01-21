# [2426. Number of Pairs Satisfying Inequality](https://leetcode.com/problems/number-of-pairs-satisfying-inequality)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two <strong>0-indexed</strong> integer arrays <code>nums1</code> and <code>nums2</code>, each of size <code>n</code>, and an integer <code>diff</code>. Find the number of <strong>pairs</strong> <code>(i, j)</code> such that:</p>

<ul>
	<li><code>0 &lt;= i &lt; j &lt;= n - 1</code> <strong>and</strong></li>
	<li><code>nums1[i] - nums1[j] &lt;= nums2[i] - nums2[j] + diff</code>.</li>
</ul>

<p>Return<em> the <strong>number of pairs</strong> that satisfy the conditions.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [3,2,5], nums2 = [2,2,1], diff = 1
<strong>Output:</strong> 3
<strong>Explanation:</strong>
There are 3 pairs that satisfy the conditions:
1. i = 0, j = 1: 3 - 2 &lt;= 2 - 2 + 1. Since i &lt; j and 1 &lt;= 1, this pair satisfies the conditions.
2. i = 0, j = 2: 3 - 5 &lt;= 2 - 1 + 1. Since i &lt; j and -2 &lt;= 2, this pair satisfies the conditions.
3. i = 1, j = 2: 2 - 5 &lt;= 2 - 1 + 1. Since i &lt; j and -3 &lt;= 2, this pair satisfies the conditions.
Therefore, we return 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [3,-1], nums2 = [-2,2], diff = -1
<strong>Output:</strong> 0
<strong>Explanation:</strong>
Since there does not exist any pair that satisfies the conditions, we return 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == nums1.length == nums2.length</code></li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= diff &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Indexed Tree`**

- Time complexity: <em>O(nlogM)</em>
- Space complexity: <em>O(M)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} diff
 * @return {number}
 */
const numberOfPairs = function (nums1, nums2, diff) {
  const n = nums1.length;
  const nums = [];

  for (let index = 0; index < n; index++) {
    const num = nums1[index] - nums2[index];

    nums.push(num);
  }

  const minNum = Math.min(...nums);
  const maxNum = Math.max(...nums);
  const offset = Math.abs(Math.min(minNum, minNum + diff)) + 1;
  const bit = new BIT(offset + Math.max(maxNum, maxNum + diff));
  let result = 0;

  for (const num of nums) {
    result += bit.query(num + diff + offset);
    bit.update(num + offset, 1);
  }

  return result;
};

class BIT {
  constructor(n) {
    this.bit = Array.from({ length: n + 1 }, () => 0);
  }

  update(num, delta) {
    while (num < this.bit.length) {
      this.bit[num] += delta;
      num += num & -num;
    }
  }

  query(num) {
    let result = 0;

    while (num > 0) {
      result += this.bit[num];
      num -= num & -num;
    }

    return result;
  }
}
```
