# [1203. Sort Items by Groups Respecting Dependencies](https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies)

## Description

<div class="elfjS" data-track-load="description_content"><p>There are&nbsp;<code>n</code>&nbsp;items each&nbsp;belonging to zero or one of&nbsp;<code>m</code>&nbsp;groups where <code>group[i]</code>&nbsp;is the group that the <code>i</code>-th item belongs to and it's equal to <code>-1</code>&nbsp;if the <code>i</code>-th item belongs to no group. The items and the groups are zero indexed. A group can have no item belonging to it.</p>

<p>Return a sorted list of the items such that:</p>

<ul>
	<li>The items that belong to the same group are next to each other in the sorted list.</li>
	<li>There are some&nbsp;relations&nbsp;between these items where&nbsp;<code>beforeItems[i]</code>&nbsp;is a list containing all the items that should come before the&nbsp;<code>i</code>-th item in the sorted array (to the left of the&nbsp;<code>i</code>-th item).</li>
</ul>

<p>Return any solution if there is more than one solution and return an <strong>empty list</strong>&nbsp;if there is no solution.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2019/09/11/1359_ex1.png" style="width: 191px; height: 181px;"></strong></p>

<pre><strong>Input:</strong> n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
<strong>Output:</strong> [6,3,4,1,5,2,0,7]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
<strong>Output:</strong> []
<strong>Explanation:</strong>&nbsp;This is the same as example 1 except that 4 needs to be before 6 in the sorted list.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= m &lt;= n &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>group.length == beforeItems.length == n</code></li>
	<li><code>-1 &lt;= group[i] &lt;= m - 1</code></li>
	<li><code>0 &lt;= beforeItems[i].length &lt;= n - 1</code></li>
	<li><code>0 &lt;= beforeItems[i][j] &lt;= n - 1</code></li>
	<li><code>i != beforeItems[i][j]</code></li>
	<li><code>beforeItems[i]&nbsp;</code>does not contain&nbsp;duplicates elements.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Topological Sort`**

- Time complexity: <em>O(n+m+n\*k)</em>
- Space complexity: <em>O(n+m+n\*k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
const sortItems = function (n, m, group, beforeItems) {
  const graph = Array.from({ length: n + m }, () => []);
  const indegree = Array.from({ length: n + m }, () => 0);

  for (let index = 0; index < n; index++) {
    if (group[index] === -1) continue;

    graph[n + group[index]].push(index);
    indegree[index] += 1;
  }

  for (let index = 0; index < n; index++) {
    const item = group[index] === -1 ? index : n + group[index];

    for (const before of beforeItems[index]) {
      const beforeItem = group[before] === -1 ? before : n + group[before];

      if (item === beforeItem) {
        graph[before].push(index);
        indegree[index] += 1;
      } else {
        graph[beforeItem].push(item);
        indegree[item] += 1;
      }
    }
  }
  const result = [];

  const dfs = item => {
    if (item < n) result.push(item);

    indegree[item] = -1;

    for (const next of graph[item] ?? []) {
      indegree[next] -= 1;

      if (!indegree[next]) dfs(next);
    }
  };

  for (let index = 0; index < n + m; index++) {
    if (!indegree[index]) dfs(index);
  }
  return result.length < n ? [] : result;
};
```
