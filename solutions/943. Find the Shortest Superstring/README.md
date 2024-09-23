# [943. Find the Shortest Superstring](https://leetcode.com/problems/find-the-shortest-superstring)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of strings <code>words</code>, return <em>the smallest string that contains each string in</em> <code>words</code> <em>as a substring</em>. If there are multiple valid strings of the smallest length, return <strong>any of them</strong>.</p>

<p>You may assume that no string in <code>words</code> is a substring of another string in <code>words</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> words = ["alex","loves","leetcode"]
<strong>Output:</strong> "alexlovesleetcode"
<strong>Explanation:</strong> All permutations of "alex","loves","leetcode" would also be accepted.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> words = ["catg","ctaagt","gcta","ttca","atgcatc"]
<strong>Output:</strong> "gctaagttcatgcatc"
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= words.length &lt;= 12</code></li>
	<li><code>1 &lt;= words[i].length &lt;= 20</code></li>
	<li><code>words[i]</code> consists of lowercase English letters.</li>
	<li>All the strings of <code>words</code> are <strong>unique</strong>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**
- Time complexity: <em>O(n * 2<sup>n</sup>)</em>
- Space complexity: <em>O(n * 2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string[]} words
 * @return {string}
 */
var shortestSuperstring = function(words) {
    const n = words.length;
    const costs = Array(n).fill('').map(_ => Array(n).fill(0));
    const dp = Array(1 << n).fill('').map(_ => Array(n).fill(Number.MAX_SAFE_INTEGER));
    const parent = Array(1 << n).fill('').map(_ => Array(n).fill(-1));

    const getCost = (a, b) => {
        const minLength = Math.min(a.length, b.length);
        let cost = b.length;

        for (let index = 1; index <= minLength; index++) {
            if (a.slice(-index) !== b.slice(0, index)) continue;
            cost = b.length - index;
        }
        return cost;
    };

    for (let a = 0; a < n; a++) {
        for (let b = 0; b < n; b++) {
            costs[a][b] = getCost(words[a], words[b]);
            costs[b][a] = getCost(words[b], words[a]);
        }
    }

    for (let index = 0; index < n; index++) {
        dp[1 << index][index] = words[index].length;
    }

    for (let mask = 1; mask < (1 << n); mask++) {
        for (let a = 0; a < n; a++) {
            if ((mask & (1 << a)) === 0) continue;

            for (let b = 0; b < n; b++) {
                const cost = dp[mask - (1 << a)][b] + costs[b][a];

                if (cost >= dp[mask][a]) continue;
                dp[mask][a] = cost;
                parent[mask][a] = b;
            }
        }
    }

    let result = '';
    const dpBack = dp[(1 << n) - 1];
    let a = dpBack.indexOf(Math.min(...dpBack));
    let mask = (1 << n) - 1;

    while (mask > 0) {
        const index = parent[mask][a];

        if (index === -1) {
            result = words[a] + result;
        } else {
            result = words[a].slice(words[a].length - costs[index][a]) + result;
        }
        mask -= 1 << a;
        a = index;
    }
    return result;
};
```
