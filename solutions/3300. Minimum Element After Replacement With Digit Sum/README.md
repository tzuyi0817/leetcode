# [3300. Minimum Element After Replacement With Digit Sum](https://leetcode.com/problems/minimum-element-after-replacement-with-digit-sum)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>nums</code>.</p>

<p>You replace each element in <code>nums</code> with the <strong>sum</strong> of its digits.</p>

<p>Return the <strong>minimum</strong> element in <code>nums</code> after all replacements.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [10,12,13,14]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p><code>nums</code> becomes <code>[1, 3, 4, 5]</code> after all replacements, with minimum element 1.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,4]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p><code>nums</code> becomes <code>[1, 2, 3, 4]</code> after all replacements, with minimum element 1.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [999,19,199]</span></p>

<p><strong>Output:</strong> <span class="example-io">10</span></p>

<p><strong>Explanation:</strong></p>

<p><code>nums</code> becomes <code>[27, 10, 19]</code> after all replacements, with minimum element 10.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 100</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Simulation`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const minElement = function (nums) {
  let result = Number.MAX_SAFE_INTEGER;

  const getSumDigits = num => {
    let sum = 0;

    while (num) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }

    return sum;
  };

  for (const num of nums) {
    const sum = getSumDigits(num);

    result = Math.min(sum, result);
  }

  return result;
};
```
