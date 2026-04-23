# [2615. Sum of Distances](https://leetcode.com/problems/sum-of-distances)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code>. There exists an array <code>arr</code> of length <code>nums.length</code>, where <code>arr[i]</code> is the sum of <code>|i - j|</code> over all <code>j</code> such that <code>nums[j] == nums[i]</code> and <code>j != i</code>. If there is no such <code>j</code>, set <code>arr[i]</code> to be <code>0</code>.</p>

<p>Return <em>the array </em><code>arr</code><em>.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,3,1,1,2]
<strong>Output:</strong> [5,0,3,4,0]
<strong>Explanation:</strong> 
When i = 0, nums[0] == nums[2] and nums[0] == nums[3]. Therefore, arr[0] = |0 - 2| + |0 - 3| = 5. 
When i = 1, arr[1] = 0 because there is no other index with value 3.
When i = 2, nums[2] == nums[0] and nums[2] == nums[3]. Therefore, arr[2] = |2 - 0| + |2 - 3| = 3. 
When i = 3, nums[3] == nums[0] and nums[3] == nums[2]. Therefore, arr[3] = |3 - 0| + |3 - 2| = 4. 
When i = 4, arr[4] = 0 because there is no other index with value 2. 

</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [0,5,3]
<strong>Output:</strong> [0,0,0]
<strong>Explanation:</strong> Since each element in nums is distinct, arr[i] = 0 for all i.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Note:</strong> This question is the same as <a href="https://leetcode.com/problems/intervals-between-identical-elements/description/" target="_blank"> 2121: Intervals Between Identical Elements.</a></p>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const distance = function (nums) {
  const n = nums.length;
  const prefixMap = new Map();
  const suffixMap = new Map();
  const result = Array.from({ length: n }, () => 0);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (prefixMap.has(num)) {
      const { sum, count } = prefixMap.get(num);

      result[index] += index * count - sum;
      prefixMap.set(num, { sum: sum + index, count: count + 1 });
    } else {
      prefixMap.set(num, { sum: index, count: 1 });
    }
  }

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    if (suffixMap.has(num)) {
      const { sum, count } = suffixMap.get(num);

      result[index] += Math.abs(index * count - sum);
      suffixMap.set(num, { sum: sum + index, count: count + 1 });
    } else {
      suffixMap.set(num, { sum: index, count: 1 });
    }
  }

  return result;
};
```
