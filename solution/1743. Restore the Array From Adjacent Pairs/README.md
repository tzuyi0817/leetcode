# [1743. Restore the Array From Adjacent Pairs](https://leetcode.com/problems/restore-the-array-from-adjacent-pairs)

## Description

<div class="xFUwe" data-track-load="description_content"><p>There is an integer array <code>nums</code> that consists of <code>n</code> <strong>unique </strong>elements, but you have forgotten it. However, you do remember every pair of adjacent elements in <code>nums</code>.</p>

<p>You are given a 2D integer array <code>adjacentPairs</code> of size <code>n - 1</code> where each <code>adjacentPairs[i] = [u<sub>i</sub>, v<sub>i</sub>]</code> indicates that the elements <code>u<sub>i</sub></code> and <code>v<sub>i</sub></code> are adjacent in <code>nums</code>.</p>

<p>It is guaranteed that every adjacent pair of elements <code>nums[i]</code> and <code>nums[i+1]</code> will exist in <code>adjacentPairs</code>, either as <code>[nums[i], nums[i+1]]</code> or <code>[nums[i+1], nums[i]]</code>. The pairs can appear <strong>in any order</strong>.</p>

<p>Return <em>the original array </em><code>nums</code><em>. If there are multiple solutions, return <strong>any of them</strong></em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> adjacentPairs = [[2,1],[3,4],[3,2]]
<strong>Output:</strong> [1,2,3,4]
<strong>Explanation:</strong> This array has all its adjacent pairs in adjacentPairs.
Notice that adjacentPairs[i] may not be in left-to-right order.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> adjacentPairs = [[4,-2],[1,4],[-3,1]]
<strong>Output:</strong> [-2,4,1,-3]
<strong>Explanation:</strong> There can be negative numbers.
Another solution is [-3,1,4,-2], which would also be accepted.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> adjacentPairs = [[100000,-100000]]
<strong>Output:</strong> [100000,-100000]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>nums.length == n</code></li>
	<li><code>adjacentPairs.length == n - 1</code></li>
	<li><code>adjacentPairs[i].length == 2</code></li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>5</sup> &lt;= nums[i], u<sub>i</sub>, v<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
	<li>There exists some <code>nums</code> that has <code>adjacentPairs</code> as its pairs.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Map`**
- Time complexity: <em>O(n*2)</em>
- Space complexity: <em>O(n*2)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} adjacentPairs
 * @return {number[]}
 */
var restoreArray = function(adjacentPairs) {
    const pairsMap = adjacentPairs.reduce((map, [a, b]) => {
        const pairsA = map.get(a) ?? new Set();
        const pairsB = map.get(b) ?? new Set();

        map.set(a, pairsA.add(b));
        return map.set(b, pairsB.add(a));
    }, new Map());
    const size = adjacentPairs.length + 1;
    const startNum = [...pairsMap.keys()].find(num => pairsMap.get(num).size === 1);
    const result = [startNum];

    for (let index = 1; index < size; index++) {
        const current = result[index - 1];
        const pairs = pairsMap.get(current);

        for (const num of pairs) {
            if (num === result[index - 2]) continue;
            result.push(num);
        }
    }
    return result;
};
```
