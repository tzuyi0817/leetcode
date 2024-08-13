# [40. Combination Sum II](https://leetcode.com/problems/combination-sum-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a collection of candidate numbers (<code>candidates</code>) and a target number (<code>target</code>), find all unique combinations in <code>candidates</code>&nbsp;where the candidate numbers sum to <code>target</code>.</p>

<p>Each number in <code>candidates</code>&nbsp;may only be used <strong>once</strong> in the combination.</p>

<p><strong>Note:</strong>&nbsp;The solution set must not contain duplicate combinations.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> candidates = [10,1,2,7,6,1,5], target = 8
<strong>Output:</strong> 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> candidates = [2,5,2,1,2], target = 5
<strong>Output:</strong> 
[
[1,2,2],
[5]
]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;=&nbsp;candidates.length &lt;= 100</code></li>
	<li><code>1 &lt;=&nbsp;candidates[i] &lt;= 50</code></li>
	<li><code>1 &lt;= target &lt;= 30</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**
- Time complexity: <em>O(n*2<sup>n</sup>)</em>
- Space complexity: <em>O(n*2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const n = candidates.length;
    const result = [];

    candidates.sort((a, b) => a - b);

    const combinationSum = (start, collection, sum) => {
        if (sum > target) return;
        if (sum === target) {
            result.push([...collection]);
            return;
        }

        for (let index = start; index < n; index++) {
            const candidate = candidates[index];

            if (index > start && candidate === candidates[index - 1]) continue;
            collection.push(candidate);
            combinationSum(index + 1, collection, sum + candidate);
            collection.pop();
        }
    };

    combinationSum(0, [], 0);
    return result;
};
```
