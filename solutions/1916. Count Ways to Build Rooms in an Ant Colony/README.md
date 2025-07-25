# [1916. Count Ways to Build Rooms in an Ant Colony](https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are an ant tasked with adding <code>n</code> new rooms numbered <code>0</code> to <code>n-1</code> to your colony. You are given the expansion plan as a <strong>0-indexed</strong> integer array of length <code>n</code>, <code>prevRoom</code>, where <code>prevRoom[i]</code> indicates that you must build room <code>prevRoom[i]</code> before building room <code>i</code>, and these two rooms must be connected <strong>directly</strong>. Room <code>0</code> is already built, so <code>prevRoom[0] = -1</code>. The expansion&nbsp;plan is given such that once all the rooms are built, every room will be reachable from room <code>0</code>.</p>

<p>You can only build <strong>one room</strong> at a time, and you can travel freely between rooms you have <strong>already built</strong> only if they are <strong>connected</strong>.&nbsp;You can choose to build <strong>any room</strong> as long as its <strong>previous room</strong>&nbsp;is already built.</p>

<p>Return <em>the <strong>number of different orders</strong> you can build all the rooms in</em>. Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/19/d1.JPG" style="width: 200px; height: 212px;">
<pre><strong>Input:</strong> prevRoom = [-1,0,1]
<strong>Output:</strong> 1
<strong>Explanation:</strong>&nbsp;There is only one way to build the additional rooms: 0 → 1 → 2
</pre>

<p><strong class="example">Example 2:</strong></p>
<strong><img alt="" src="https://assets.leetcode.com/uploads/2021/06/19/d2.JPG" style="width: 200px; height: 239px;"></strong>

<pre><strong>Input:</strong> prevRoom = [-1,0,0,1,2]
<strong>Output:</strong> 6
<strong>Explanation:
</strong>The 6 ways are:
0 → 1 → 3 → 2 → 4
0 → 2 → 4 → 1 → 3
0 → 1 → 2 → 3 → 4
0 → 1 → 2 → 4 → 3
0 → 2 → 1 → 3 → 4
0 → 2 → 1 → 4 → 3
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == prevRoom.length</code></li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>prevRoom[0] == -1</code></li>
	<li><code>0 &lt;= prevRoom[i] &lt; n</code> for all <code>1 &lt;= i &lt; n</code></li>
	<li>Every room is reachable from room <code>0</code> once all the rooms are built.</li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Combinatorics + Topological Sort`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} prevRoom
 * @return {number}
 */
const waysToBuildRooms = function (prevRoom) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = prevRoom.length;
  const graph = Array.from({ length: n }, () => []);
  const fact = Array.from({ length: n + 1 }, () => 1n);
  const inv = Array.from({ length: n + 1 }, () => 1n);
  const invFact = Array.from({ length: n + 1 }, () => 1n);

  for (let index = 1; index < n; index++) {
    graph[prevRoom[index]].push(index);
  }

  for (let count = 2; count <= n; count++) {
    const value = BigInt(count);
    const mult = MODULO / value;
    const remainder = MODULO % value;

    inv[count] = MODULO - ((mult * inv[Number(remainder)]) % MODULO);
  }

  for (let count = 1; count <= n; count++) {
    const value = BigInt(count);

    fact[count] = (fact[count - 1] * value) % MODULO;
    invFact[count] = (invFact[count - 1] * inv[count]) % MODULO;
  }

  const nCk = (n, k) => {
    return (((fact[n] * invFact[k]) % MODULO) * invFact[n - k]) % MODULO;
  };

  const buildRooms = node => {
    let ways = 1n;
    let totalSize = 0;

    for (const child of graph[node]) {
      const next = buildRooms(child);

      ways = (ways * next.ways) % MODULO;
      ways = (ways * nCk(totalSize + next.totalSize, next.totalSize)) % MODULO;
      totalSize += next.totalSize;
    }

    return { ways, totalSize: totalSize + 1 };
  };

  return Number(buildRooms(0).ways);
};
```
