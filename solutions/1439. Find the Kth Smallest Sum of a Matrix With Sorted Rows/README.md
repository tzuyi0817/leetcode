# [1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows](https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an <code>m x n</code> matrix <code>mat</code> that has its rows sorted in non-decreasing order and an integer <code>k</code>.</p>

<p>You are allowed to choose <strong>exactly one element</strong> from each row to form an array.</p>

<p>Return <em>the </em><code>k<sup>th</sup></code><em> smallest array sum among all possible arrays</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> mat = [[1,3,11],[2,4,6]], k = 5
<strong>Output:</strong> 7
<strong>Explanation:</strong> Choosing one element from each row, the first k smallest sum are:
[1,2], [1,4], [3,2], [3,4], [1,6]. Where the 5th sum is 7.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> mat = [[1,3,11],[2,4,6]], k = 9
<strong>Output:</strong> 17
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> mat = [[1,10,10],[1,4,5],[2,3,6]], k = 7
<strong>Output:</strong> 9
<strong>Explanation:</strong> Choosing one element from each row, the first k smallest sum are:
[1,1,2], [1,1,3], [1,4,2], [1,4,3], [1,1,6], [1,5,2], [1,5,3]. Where the 7th sum is 9.  
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == mat.length</code></li>
	<li><code>n == mat.length[i]</code></li>
	<li><code>1 &lt;= m, n &lt;= 40</code></li>
	<li><code>1 &lt;= mat[i][j] &lt;= 5000</code></li>
	<li><code>1 &lt;= k &lt;= min(200, n<sup>m</sup>)</code></li>
	<li><code>mat[i]</code> is a non-decreasing array.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Queue`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number}
 */
const kthSmallest = function (mat, k) {
  const m = mat.length;
  const n = mat[0].length;
  let currentSums = mat[0];

  const kSmallestSums = (nums1, nums2, k) => {
    const minHeap = new MinPriorityQueue({ priority: ({ sum }) => sum });
    const result = [];

    for (const [index, element] of nums1.entries()) {
      const sum = element + nums2[0];

      minHeap.enqueue({ a: index, b: 0, sum });
    }

    while (minHeap.size() && result.length < k) {
      const { a, b, sum } = minHeap.dequeue().element;

      result.push(sum);

      if (b + 1 < n) {
        const nextSum = nums1[a] + nums2[b + 1];

        minHeap.enqueue({ a, b: b + 1, sum: nextSum });
      }
    }

    return result;
  };

  for (let row = 1; row < m; row++) {
    currentSums = kSmallestSums(currentSums, mat[row], k);
  }

  return currentSums[k - 1];
};
```
