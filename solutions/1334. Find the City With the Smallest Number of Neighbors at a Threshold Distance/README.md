# [1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance)

## Description

<div class="elfjS" data-track-load="description_content"><p>There are <code>n</code> cities numbered from <code>0</code> to <code>n-1</code>. Given the array <code>edges</code> where <code>edges[i] = [from<sub>i</sub>, to<sub>i</sub>, weight<sub>i</sub>]</code> represents a bidirectional and weighted edge between cities <code>from<sub>i</sub></code> and <code>to<sub>i</sub></code>, and given the integer <code>distanceThreshold</code>.</p>

<p>Return the city with the smallest number of cities that are reachable through some path and whose distance is <strong>at most</strong> <code>distanceThreshold</code>, If there are multiple such cities, return the city with the greatest number.</p>

<p>Notice that the distance of a path connecting cities <em><strong>i</strong></em> and <em><strong>j</strong></em> is equal to the sum of the edges' weights along that path.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/01/16/find_the_city_01.png" style="width: 300px; height: 225px;">
<pre><strong>Input:</strong> n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
<strong>Output:</strong> 3
<strong>Explanation: </strong>The figure above describes the graph.&nbsp;
The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -&gt; [City 1, City 2]&nbsp;
City 1 -&gt; [City 0, City 2, City 3]&nbsp;
City 2 -&gt; [City 0, City 1, City 3]&nbsp;
City 3 -&gt; [City 1, City 2]&nbsp;
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/01/16/find_the_city_02.png" style="width: 300px; height: 225px;">
<pre><strong>Input:</strong> n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
<strong>Output:</strong> 0
<strong>Explanation: </strong>The figure above describes the graph.&nbsp;
The neighboring cities at a distanceThreshold = 2 for each city are:
City 0 -&gt; [City 1]&nbsp;
City 1 -&gt; [City 0, City 4]&nbsp;
City 2 -&gt; [City 3, City 4]&nbsp;
City 3 -&gt; [City 2, City 4]
City 4 -&gt; [City 1, City 2, City 3]&nbsp;
The city 0 has 1 neighboring city at a distanceThreshold = 2.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n &lt;= 100</code></li>
	<li><code>1 &lt;= edges.length &lt;= n * (n - 1) / 2</code></li>
	<li><code>edges[i].length == 3</code></li>
	<li><code>0 &lt;= from<sub>i</sub> &lt; to<sub>i</sub> &lt; n</code></li>
	<li><code>1 &lt;= weight<sub>i</sub>,&nbsp;distanceThreshold &lt;= 10^4</code></li>
	<li>All pairs <code>(from<sub>i</sub>, to<sub>i</sub>)</code> are distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming(Floyd-Warshall's algorithm)`**

- Time complexity: <em>O(n<sup>3</sup>)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
const findTheCity = function (n, edges, distanceThreshold) {
  const distances = new Array(n)
    .fill('')
    .map(_ => new Array(n).fill(Number.MAX_SAFE_INTEGER));

  for (const [from, to, weight] of edges) {
    distances[from][from] = 0;
    distances[to][to] = 0;
    distances[from][to] = distances[to][from] = weight;
  }
  for (let k = 0; k < n; k++) {
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        if (distances[from][to] <= distances[from][k] + distances[k][to]) continue;

        distances[from][to] = distances[from][k] + distances[k][to];
      }
    }
  }
  let result = 0;
  let minCities = n;

  for (let index = 0; index < n; index++) {
    const cities = distances[index].filter(distance => {
      return distance && distance <= distanceThreshold;
    }).length;

    if (cities > minCities) continue;
    result = index;
    minCities = cities;
  }
  return result;
};
```
