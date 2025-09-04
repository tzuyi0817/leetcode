# [2035. Partition Array Into Two Arrays to Minimize Sum Difference](https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code> of <code>2 * n</code> integers. You need to partition <code>nums</code> into <strong>two</strong> arrays of length <code>n</code> to <strong>minimize the absolute difference</strong> of the <strong>sums</strong> of the arrays. To partition <code>nums</code>, put each element of <code>nums</code> into <strong>one</strong> of the two arrays.</p>

<p>Return <em>the <strong>minimum</strong> possible absolute difference</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="example-1" src="https://assets.leetcode.com/uploads/2021/10/02/ex1.png" style="width: 240px; height: 106px;">
<pre><strong>Input:</strong> nums = [3,9,7,3]
<strong>Output:</strong> 2
<strong>Explanation:</strong> One optimal partition is: [3,9] and [7,3].
The absolute difference between the sums of the arrays is abs((3 + 9) - (7 + 3)) = 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [-36,36]
<strong>Output:</strong> 72
<strong>Explanation:</strong> One optimal partition is: [-36] and [36].
The absolute difference between the sums of the arrays is abs((-36) - (36)) = 72.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="example-3" src="https://assets.leetcode.com/uploads/2021/10/02/ex3.png" style="width: 316px; height: 106px;">
<pre><strong>Input:</strong> nums = [2,-1,0,4,-2,-9]
<strong>Output:</strong> 0
<strong>Explanation:</strong> One optimal partition is: [2,4,-9] and [-1,0,-2].
The absolute difference between the sums of the arrays is abs((2 + 4 + -9) - (-1 + 0 + -2)) = 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 15</code></li>
	<li><code>nums.length == 2 * n</code></li>
	<li><code>-10<sup>7</sup> &lt;= nums[i] &lt;= 10<sup>7</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search + Binary Search`**

- Time complexity: <em>O(n\*2<sup>n</sup>)</em>
- Space complexity: <em>O(2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumDifference = function (nums) {
  const n = nums.length / 2;
  const sum = nums.reduce((result, num) => result + num);
  const goal = sum / 2;
  const leftNums = nums.slice(0, n);
  const rightNums = nums.slice(n);
  const leftSums = Array.from({ length: n + 1 }, () => []);
  const rightSums = Array.from({ length: n + 1 }, () => []);
  let result = Number.MAX_SAFE_INTEGER;

  const dfsSums = (nums, index, count, sum, sums) => {
    if (index >= n) {
      sums[count].push(sum);
      return;
    }

    const num = nums[index];

    dfsSums(nums, index + 1, count, sum, sums);
    dfsSums(nums, index + 1, count + 1, sum + num, sums);
  };

  dfsSums(leftNums, 0, 0, 0, leftSums);
  dfsSums(rightNums, 0, 0, 0, rightSums);

  const findFirstGreaterEqual = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid] >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (let leftCount = 0; leftCount <= n; leftCount++) {
    const lSums = leftSums[leftCount];
    const rSums = rightSums[n - leftCount];

    rSums.sort((a, b) => a - b);

    for (const leftSum of lSums) {
      const index = findFirstGreaterEqual(rSums, goal - leftSum);

      if (index < rSums.length) {
        const sum1 = leftSum + rSums[index];
        const sum2 = sum - sum1;

        result = Math.min(Math.abs(sum1 - sum2), result);
      }

      if (index > 0) {
        const sum1 = leftSum + rSums[index - 1];
        const sum2 = sum - sum1;

        result = Math.min(Math.abs(sum1 - sum2), result);
      }
    }
  }

  return result;
};
```
