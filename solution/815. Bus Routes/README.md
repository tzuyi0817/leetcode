# [815. Bus Routes](https://leetcode.com/problems/bus-routes)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>routes</code> representing bus routes where <code>routes[i]</code> is a bus route that the <code>i<sup>th</sup></code> bus repeats forever.</p>

<ul>
	<li>For example, if <code>routes[0] = [1, 5, 7]</code>, this means that the <code>0<sup>th</sup></code> bus travels in the sequence <code>1 -&gt; 5 -&gt; 7 -&gt; 1 -&gt; 5 -&gt; 7 -&gt; 1 -&gt; ...</code> forever.</li>
</ul>

<p>You will start at the bus stop <code>source</code> (You are not on any bus initially), and you want to go to the bus stop <code>target</code>. You can travel between bus stops by buses only.</p>

<p>Return <em>the least number of buses you must take to travel from </em><code>source</code><em> to </em><code>target</code>. Return <code>-1</code> if it is not possible.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> routes = [[1,2,7],[3,6,7]], source = 1, target = 6
<strong>Output:</strong> 2
<strong>Explanation:</strong> The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
<strong>Output:</strong> -1
</pre>

<p>&nbsp;</p>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= routes.length &lt;= 500</code>.</li>
	<li><code>1 &lt;= routes[i].length &lt;= 10<sup>5</sup></code></li>
	<li>All the values of <code>routes[i]</code> are <strong>unique</strong>.</li>
	<li><code>sum(routes[i].length) &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= routes[i][j] &lt; 10<sup>6</sup></code></li>
	<li><code>0 &lt;= source, target &lt; 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search + Hash Map`**
- Time complexity: <em>O(m*n)</em>
- Space complexity: <em>O(m*n+m)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function(routes, source, target) {
    if (source === target) return 0;
    const stopsMap = routes.reduce((map, stops, bus) => {
        for (const stop of stops) {
            const buses = map.get(stop) ?? [];

            buses.push(bus);
            map.set(stop, buses);
        }
        return map;
    }, new Map());
    const visitedBus = new Set();
    const visitedStop = new Set([source]);
    let queue = [source];
    let result = 1;

    while (queue.length) {
        const nextQueue = [];

        for (let index = 0; index < queue.length; index++) {
            const buses = stopsMap.get(queue[index]) ?? [];

            for (const bus of buses) {
                if (visitedBus.has(bus)) continue;
                visitedBus.add(bus);

                for (const stop of routes[bus]) {
                    if (stop === target) return result;
                    if (visitedStop.has(stop)) continue;
                    visitedStop.add(stop);
                    nextQueue.push(stop);
                }
            }
        }
        queue = nextQueue;
        result += 1;
    }
    return -1;
};
```
