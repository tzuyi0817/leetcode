# [2376. Count Special Integers](https://leetcode.com/problems/count-special-integers)

## Description

<div class="elfjS" data-track-load="description_content"><p>We call a positive integer <strong>special</strong> if all of its digits are <strong>distinct</strong>.</p>

<p>Given a <strong>positive</strong> integer <code>n</code>, return <em>the number of special integers that belong to the interval </em><code>[1, n]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 20
<strong>Output:</strong> 19
<strong>Explanation:</strong> All the integers from 1 to 20, except 11, are special. Thus, there are 19 special integers.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 5
<strong>Output:</strong> 5
<strong>Explanation:</strong> All the integers from 1 to 5 are special.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> n = 135
<strong>Output:</strong> 110
<strong>Explanation:</strong> There are 110 integers from 1 to 135 that are special.
Some of the integers that are not special are: 22, 114, and 131.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 2 * 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(m*2<sup>10</sup>*10)</em>
- Space complexity: <em>O(m\*2<sup>10</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @return {number}
 */
const countSpecialNumbers = function (n) {
  const nums = `${n}`.split('').map(Number);
  const m = nums.length;
  const dp = Array.from({ length: m }, () => {
    return new Array(1 << 10).fill(-1);
  });

  const countSpecial = (index, isTight, mask) => {
    if (index >= m) return mask ? 1 : 0;

    if (!isTight && dp[index][mask] !== -1) {
      return dp[index][mask];
    }

    const limit = isTight ? nums[index] : 9;
    let result = 0;

    for (let num = 0; num <= limit; num++) {
      if (mask & (1 << num)) continue;

      if (mask === 0 && num === 0) {
        result += countSpecial(index + 1, false, mask);
        continue;
      }

      const nextTight = isTight && num === limit;
      const nextMask = mask | (1 << num);

      result += countSpecial(index + 1, nextTight, nextMask);
    }

    if (!isTight) {
      dp[index][mask] = result;
    }

    return result;
  };

  return countSpecial(0, true, 0);
};
```
