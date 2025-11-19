# [493. Reverse Pairs](https://leetcode.com/problems/reverse-pairs)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code>, return <em>the number of <strong>reverse pairs</strong> in the array</em>.</p>

<p>A <strong>reverse pair</strong> is a pair <code>(i, j)</code> where:</p>

<ul>
	<li><code>0 &lt;= i &lt; j &lt; nums.length</code> and</li>
	<li><code>nums[i] &gt; 2 * nums[j]</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,3,2,3,1]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The reverse pairs are:
(1, 4) --&gt; nums[1] = 3, nums[4] = 1, 3 &gt; 2 * 1
(3, 4) --&gt; nums[3] = 3, nums[4] = 1, 3 &gt; 2 * 1
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2,4,3,5,1]
<strong>Output:</strong> 3
<strong>Explanation:</strong> The reverse pairs are:
(1, 4) --&gt; nums[1] = 4, nums[4] = 1, 4 &gt; 2 * 1
(2, 4) --&gt; nums[2] = 3, nums[4] = 1, 3 &gt; 2 * 1
(3, 4) --&gt; nums[3] = 5, nums[4] = 1, 5 &gt; 2 * 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
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
const reversePairs = function (nums) {
  const n = nums.length;
  const bit = new Array(n + 2).fill(0);
  const sortedNums = nums.toSorted((a, b) => a - b);
  let result = 0;

  const searchIndex = num => {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      sortedNums[mid] >= num ? (right = mid) : (left = mid + 1);
    }
    return left;
  };

  const updateBit = num => {
    while (num < bit.length) {
      bit[num] += 1;
      num += num & -num;
    }
  };

  const queryBit = num => {
    let count = 0;

    while (num > 0) {
      count += bit[num];
      num -= num & -num;
    }
    return count;
  };

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];
    const sortedIndex = searchIndex(Math.ceil(num / 2));

    result += queryBit(sortedIndex);
    updateBit(searchIndex(num) + 1);
  }
  return result;
};
```
