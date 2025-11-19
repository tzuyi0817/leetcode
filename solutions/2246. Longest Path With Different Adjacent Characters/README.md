# [2246. Longest Path With Different Adjacent Characters](https://leetcode.com/problems/longest-path-with-different-adjacent-characters)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>tree</strong> (i.e. a connected, undirected graph that has no cycles) <strong>rooted</strong> at node <code>0</code> consisting of <code>n</code> nodes numbered from <code>0</code> to <code>n - 1</code>. The tree is represented by a <strong>0-indexed</strong> array <code>parent</code> of size <code>n</code>, where <code>parent[i]</code> is the parent of node <code>i</code>. Since node <code>0</code> is the root, <code>parent[0] == -1</code>.</p>

<p>You are also given a string <code>s</code> of length <code>n</code>, where <code>s[i]</code> is the character assigned to node <code>i</code>.</p>

<p>Return <em>the length of the <strong>longest path</strong> in the tree such that no pair of <strong>adjacent</strong> nodes on the path have the same character assigned to them.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/25/testingdrawio.png" style="width: 201px; height: 241px;">
<pre><strong>Input:</strong> parent = [-1,0,0,1,1,2], s = "abacbe"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The longest path where each two adjacent nodes have different characters in the tree is the path: 0 -&gt; 1 -&gt; 3. The length of this path is 3, so 3 is returned.
It can be proven that there is no longer path that satisfies the conditions. 
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/25/graph2drawio.png" style="width: 201px; height: 221px;">
<pre><strong>Input:</strong> parent = [-1,0,0,0], s = "aabc"
<strong>Output:</strong> 3
<strong>Explanation:</strong> The longest path where each two adjacent nodes have different characters is the path: 2 -&gt; 0 -&gt; 3. The length of this path is 3, so 3 is returned.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == parent.length == s.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= parent[i] &lt;= n - 1</code> for all <code>i &gt;= 1</code></li>
	<li><code>parent[0] == -1</code></li>
	<li><code>parent</code> represents a valid tree.</li>
	<li><code>s</code> consists of only lowercase English letters.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Depth-First Search`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number}
 */
const longestPath = function (parent, s) {
  const n = parent.length;
  const graph = Array.from({ length: n }, () => []);
  let result = 1;

  const findLongestPath = node => {
    let max1 = 0;
    let max2 = 0;

    for (const neighbor of graph[node]) {
      const len = findLongestPath(neighbor);

      if (s[node] === s[neighbor]) continue;
      if (len > max1) {
        max2 = max1;
        max1 = len;
      } else if (len > max2) {
        max2 = len;
      }
    }

    result = Math.max(1 + max1 + max2, result);

    return 1 + max1;
  };

  for (let node = 1; node < n; node++) {
    graph[parent[node]].push(node);
  }

  findLongestPath(0);

  return result;
};
```
