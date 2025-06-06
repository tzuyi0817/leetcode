# [1766. Tree of Coprimes](https://leetcode.com/problems/tree-of-coprimes)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a tree (i.e.,&nbsp;a connected, undirected graph that has no cycles) consisting of <code>n</code> nodes numbered from <code>0</code> to <code>n - 1</code> and exactly <code>n - 1</code> edges. Each node has a value associated with it, and the <strong>root</strong> of the tree is node <code>0</code>.</p>

<p>To represent this tree, you are given an integer array <code>nums</code> and a 2D array <code>edges</code>. Each <code>nums[i]</code> represents the <code>i<sup>th</sup></code> node's value, and each <code>edges[j] = [u<sub>j</sub>, v<sub>j</sub>]</code> represents an edge between nodes <code>u<sub>j</sub></code> and <code>v<sub>j</sub></code> in the tree.</p>

<p>Two values <code>x</code> and <code>y</code> are <strong>coprime</strong> if <code>gcd(x, y) == 1</code> where <code>gcd(x, y)</code> is the <strong>greatest common divisor</strong> of <code>x</code> and <code>y</code>.</p>

<p>An ancestor of a node <code>i</code> is any other node on the shortest path from node <code>i</code> to the <strong>root</strong>. A node is <strong>not </strong>considered an ancestor of itself.</p>

<p>Return <em>an array </em><code>ans</code><em> of size </em><code>n</code>, <em>where </em><code>ans[i]</code><em> is the closest ancestor to node </em><code>i</code><em> such that </em><code>nums[i]</code> <em>and </em><code>nums[ans[i]]</code> are <strong>coprime</strong>, or <code>-1</code><em> if there is no such ancestor</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/06/untitled-diagram.png" style="width: 191px; height: 281px;"></strong></p>

<pre><strong>Input:</strong> nums = [2,3,3,2], edges = [[0,1],[1,2],[1,3]]
<strong>Output:</strong> [-1,0,0,1]
<strong>Explanation:</strong> In the above figure, each node's value is in parentheses.
- Node 0 has no coprime ancestors.
- Node 1 has only one ancestor, node 0. Their values are coprime (gcd(2,3) == 1).
- Node 2 has two ancestors, nodes 1 and 0. Node 1's value is not coprime (gcd(3,3) == 3), but node 0's
  value is (gcd(2,3) == 1), so node 0 is the closest valid ancestor.
- Node 3 has two ancestors, nodes 1 and 0. It is coprime with node 1 (gcd(3,2) == 1), so node 1 is its
  closest valid ancestor.
</pre>

<p><strong class="example">Example 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/01/06/untitled-diagram1.png" style="width: 441px; height: 291px;"></p>

<pre><strong>Input:</strong> nums = [5,6,10,2,3,6,15], edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]
<strong>Output:</strong> [-1,0,-1,0,0,0,-1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>nums.length == n</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 50</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>edges.length == n - 1</code></li>
	<li><code>edges[j].length == 2</code></li>
	<li><code>0 &lt;= u<sub>j</sub>, v<sub>j</sub> &lt; n</code></li>
	<li><code>u<sub>j</sub> != v<sub>j</sub></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(n\*Max(nums))</em>
- Space complexity: <em>O(n+Max(nums))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number[]}
 */
const getCoprimes = function (nums, edges) {
  const n = nums.length;
  const tree = Array.from({ length: n }, () => []);
  const maxNum = Math.max(...nums);
  const stack = Array.from({ length: maxNum + 1 }, () => []);
  const result = Array.from({ length: n }, () => -1);

  for (const [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const getAncestor = node => {
    let maxDepth = -1;
    let result = -1;

    for (let num = 1; num <= maxNum; num++) {
      if (!stack[num].length) continue;
      const ancestor = stack[num].at(-1);

      if (ancestor.depth > maxDepth && gcd(nums[node], num) === 1) {
        maxDepth = ancestor.depth;
        result = ancestor.node;
      }
    }

    return result;
  };

  const dfsTree = (node, prev, depth) => {
    const num = nums[node];

    result[node] = getAncestor(node);
    stack[num].push({ node, depth });

    for (const neighbor of tree[node]) {
      if (neighbor === prev) continue;

      dfsTree(neighbor, node, depth + 1);
    }

    stack[num].pop();
  };

  dfsTree(0, -1, 0);

  return result;
};
```
