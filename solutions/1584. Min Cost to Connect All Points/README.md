# [1584. Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points)

## Description

<div class="xFUwe" data-track-load="description_content"><p>You are given an array <code>points</code> representing integer coordinates of some points on a 2D-plane, where <code>points[i] = [x<sub>i</sub>, y<sub>i</sub>]</code>.</p>

<p>The cost of connecting two points <code>[x<sub>i</sub>, y<sub>i</sub>]</code> and <code>[x<sub>j</sub>, y<sub>j</sub>]</code> is the <strong>manhattan distance</strong> between them: <code>|x<sub>i</sub> - x<sub>j</sub>| + |y<sub>i</sub> - y<sub>j</sub>|</code>, where <code>|val|</code> denotes the absolute value of <code>val</code>.</p>

<p>Return <em>the minimum cost to make all points connected.</em> All points are connected if there is <strong>exactly one</strong> simple path between any two points.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/26/d.png" style="width: 214px; height: 268px;">
<pre><strong>Input:</strong> points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
<strong>Output:</strong> 20
<strong>Explanation:</strong> 
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/26/c.png" style="width: 214px; height: 268px;">
We can connect the points as shown above to get the minimum cost of 20.
Notice that there is a unique path between every pair of points.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> points = [[3,12],[-2,5],[-4,1]]
<strong>Output:</strong> 18
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= points.length &lt;= 1000</code></li>
	<li><code>-10<sup>6</sup> &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>6</sup></code></li>
	<li>All pairs <code>(x<sub>i</sub>, y<sub>i</sub>)</code> are distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Minimum Spanning Tree`**
- Time complexity: <em>O(n<sup>2</sup>logn)</em>
- Space complexity: <em>O(n<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    const size = points.length;
    const graph = Array(size).fill('').map((_, index) => index);
    const costs = [];

    for (let a = 0; a < size - 1; a++) {
        for (let b = a + 1; b < size; b++) {
            const [x1, y1] = points[a];
            const [x2, y2] = points[b];
            const cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);

            costs.push({ cost, a, b });
        }
    }
    costs.sort((a, b) => a.cost - b.cost);
    
    return costs.reduce((result, { cost, a, b }) => {
        const rootA = unionFind(a);
        const rootB = unionFind(b);

        if (rootA === rootB) return result;
        graph[rootA] = graph[rootB];
        return result + cost;
    }, 0);

    function unionFind(target) {
        if (graph[target] === target) return target;
        graph[target] = unionFind(graph[target]);
        return graph[target];
    }
};
```
