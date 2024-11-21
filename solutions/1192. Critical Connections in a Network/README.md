# [1192. Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network)

## Description

<div class="elfjS" data-track-load="description_content"><p>There are <code>n</code> servers numbered from <code>0</code> to <code>n - 1</code> connected by undirected server-to-server <code>connections</code> forming a network where <code>connections[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> represents a connection between servers <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code>. Any server can reach other servers directly or indirectly through the network.</p>

<p>A <em>critical connection</em> is a connection that, if removed, will make some servers unable to reach some other server.</p>

<p>Return all critical connections in the network in any order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/09/03/1537_ex1_2.png" style="width: 198px; height: 248px;">
<pre><strong>Input:</strong> n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
<strong>Output:</strong> [[1,3]]
<strong>Explanation:</strong> [[3,1]] is also accepted.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 2, connections = [[0,1]]
<strong>Output:</strong> [[0,1]]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>n - 1 &lt;= connections.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>a<sub>i</sub> != b<sub>i</sub></code></li>
	<li>There are no repeated connections.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Biconnected Component`**

- Time complexity: <em>O(n + connections.length)</em>
- Space complexity: <em>O(n + connections.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
const criticalConnections = function (n, connections) {
  const network = Array.from({ length: n }, () => []);

  for (const [a, b] of connections) {
    network[a].push(b);
    network[b].push(a);
  }
  const times = Array.from({ length: n }, () => 0);
  const low = Array.from({ length: n }, () => 0);
  const result = [];
  let time = 1;

  const biconnectedComponent = (node, parent) => {
    times[node] = time;
    low[node] = time;
    time += 1;

    for (const next of network[node]) {
      if (!times[next]) {
        biconnectedComponent(next, node);
        low[node] = Math.min(low[node], low[next]);
      } else if (next !== parent) {
        low[node] = Math.min(low[node], times[next]);
      }

      if (low[next] > times[node]) {
        result.push([node, next]);
      }
    }
  };

  biconnectedComponent(0, -1);

  return result;
};
```
