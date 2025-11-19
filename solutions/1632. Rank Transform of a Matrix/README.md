# [1632. Rank Transform of a Matrix](https://leetcode.com/problems/rank-transform-of-a-matrix)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an <code>m x n</code> <code>matrix</code>, return <em>a new matrix </em><code>answer</code><em> where </em><code>answer[row][col]</code><em> is the </em><em><strong>rank</strong> of </em><code>matrix[row][col]</code>.</p>

<p>The <strong>rank</strong> is an <strong>integer</strong> that represents how large an element is compared to other elements. It is calculated using the following rules:</p>

<ul>
	<li>The rank is an integer starting from <code>1</code>.</li>
	<li>If two elements <code>p</code> and <code>q</code> are in the <strong>same row or column</strong>, then:
	<ul>
		<li>If <code>p &lt; q</code> then <code>rank(p) &lt; rank(q)</code></li>
		<li>If <code>p == q</code> then <code>rank(p) == rank(q)</code></li>
		<li>If <code>p &gt; q</code> then <code>rank(p) &gt; rank(q)</code></li>
	</ul>
	</li>
	<li>The <strong>rank</strong> should be as <strong>small</strong> as possible.</li>
</ul>

<p>The test cases are generated so that <code>answer</code> is unique under the given rules.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/18/rank1.jpg" style="width: 442px; height: 162px;">
<pre><strong>Input:</strong> matrix = [[1,2],[3,4]]
<strong>Output:</strong> [[1,2],[2,3]]
<strong>Explanation:</strong>
The rank of matrix[0][0] is 1 because it is the smallest integer in its row and column.
The rank of matrix[0][1] is 2 because matrix[0][1] &gt; matrix[0][0] and matrix[0][0] is rank 1.
The rank of matrix[1][0] is 2 because matrix[1][0] &gt; matrix[0][0] and matrix[0][0] is rank 1.
The rank of matrix[1][1] is 3 because matrix[1][1] &gt; matrix[0][1], matrix[1][1] &gt; matrix[1][0], and both matrix[0][1] and matrix[1][0] are rank 2.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/18/rank2.jpg" style="width: 442px; height: 162px;">
<pre><strong>Input:</strong> matrix = [[7,7],[7,7]]
<strong>Output:</strong> [[1,1],[1,1]]
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/18/rank3.jpg" style="width: 601px; height: 322px;">
<pre><strong>Input:</strong> matrix = [[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]]
<strong>Output:</strong> [[4,2,3],[1,3,4],[5,1,6],[1,3,4]]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == matrix.length</code></li>
	<li><code>n == matrix[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 500</code></li>
	<li><code>-10<sup>9</sup> &lt;= matrix[row][col] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find`**

- Time complexity: <em>O(mnlogmn)</em>
- Space complexity: <em>O(mn)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
const matrixRankTransform = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const valueMap = new Map();

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const value = matrix[row][col];

      if (!valueMap.has(value)) {
        valueMap.set(value, []);
      }

      valueMap.get(value).push({ row, col });
    }
  }

  const sortedValues = [...valueMap.keys()].toSorted((a, b) => a - b);
  const ranks = Array.from({ length: m + n }, () => 0);
  const result = Array.from({ length: m }, () => new Array(n).fill(0));

  for (const value of sortedValues) {
    const uf = new UnionFind();

    for (const { row, col } of valueMap.get(value)) {
      uf.union(row, col + m);
    }
    const groups = uf.getGroups();

    for (const ids of groups.values()) {
      let maxRank = 0;

      for (const id of ids) {
        maxRank = Math.max(ranks[id], maxRank);
      }

      for (const id of ids) {
        ranks[id] = maxRank + 1;
      }
    }

    for (const { row, col } of valueMap.get(value)) {
      result[row][col] = ranks[row];
    }
  }

  return result;
};

class UnionFind {
  constructor() {
    this.groupMap = new Map();
  }

  find(x) {
    if (!this.groupMap.has(x)) {
      this.groupMap.set(x, x);
    }

    if (this.groupMap.get(x) !== x) {
      const group = this.groupMap.get(x);

      this.groupMap.set(x, this.find(group));
    }

    return this.groupMap.get(x);
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) return false;

    this.groupMap.set(groupX, groupY);

    return true;
  }

  getGroups() {
    const groups = new Map();

    for (const x of this.groupMap.keys()) {
      const group = this.find(x);

      if (!groups.has(group)) {
        groups.set(group, []);
      }

      groups.get(group).push(x);
    }

    return groups;
  }
}
```
