# [1224. Maximum Equal Frequency](https://leetcode.com/problems/maximum-equal-frequency)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array <code>nums</code> of positive integers, return the longest possible length of an array prefix of <code>nums</code>, such that it is possible to remove <strong>exactly one</strong> element from this prefix so that every number that has appeared in it will have the same number of occurrences.</p>

<p>If after removing one element there are no remaining elements, it's still considered that every appeared number has the same number of ocurrences (0).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,2,1,1,5,3,3,5]
<strong>Output:</strong> 7
<strong>Explanation:</strong> For the subarray [2,2,1,1,5,3,3] of length 7, if we remove nums[4] = 5, we will get [2,2,1,1,3,3], so that each number will appear exactly twice.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [1,1,1,2,2,2,3,3,3,4,4,4,5]
<strong>Output:</strong> 13
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxEqualFreq = function (nums) {
  const n = nums.length;
  const freqMap = new Map();
  const countMap = new Map();
  let maxCount = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    let count = countMap.get(num) ?? 0;

    if (count && freqMap.has(count)) {
      freqMap.set(count, freqMap.get(count) - 1);
    }
    count += 1;
    countMap.set(num, count);
    freqMap.set(count, (freqMap.get(count) ?? 0) + 1);
    maxCount = Math.max(maxCount, count);

    if (
      maxCount === 1 ||
      freqMap.get(maxCount) * maxCount === index ||
      (freqMap.get(maxCount - 1) + 1) * (maxCount - 1) === index
    ) {
      result = index + 1;
    }
  }
  return result;
};
```
