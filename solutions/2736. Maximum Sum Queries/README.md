# [2736. Maximum Sum Queries](https://leetcode.com/problems/maximum-sum-queries)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given two <strong>0-indexed</strong> integer arrays <code>nums1</code> and <code>nums2</code>, each of length <code>n</code>, and a <strong>1-indexed 2D array</strong> <code>queries</code> where <code>queries[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>.</p>

<p>For the <code>i<sup>th</sup></code> query, find the <strong>maximum value</strong> of <code>nums1[j] + nums2[j]</code> among all indices <code>j</code> <code>(0 &lt;= j &lt; n)</code>, where <code>nums1[j] &gt;= x<sub>i</sub></code> and <code>nums2[j] &gt;= y<sub>i</sub></code>, or <strong>-1</strong> if there is no <code>j</code> satisfying the constraints.</p>

<p>Return <em>an array </em><code>answer</code><em> where </em><code>answer[i]</code><em> is the answer to the </em><code>i<sup>th</sup></code><em> query.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [4,3,1,2], nums2 = [2,4,9,5], queries = [[4,1],[1,3],[2,5]]
<strong>Output:</strong> [6,10,7]
<strong>Explanation:</strong> 
For the 1st query <code node="[object Object]">x<sub>i</sub> = 4</code>&nbsp;and&nbsp;<code node="[object Object]">y<sub>i</sub> = 1</code>, we can select index&nbsp;<code node="[object Object]">j = 0</code>&nbsp;since&nbsp;<code node="[object Object]">nums1[j] &gt;= 4</code>&nbsp;and&nbsp;<code node="[object Object]">nums2[j] &gt;= 1</code>. The sum&nbsp;<code node="[object Object]">nums1[j] + nums2[j]</code>&nbsp;is 6, and we can show that 6 is the maximum we can obtain.

For the 2nd query <code node="[object Object]">x<sub>i</sub> = 1</code>&nbsp;and&nbsp;<code node="[object Object]">y<sub>i</sub> = 3</code>, we can select index&nbsp;<code node="[object Object]">j = 2</code>&nbsp;since&nbsp;<code node="[object Object]">nums1[j] &gt;= 1</code>&nbsp;and&nbsp;<code node="[object Object]">nums2[j] &gt;= 3</code>. The sum&nbsp;<code node="[object Object]">nums1[j] + nums2[j]</code>&nbsp;is 10, and we can show that 10 is the maximum we can obtain. 

For the 3rd query <code node="[object Object]">x<sub>i</sub> = 2</code>&nbsp;and&nbsp;<code node="[object Object]">y<sub>i</sub> = 5</code>, we can select index&nbsp;<code node="[object Object]">j = 3</code>&nbsp;since&nbsp;<code node="[object Object]">nums1[j] &gt;= 2</code>&nbsp;and&nbsp;<code node="[object Object]">nums2[j] &gt;= 5</code>. The sum&nbsp;<code node="[object Object]">nums1[j] + nums2[j]</code>&nbsp;is 7, and we can show that 7 is the maximum we can obtain.

Therefore, we return&nbsp;<code node="[object Object]">[6,10,7]</code>.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [3,2,5], nums2 = [2,3,4], queries = [[4,4],[3,2],[1,1]]
<strong>Output:</strong> [9,9,9]
<strong>Explanation:</strong> For this example, we can use index&nbsp;<code node="[object Object]">j = 2</code>&nbsp;for all the queries since it satisfies the constraints for each query.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums1 = [2,1], nums2 = [2,3], queries = [[3,3]]
<strong>Output:</strong> [-1]
<strong>Explanation:</strong> There is one query in this example with <code node="[object Object]">x<sub>i</sub></code> = 3 and <code node="[object Object]">y<sub>i</sub></code> = 3. For every index, j, either nums1[j] &lt; <code node="[object Object]">x<sub>i</sub></code> or nums2[j] &lt; <code node="[object Object]">y<sub>i</sub></code>. Hence, there is no solution. 
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>nums1.length == nums2.length</code>&nbsp;</li>
	<li><code>n ==&nbsp;nums1.length&nbsp;</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums1[i], nums2[i] &lt;= 10<sup>9</sup>&nbsp;</code></li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>queries[i].length ==&nbsp;2</code></li>
	<li><code>x<sub>i</sub>&nbsp;== queries[i][1]</code></li>
	<li><code>y<sub>i</sub> == queries[i][2]</code></li>
	<li><code>1 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Stack + Binary Search`**

- Time complexity: <em>O(mlogn)</em>
- Space complexity: <em>O(m+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
const maximumSumQueries = function (nums1, nums2, queries) {
  const n = nums1.length;
  const m = queries.length;
  const pairs = nums1.map((num, index) => ({ x: num, y: nums2[index] }));
  const indexedQueries = queries.map(([x, y], index) => {
    return { index, minX: x, minY: y };
  });

  const stack = [];
  const result = Array.from({ length: m }, () => -1);
  let pairIndex = 0;

  pairs.sort((a, b) => b.x - a.x);
  indexedQueries.sort((a, b) => b.minX - a.minX);

  const findFirstGreaterEqual = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      nums[mid].y >= target ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (const { index, minX, minY } of indexedQueries) {
    while (pairIndex < n && pairs[pairIndex].x >= minX) {
      const { x, y } = pairs[pairIndex];
      const sum = x + y;

      while (stack.length && sum >= stack.at(-1).sum) {
        stack.pop();
      }

      if (!stack.length || y > stack.at(-1).y) {
        stack.push({ y, sum });
      }

      pairIndex += 1;
    }

    const pos = findFirstGreaterEqual(stack, minY);

    result[index] = pos === stack.length ? -1 : stack[pos].sum;
  }

  return result;
};
```
