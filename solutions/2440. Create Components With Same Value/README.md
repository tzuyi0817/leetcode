# [2440. Create Components With Same Value](https://leetcode.com/problems/create-components-with-same-value)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is an undirected tree with <code>n</code> nodes labeled from <code>0</code> to <code>n - 1</code>.</p>

<p>You are given a <strong>0-indexed</strong> integer array <code><font face="monospace">nums</font></code> of length <code>n</code> where <code>nums[i]</code> represents the value of the <code>i<sup>th</sup></code> node. You are also given a 2D integer array <code>edges</code> of length <code>n - 1</code> where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the tree.</p>

<p>You are allowed to <strong>delete</strong> some edges, splitting the tree into multiple connected components. Let the <strong>value</strong> of a component be the sum of <strong>all</strong> <code>nums[i]</code> for which node <code>i</code> is in the component.</p>

<p>Return<em> the <strong>maximum</strong> number of edges you can delete, such that every connected component in the tree has the same value.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/08/26/diagramdrawio.png" style="width: 441px; height: 351px;">
<pre><strong>Input:</strong> nums = [6,2,2,2,6], edges = [[0,1],[1,2],[1,3],[3,4]] 
<strong>Output:</strong> 2 
<strong>Explanation:</strong> The above figure shows how we can delete the edges [0,1] and [3,4]. The created components are nodes [0], [1,2,3] and [4]. The sum of the values in each component equals 6. It can be proven that no better deletion exists, so the answer is 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2], edges = []
<strong>Output:</strong> 0
<strong>Explanation:</strong> There are no edges to be deleted.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>nums.length == n</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 50</code></li>
	<li><code>edges.length == n - 1</code></li>
	<li><code>edges[i].length == 2</code></li>
	<li><code>0 &lt;= edges[i][0], edges[i][1] &lt;= n - 1</code></li>
	<li><code>edges</code> represents a valid tree.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search + Enumeration`**

- Time complexity: <em>O(nlog\*sum(nums))</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
const componentValue = function (nums, edges) {
  const n = nums.length;
  const totalSum = nums.reduce((total, num) => total + num);
  const graph = Array.from({ length: n }, () => []);

  const dfs = (node, parent, target) => {
    let sum = nums[node];

    for (const neighbor of graph[node]) {
      if (parent === neighbor) continue;

      sum += dfs(neighbor, node, target);

      if (sum > target) return Number.MAX_SAFE_INTEGER;
    }

    if (sum === target) return 0;

    return sum;
  };

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  for (let index = n; index > 1; index--) {
    if (totalSum % index !== 0) continue;

    if (dfs(0, -1, totalSum / index) === 0) {
      return index - 1;
    }
  }

  return 0;
};
```
