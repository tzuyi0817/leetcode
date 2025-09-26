# [611. Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>nums</code>, return <em>the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,2,3,4]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [4,2,3,4]
<strong>Output:</strong> 4
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Two Pointers`**

- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const triangleNumber = function (nums) {
  const n = nums.length;
  let result = 0;

  nums.sort((a, b) => a - b);

  for (let index = n - 1; index > 1; index--) {
    const num = nums[index];
    let left = 0;
    let right = index - 1;

    while (left < right) {
      if (nums[left] + nums[right] > num) {
        result += right - left;
        right -= 1;
      } else {
        left += 1;
      }
    }
  }

  return result;
};
```
