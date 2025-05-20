# [1713. Minimum Operations to Make a Subsequence](https://leetcode.com/problems/minimum-operations-to-make-a-subsequence)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>target</code> that consists of <strong>distinct</strong> integers and another integer array <code>arr</code> that <strong>can</strong> have duplicates.</p>

<p>In one operation, you can insert any integer at any position in <code>arr</code>. For example, if <code>arr = [1,4,1,2]</code>, you can add <code>3</code> in the middle and make it <code>[1,4,<u>3</u>,1,2]</code>. Note that you can insert the integer at the very beginning or end of the array.</p>

<p>Return <em>the <strong>minimum</strong> number of operations needed to make </em><code>target</code><em> a <strong>subsequence</strong> of </em><code>arr</code><em>.</em></p>

<p>A <strong>subsequence</strong> of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order. For example, <code>[2,7,4]</code> is a subsequence of <code>[4,<u>2</u>,3,<u>7</u>,2,1,<u>4</u>]</code> (the underlined elements), while <code>[2,4,2]</code> is not.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> target = [5,1,3], <code>arr</code> = [9,4,2,3,4]
<strong>Output:</strong> 2
<strong>Explanation:</strong> You can add 5 and 1 in such a way that makes <code>arr</code> = [<u>5</u>,9,4,<u>1</u>,2,3,4], then target will be a subsequence of <code>arr</code>.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> target = [6,4,8,1,3,2], <code>arr</code> = [4,7,6,2,3,8,6,1]
<strong>Output:</strong> 3
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= target.length, arr.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= target[i], arr[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>target</code> contains no duplicates.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Hash Map`**

- Time complexity: <em>O(m+nlogn)</em>
- Space complexity: <em>O(m+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {number}
 */
const minOperations = function (target, arr) {
  const m = target.length;
  const n = arr.length;
  const targetMap = new Map();
  const indices = [];

  for (let index = 0; index < m; index++) {
    const num = target[index];

    targetMap.set(num, index);
  }

  for (let index = 0; index < n; index++) {
    const num = arr[index];

    if (!targetMap.has(num)) continue;

    indices.push(targetMap.get(num));
  }

  const findFirstGreaterEqual = (nums, current) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] >= current ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  const lengthOfLIS = nums => {
    const tails = [];

    for (const num of nums) {
      if (!tails.length || num > tails.at(-1)) {
        tails.push(num);
      } else {
        const index = findFirstGreaterEqual(tails, num);

        tails[index] = num;
      }
    }

    return tails.length;
  };

  return m - lengthOfLIS(indices);
};
```
