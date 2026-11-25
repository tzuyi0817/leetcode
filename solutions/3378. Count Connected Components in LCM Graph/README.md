# [3378. Count Connected Components in LCM Graph](https://leetcode.com/problems/count-connected-components-in-lcm-graph)

## Description

<div class="xg0bVG_html" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an array of integers <code>nums</code> of size <code>n</code> and a <strong>positive</strong> integer <code>threshold</code>.</p>

<p>There is a graph consisting of <code>n</code> nodes with the&nbsp;<code>i<sup>th</sup></code>&nbsp;node having a value of <code>nums[i]</code>. Two nodes <code>i</code> and <code>j</code> in the graph are connected via an <strong>undirected</strong> edge if <code>lcm(nums[i], nums[j]) &lt;= threshold</code>.</p>

<p>Return the number of <strong>connected components</strong> in this graph.</p>

<p>A <strong>connected component</strong> is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.</p>

<p>The term <code>lcm(a, b)</code> denotes the <strong>least common multiple</strong> of <code>a</code> and <code>b</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,4,8,3,9], threshold = 5</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong>&nbsp;</p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/10/31/example0.png" style="width: 250px; height: 251px;"></p>

<p>&nbsp;</p>

<p>The four connected components are <code>(2, 4)</code>, <code>(3)</code>, <code>(8)</code>, <code>(9)</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,4,8,3,9,12], threshold = 10</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong>&nbsp;</p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2024/10/31/example1.png" style="width: 250px; height: 252px;"></p>

<p>The two connected components are <code>(2, 3, 4, 8, 9)</code>, and <code>(12)</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li>All elements of <code>nums</code> are unique.</li>
	<li><code>1 &lt;= threshold &lt;= 2 * 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find`**

- Time complexity: <em>O(nlog\*threshold)</em>
- Space complexity: <em>O(threshold)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
const countComponents = function (nums, threshold) {
  const uf = new UnionFind(threshold + 1);
  const groupSet = new Set();

  for (const num of nums) {
    for (let multiple = num * 2; multiple <= threshold; multiple += num) {
      uf.union(num, multiple);
    }
  }

  for (const num of nums) {
    const group = uf.find(num) ?? num;

    groupSet.add(group);
  }

  return groupSet.size;
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = Array.from({ length: n }, () => 0);
  }

  find(x) {
    if (this.groups[x] === x) return x;

    this.groups[x] = this.find(this.groups[x]);

    return this.groups[x];
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) return false;

    if (this.ranks[groupX] > this.ranks[groupY]) {
      this.groups[groupY] = groupX;
    } else if (this.ranks[groupX] < this.ranks[groupY]) {
      this.groups[groupX] = groupY;
    } else {
      this.groups[groupY] = groupX;
      this.ranks[groupX] += 1;
    }

    return true;
  }
}
```
