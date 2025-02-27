# [1473. Paint House III](https://leetcode.com/problems/paint-house-iii)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a row of <code>m</code> houses in a small city, each house must be painted with one of the <code>n</code> colors (labeled from <code>1</code> to <code>n</code>), some houses that have been painted last summer should not be painted again.</p>

<p>A neighborhood is a maximal group of continuous houses that are painted with the same color.</p>

<ul>
	<li>For example: <code>houses = [1,2,2,3,3,2,1,1]</code> contains <code>5</code> neighborhoods <code>[{1}, {2,2}, {3,3}, {2}, {1,1}]</code>.</li>
</ul>

<p>Given an array <code>houses</code>, an <code>m x n</code> matrix <code>cost</code> and an integer <code>target</code> where:</p>

<ul>
	<li><code>houses[i]</code>: is the color of the house <code>i</code>, and <code>0</code> if the house is not painted yet.</li>
	<li><code>cost[i][j]</code>: is the cost of paint the house <code>i</code> with the color <code>j + 1</code>.</li>
</ul>

<p>Return <em>the minimum cost of painting all the remaining houses in such a way that there are exactly</em> <code>target</code> <em>neighborhoods</em>. If it is not possible, return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
<strong>Output:</strong> 9
<strong>Explanation:</strong> Paint houses of this way [1,2,2,1,1]
This array contains target = 3 neighborhoods, [{1}, {2,2}, {1,1}].
Cost of paint all houses (1 + 1 + 1 + 1 + 5) = 9.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> houses = [0,2,1,2,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
<strong>Output:</strong> 11
<strong>Explanation:</strong> Some houses are already painted, Paint the houses of this way [2,2,1,2,2]
This array contains target = 3 neighborhoods, [{2,2}, {1}, {2,2}]. 
Cost of paint the first and last house (10 + 1) = 11.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> houses = [3,1,2,3], cost = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], m = 4, n = 3, target = 3
<strong>Output:</strong> -1
<strong>Explanation:</strong> Houses are already painted with a total of 4 neighborhoods [{3},{1},{2},{3}] different of target = 3.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == houses.length == cost.length</code></li>
	<li><code>n == cost[i].length</code></li>
	<li><code>1 &lt;= m &lt;= 100</code></li>
	<li><code>1 &lt;= n &lt;= 20</code></li>
	<li><code>1 &lt;= target &lt;= m</code></li>
	<li><code>0 &lt;= houses[i] &lt;= n</code></li>
	<li><code>1 &lt;= cost[i][j] &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(m\*target\*n<sup>2</sup>)</em>
- Space complexity: <em>O(m\*target\*n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
const minCost = function (houses, cost, m, n, target) {
  const dp = Array.from({ length: m }, () => {
    return new Array(target + 1).fill('').map(_ => new Array(n + 1).fill(null));
  });

  const paintHouse = (index, neighborhoods, neighborColor) => {
    if (neighborhoods > target) return -1;
    if (index >= m) return neighborhoods === target ? 0 : -1;
    if (dp[index][neighborhoods][neighborColor] !== null) {
      return dp[index][neighborhoods][neighborColor];
    }

    if (houses[index] !== 0) {
      const color = houses[index];
      const nextNeighborhoods = neighborhoods + (color === neighborColor ? 0 : 1);

      return paintHouse(index + 1, nextNeighborhoods, color);
    }

    let result = Number.MAX_SAFE_INTEGER;

    for (let color = 1; color <= n; color++) {
      const needCost = cost[index][color - 1];
      const nextNeighborhoods = neighborhoods + (color === neighborColor ? 0 : 1);
      const nextCost = paintHouse(index + 1, nextNeighborhoods, color);

      if (nextCost === -1) continue;

      result = Math.min(needCost + nextCost, result);
    }

    dp[index][neighborhoods][neighborColor] = result === Number.MAX_SAFE_INTEGER ? -1 : result;

    return dp[index][neighborhoods][neighborColor];
  };

  return paintHouse(0, 0, 0);
};
```
