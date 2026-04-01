# [2646. Minimize the Total Price of the Trips](https://leetcode.com/problems/minimize-the-total-price-of-the-trips)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>There exists an undirected and unrooted tree with <code>n</code> nodes indexed from <code>0</code> to <code>n - 1</code>. You are given the integer <code>n</code> and a 2D integer array <code>edges</code> of length <code>n - 1</code>, where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that there is an edge between nodes <code>a<sub>i</sub></code> and <code>b<sub>i</sub></code> in the tree.</p>

<p>Each node has an associated price. You are given an integer array <code>price</code>, where <code>price[i]</code> is the price of the <code>i<sup>th</sup></code> node.</p>

<p>The <strong>price sum</strong> of a given path is the sum of the prices of all nodes lying on that path.</p>

<p>Additionally, you are given a 2D integer array <code>trips</code>, where <code>trips[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> indicates that you start the <code>i<sup>th</sup></code> trip from the node <code>start<sub>i</sub></code> and travel to the node <code>end<sub>i</sub></code> by any path you like.</p>

<p>Before performing your first trip, you can choose some <strong>non-adjacent</strong> nodes and halve the prices.</p>

<p>Return <em>the minimum total price sum to perform all the given trips</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/03/16/diagram2.png" style="width: 541px; height: 181px;">
<pre><strong>Input:</strong> n = 4, edges = [[0,1],[1,2],[1,3]], price = [2,2,10,6], trips = [[0,3],[2,1],[2,3]]
<strong>Output:</strong> 23
<strong>Explanation:</strong> The diagram above denotes the tree after rooting it at node 2. The first part shows the initial tree and the second part shows the tree after choosing nodes 0, 2, and 3, and making their price half.
For the 1<sup>st</sup> trip, we choose path [0,1,3]. The price sum of that path is 1 + 2 + 3 = 6.
For the 2<sup>nd</sup> trip, we choose path [2,1]. The price sum of that path is 2 + 5 = 7.
For the 3<sup>rd</sup> trip, we choose path [2,1,3]. The price sum of that path is 5 + 2 + 3 = 10.
The total price sum of all trips is 6 + 7 + 10 = 23.
It can be proven, that 23 is the minimum answer that we can achieve.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2023/03/16/diagram3.png" style="width: 456px; height: 111px;">
<pre><strong>Input:</strong> n = 2, edges = [[0,1]], price = [2,2], trips = [[0,0]]
<strong>Output:</strong> 1
<strong>Explanation:</strong> The diagram above denotes the tree after rooting it at node 0. The first part shows the initial tree and the second part shows the tree after choosing node 0, and making its price half.
For the 1<sup>st</sup> trip, we choose path [0]. The price sum of that path is 1.
The total price sum of all trips is 1. It can be proven, that 1 is the minimum answer that we can achieve.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 50</code></li>
	<li><code>edges.length == n - 1</code></li>
	<li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt;= n - 1</code></li>
	<li><code>edges</code> represents a valid tree.</li>
	<li><code>price.length == n</code></li>
	<li><code>price[i]</code> is an even integer.</li>
	<li><code>1 &lt;= price[i] &lt;= 1000</code></li>
	<li><code>1 &lt;= trips.length &lt;= 100</code></li>
	<li><code>0 &lt;= start<sub>i</sub>, end<sub>i</sub>&nbsp;&lt;= n - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Depth-First Search`**

- Time complexity: <em>O(n\*trips.length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} price
 * @param {number[][]} trips
 * @return {number}
 */
const minimumTotalPrice = function (n, edges, price, trips) {
  const graph = Array.from({ length: n }, () => []);
  const tripCounts = Array.from({ length: n }, () => 0);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dfsTripCount = (node, prev, end, path) => {
    if (node === end) {
      for (const tripNode of path) {
        tripCounts[tripNode] += 1;
      }

      return;
    }

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      path.push(neighbor);
      dfsTripCount(neighbor, node, end, path);
      path.pop();
    }
  };

  for (const [start, end] of trips) {
    dfsTripCount(start, -1, end, [start]);
  }

  const dp = Array.from({ length: n }, () => {
    return new Array(2).fill(-1);
  });

  const getTotalTripPrice = (node, prev, parentHalved) => {
    if (dp[node][Number(parentHalved)] !== -1) {
      return dp[node][Number(parentHalved)];
    }

    let totalPrice = price[node] * tripCounts[node];

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      totalPrice += getTotalTripPrice(neighbor, node, false);
    }

    if (parentHalved) {
      dp[node][Number(parentHalved)] = totalPrice;

      return totalPrice;
    }

    let halveTotalPrice = (price[node] / 2) * tripCounts[node];

    for (const neighbor of graph[node]) {
      if (neighbor === prev) continue;

      halveTotalPrice += getTotalTripPrice(neighbor, node, true);
    }

    const result = Math.min(totalPrice, halveTotalPrice);

    dp[node][Number(parentHalved)] = result;

    return result;
  };

  return getTotalTripPrice(0, -1, false);
};
```
