# [1938. Maximum Genetic Difference Query](https://leetcode.com/problems/maximum-genetic-difference-query)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a rooted tree consisting of <code>n</code> nodes numbered <code>0</code> to <code>n - 1</code>. Each node's number denotes its <strong>unique genetic value</strong> (i.e. the genetic value of node <code>x</code> is <code>x</code>). The <strong>genetic difference</strong> between two genetic values is defined as the <strong>bitwise-</strong><strong>XOR</strong> of their values. You are given the integer array <code>parents</code>, where <code>parents[i]</code> is the parent for node <code>i</code>. If node <code>x</code> is the <strong>root</strong> of the tree, then <code>parents[x] == -1</code>.</p>

<p>You are also given the array <code>queries</code> where <code>queries[i] = [node<sub>i</sub>, val<sub>i</sub>]</code>. For each query <code>i</code>, find the <strong>maximum genetic difference</strong> between <code>val<sub>i</sub></code> and <code>p<sub>i</sub></code>, where <code>p<sub>i</sub></code> is the genetic value of any node that is on the path between <code>node<sub>i</sub></code> and the root (including <code>node<sub>i</sub></code> and the root). More formally, you want to maximize <code>val<sub>i</sub> XOR p<sub>i</sub></code>.</p>

<p>Return <em>an array </em><code>ans</code><em> where </em><code>ans[i]</code><em> is the answer to the </em><code>i<sup>th</sup></code><em> query</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/29/c1.png" style="width: 118px; height: 163px;">
<pre><strong>Input:</strong> parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
<strong>Output:</strong> [2,3,7]
<strong>Explanation: </strong>The queries are processed as follows:
- [0,2]: The node with the maximum genetic difference is 0, with a difference of 2 XOR 0 = 2.
- [3,2]: The node with the maximum genetic difference is 1, with a difference of 2 XOR 1 = 3.
- [2,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/29/c2.png" style="width: 256px; height: 221px;">
<pre><strong>Input:</strong> parents = [3,7,-1,2,0,7,0,2], queries = [[4,6],[1,15],[0,5]]
<strong>Output:</strong> [6,14,7]
<strong>Explanation: </strong>The queries are processed as follows:
- [4,6]: The node with the maximum genetic difference is 0, with a difference of 6 XOR 0 = 6.
- [1,15]: The node with the maximum genetic difference is 1, with a difference of 15 XOR 1 = 14.
- [0,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= parents.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= parents[i] &lt;= parents.length - 1</code> for every node <code>i</code> that is <strong>not</strong> the root.</li>
	<li><code>parents[root] == -1</code></li>
	<li><code>1 &lt;= queries.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>0 &lt;= node<sub>i</sub> &lt;= parents.length - 1</code></li>
	<li><code>0 &lt;= val<sub>i</sub> &lt;= 2 * 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie + Depth-First Search`**

- Time complexity: <em>O((n+m)log(maxVal))</em>
- Space complexity: <em>O((n+m)log(maxVal))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} parents
 * @param {number[][]} queries
 * @return {number[]}
 */
const maxGeneticDifference = function (parents, queries) {
  const n = parents.length;
  const m = queries.length;
  const maxVal = Math.max(n, ...queries.map(([_, val]) => val));
  const bits = Math.ceil(Math.log2(maxVal));
  const tree = Array.from({ length: n }, () => []);
  const trie = new Trie(bits);
  const nodeQueries = Array.from({ length: n }, () => []);
  const result = Array.from({ length: m });
  let root = -1;

  const dfsTree = node => {
    trie.insert(node);

    for (const { index, val } of nodeQueries[node]) {
      result[index] = trie.maxXor(val);
    }

    for (const child of tree[node]) {
      dfsTree(child);
    }

    trie.remove(node);
  };

  for (let node = 0; node < n; node++) {
    const parent = parents[node];

    if (parent === -1) {
      root = node;
    } else {
      tree[parent].push(node);
    }
  }

  for (let index = 0; index < m; index++) {
    const [node, val] = queries[index];

    nodeQueries[node].push({ index, val });
  }

  dfsTree(root);

  return result;
};

class Node {
  constructor() {
    this.children = {};
    this.count = 0;
  }
}

class Trie {
  constructor(bits) {
    this.root = new Node();
    this.bits = bits;
  }

  insert(num) {
    let node = this.root;

    for (let index = this.bits; index >= 0; index--) {
      const bit = (num >> index) & 1;

      if (!node.children[bit]) {
        node.children[bit] = new Node();
      }

      node = node.children[bit];
      node.count += 1;
    }
  }

  remove(num) {
    let node = this.root;

    for (let index = this.bits; index >= 0; index--) {
      const bit = (num >> index) & 1;

      node = node.children[bit];
      node.count -= 1;
    }
  }

  maxXor(val) {
    let node = this.root;
    let result = 0;

    for (let index = this.bits; index >= 0; index--) {
      const bit = (val >> index) & 1;
      const toggleBit = bit ^ 1;

      if (node.children[toggleBit] && node.children[toggleBit].count > 0) {
        node = node.children[toggleBit];
        result |= 1 << index;
      } else {
        node = node.children[bit];
      }
    }

    return result;
  }
}
```
