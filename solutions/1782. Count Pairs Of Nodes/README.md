# [1782. Count Pairs Of Nodes](https://leetcode.com/problems/count-pairs-of-nodes)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an undirected graph defined by an integer <code>n</code>, the number of nodes, and a 2D integer array <code>edges</code>, the edges in the graph, where <code>edges[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> indicates that there is an <strong>undirected</strong> edge between <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code>. You are also given an integer array <code>queries</code>.</p>

<p>Let <code>incident(a, b)</code> be defined as the <strong>number of edges</strong> that are connected to <strong>either</strong> node <code>a</code> or <code>b</code>.</p>

<p>The answer to the <code>j<sup>th</sup></code> query is the <strong>number of pairs</strong> of nodes <code>(a, b)</code> that satisfy <strong>both</strong> of the following conditions:</p>

<ul>
	<li><code>a &lt; b</code></li>
	<li><code>incident(a, b) &gt; queries[j]</code></li>
</ul>

<p>Return <em>an array </em><code>answers</code><em> such that </em><code>answers.length == queries.length</code><em> and </em><code>answers[j]</code><em> is the answer of the </em><code>j<sup>th</sup></code><em> query</em>.</p>

<p>Note that there can be <strong>multiple edges</strong> between the same two nodes.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/08/winword_2021-06-08_00-58-39.png" style="width: 529px; height: 305px;">
<pre><strong>Input:</strong> n = 4, edges = [[1,2],[2,4],[1,3],[2,3],[2,1]], queries = [2,3]
<strong>Output:</strong> [6,5]
<strong>Explanation:</strong> The calculations for incident(a, b) are shown in the table above.
The answers for each of the queries are as follows:
- answers[0] = 6. All the pairs have an incident(a, b) value greater than 2.
- answers[1] = 5. All the pairs except (3, 4) have an incident(a, b) value greater than 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 5, edges = [[1,5],[1,5],[3,4],[2,5],[1,3],[5,1],[2,3],[2,5]], queries = [1,2,3,4,5]
<strong>Output:</strong> [10,10,9,8,6]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= edges.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= u<sub>i</sub>, v<sub>i</sub> &lt;= n</code></li>
	<li><code>u<sub>i </sub>!= v<sub>i</sub></code></li>
	<li><code>1 &lt;= queries.length &lt;= 20</code></li>
	<li><code>0 &lt;= queries[j] &lt; edges.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Two Pointers + Hash Map`**

- Time complexity: <em>O(nlogn+queries.length\*edges.length)</em>
- Space complexity: <em>O(n+queries.length+edges.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} queries
 * @return {number[]}
 */
const countPairs = function (n, edges, queries) {
  const counts = Array.from({ length: n + 1 }, () => 0);
  const connectedMap = new Map();

  for (const [u, v] of edges) {
    const minNode = Math.min(u, v);
    const maxNode = Math.max(u, v);

    if (!connectedMap.has(minNode)) {
      connectedMap.set(minNode, new Map());
    }
    const connected = connectedMap.get(minNode);
    const connectedCount = connected.get(maxNode) ?? 0;

    connected.set(maxNode, connectedCount + 1);
    counts[u] += 1;
    counts[v] += 1;
  }

  const sortedCounts = [...counts].sort((a, b) => a - b);

  return queries.map(query => {
    let left = 1;
    let right = n;
    let count = 0;

    while (left < right) {
      if (sortedCounts[left] + sortedCounts[right] > query) {
        count += right - left;
        right -= 1;
      } else {
        left += 1;
      }
    }

    for (const [u, connected] of connectedMap) {
      for (const [v, connectedCount] of connected) {
        if (counts[u] + counts[v] <= query) continue;
        if (counts[u] + counts[v] - connectedCount <= query) {
          count -= 1;
        }
      }
    }

    return count;
  });
};
```
