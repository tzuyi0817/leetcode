# [947. Most Stones Removed with Same Row or Column](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column)

## Description

<div class="elfjS" data-track-load="description_content"><p>On a 2D plane, we place <code>n</code> stones at some integer coordinate points. Each coordinate point may have at most one stone.</p>

<p>A stone can be removed if it shares either <strong>the same row or the same column</strong> as another stone that has not been removed.</p>

<p>Given an array <code>stones</code> of length <code>n</code> where <code>stones[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> represents the location of the <code>i<sup>th</sup></code> stone, return <em>the largest possible number of stones that can be removed</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
<strong>Output:</strong> 5
<strong>Explanation:</strong> One way to remove 5 stones is as follows:
1. Remove stone [2,2] because it shares the same row as [2,1].
2. Remove stone [2,1] because it shares the same column as [0,1].
3. Remove stone [1,2] because it shares the same row as [1,0].
4. Remove stone [1,0] because it shares the same column as [0,0].
5. Remove stone [0,1] because it shares the same row as [0,0].
Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> One way to make 3 moves is as follows:
1. Remove stone [2,2] because it shares the same row as [2,0].
2. Remove stone [2,0] because it shares the same column as [0,0].
3. Remove stone [0,2] because it shares the same row as [0,0].
Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> stones = [[0,0]]
<strong>Output:</strong> 0
<strong>Explanation:</strong> [0,0] is the only stone on the plane, so you cannot remove it.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= stones.length &lt;= 1000</code></li>
	<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
	<li>No two stones are at the same coordinate point.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find`**
- Time complexity: <em>O(n<sup>2</sup>)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function(stones) {
    const n = stones.length;
    const stoneGroup = Array(n).fill('').map((_, index) => index);

    const unionFind = (x) => {
        return stoneGroup[x] === x ? x : unionFind(stoneGroup[x]);
    };

    for (let a = 0; a < n; a++) {
        for (let b = a + 1; b < n; b++) {
            const [x1, y1] = stones[a];
            const [x2, y2] = stones[b];

            if (x1 !== x2 && y1 !== y2) continue;
            const groupA = unionFind(a);
            const groupB = unionFind(b);

            stoneGroup[groupB] = groupA;
        }
    }
    let result = n;

    for (let index = 0; index < n; index++) {
        if (index !== stoneGroup[index]) continue;
        result -= 1;
    }
    return result;
};
```
