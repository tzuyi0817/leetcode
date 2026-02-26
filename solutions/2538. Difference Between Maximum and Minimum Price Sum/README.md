# [2538. Difference Between Maximum and Minimum Price Sum](https://leetcode.com/problems/difference-between-maximum-and-minimum-price-sum)

## Description

<div class="elfjS" data-track-load="description_content"><p>There exists an undirected and initially unrooted tree with <code>n</code> nodes indexed from <code>0</code> to <code>n - 1</code>. You are given the integer <code>n</code> and a 2D integer array <code>edges</code> of length <code>n - 1</code>, where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the tree.</p>

<p>Each node has an associated price. You are given an integer array <code>price</code>, where <code>price[i]</code> is the price of the <code>i<sup>th</sup></code> node.</p>

<p>The <strong>price sum</strong> of a given path is the sum of the prices of all nodes lying on that path.</p>

<p>The tree can be rooted at any node <code>root</code> of your choice. The incurred <strong>cost</strong> after choosing <code>root</code> is the difference between the maximum and minimum <strong>price sum</strong> amongst all paths starting at <code>root</code>.</p>

<p>Return <em>the <strong>maximum</strong> possible <strong>cost</strong></em> <em>amongst all possible root choices</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/12/01/example14.png" style="width: 556px; height: 231px;">
<pre><strong>Input:</strong> n = 6, edges = [[0,1],[1,2],[1,3],[3,4],[3,5]], price = [9,8,7,6,10,5]
<strong>Output:</strong> 24
<strong>Explanation:</strong> The diagram above denotes the tree after rooting it at node 2. The first part (colored in red) shows the path with the maximum price sum. The second part (colored in blue) shows the path with the minimum price sum.
- The first path contains nodes [2,1,3,4]: the prices are [7,8,6,10], and the sum of the prices is 31.
- The second path contains the node [2] with the price [7].
The difference between the maximum and minimum price sum is 24. It can be proved that 24 is the maximum cost.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/11/24/p1_example2.png" style="width: 352px; height: 184px;">
<pre><strong>Input:</strong> n = 3, edges = [[0,1],[1,2]], price = [1,1,1]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The diagram above denotes the tree after rooting it at node 0. The first part (colored in red) shows the path with the maximum price sum. The second part (colored in blue) shows the path with the minimum price sum.
- The first path contains nodes [0,1,2]: the prices are [1,1,1], and the sum of the prices is 3.
- The second path contains node [0] with a price [1].
The difference between the maximum and minimum price sum is 2. It can be proved that 2 is the maximum cost.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>edges.length == n - 1</code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>edges</code> represents a valid tree.</li>
	<li><code>price.length == n</code></li>
	<li><code>1 &lt;= price[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Depth-First Search`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} price
 * @return {number}
 */
const maxOutput = function (n, edges, price) {
  const tree = Array.from({ length: n }, () => []);
  const maxSums = Array.from({ length: n }, () => 0);
  let result = 0;

  const maxSum = (node, prev) => {
    let maxChildSum = 0;

    for (const child of tree[node]) {
      if (prev === child) continue;

      const childSum = maxSum(child, node);

      maxChildSum = Math.max(childSum, maxChildSum);
    }

    maxSums[node] = price[node] + maxChildSum;

    return maxSums[node];
  };

  const reroot = (node, prev, parentSum) => {
    let maxChildSum1 = 0;
    let maxChildSum2 = 0;
    let maxChild = -1;

    for (const child of tree[node]) {
      if (child === prev) continue;

      if (maxSums[child] > maxChildSum1) {
        maxChildSum2 = maxChildSum1;
        maxChildSum1 = maxSums[child];
        maxChild = child;
      } else if (maxSums[child] > maxChildSum2) {
        maxChildSum2 = maxSums[child];
      }
    }

    if (tree[node].length === 1) {
      result = Math.max(maxChildSum1, parentSum, result);
    }

    for (const child of tree[node]) {
      if (child === prev) continue;

      const childSum = maxChild === child ? maxChildSum2 : maxChildSum1;
      const nextParentSum = price[node] + Math.max(childSum, parentSum);

      reroot(child, node, nextParentSum);
    }
  };

  for (const [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  maxSum(0, -1);
  reroot(0, -1, 0);

  return result;
};
```
