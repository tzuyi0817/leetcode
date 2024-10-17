# [670. Maximum Swap](https://leetcode.com/problems/maximum-swap)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer <code>num</code>. You can swap two digits at most once to get the maximum valued number.</p>

<p>Return <em>the maximum valued number you can get</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> num = 2736
<strong>Output:</strong> 7236
<strong>Explanation:</strong> Swap the number 2 and the number 7.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> num = 9973
<strong>Output:</strong> 9973
<strong>Explanation:</strong> No swap.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= num &lt;= 10<sup>8</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} num
 * @return {number}
 */
const maximumSwap = function (num) {
  const nums = `${num}`.split('');
  const n = nums.length;
  let left = -1;
  let right = n - 1;
  let max = right;

  for (let index = n - 1; index >= 0; index--) {
    const current = nums[index];

    if (current < nums[max]) {
      left = index;
      right = max;
    }
    if (current <= nums[max]) continue;
    max = index;
  }

  if (left === -1) return num;

  [nums[left], nums[right]] = [nums[right], nums[left]];

  return Number(nums.join(''));
};
```
