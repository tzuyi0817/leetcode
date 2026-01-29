# [2976. Minimum Cost to Convert String I](https://leetcode.com/problems/minimum-cost-to-convert-string-i)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two <strong>0-indexed</strong> strings <code>source</code> and <code>target</code>, both of length <code>n</code> and consisting of <strong>lowercase</strong> English letters. You are also given two <strong>0-indexed</strong> character arrays <code>original</code> and <code>changed</code>, and an integer array <code>cost</code>, where <code>cost[i]</code> represents the cost of changing the character <code>original[i]</code> to the character <code>changed[i]</code>.</p>

<p>You start with the string <code>source</code>. In one operation, you can pick a character <code>x</code> from the string and change it to the character <code>y</code> at a cost of <code>z</code> <strong>if</strong> there exists <strong>any</strong> index <code>j</code> such that <code>cost[j] == z</code>, <code>original[j] == x</code>, and <code>changed[j] == y</code>.</p>

<p>Return <em>the <strong>minimum</strong> cost to convert the string </em><code>source</code><em> to the string </em><code>target</code><em> using <strong>any</strong> number of operations. If it is impossible to convert</em> <code>source</code> <em>to</em> <code>target</code>, <em>return</em> <code>-1</code>.</p>

<p><strong>Note</strong> that there may exist indices <code>i</code>, <code>j</code> such that <code>original[j] == original[i]</code> and <code>changed[j] == changed[i]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
<strong>Output:</strong> 28
<strong>Explanation:</strong> To convert the string "abcd" to string "acbe":
- Change value at index 1 from 'b' to 'c' at a cost of 5.
- Change value at index 2 from 'c' to 'e' at a cost of 1.
- Change value at index 2 from 'e' to 'b' at a cost of 2.
- Change value at index 3 from 'd' to 'e' at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28.
It can be shown that this is the minimum possible cost.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
<strong>Output:</strong> 12
<strong>Explanation:</strong> To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 * 4 = 12 is incurred.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]
<strong>Output:</strong> -1
<strong>Explanation:</strong> It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= source.length == target.length &lt;= 10<sup>5</sup></code></li>
	<li><code>source</code>, <code>target</code> consist of lowercase English letters.</li>
	<li><code>1 &lt;= cost.length == original.length == changed.length &lt;= 2000</code></li>
	<li><code>original[i]</code>, <code>changed[i]</code> are lowercase English letters.</li>
	<li><code>1 &lt;= cost[i] &lt;= 10<sup>6</sup></code></li>
	<li><code>original[i] != changed[i]</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Floyd-Warshall's algorithm`**

- Time complexity: <em>O(26<sup>3</sup>+n+m)</em>
- Space complexity: <em>O(26<sup>2</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} source
 * @param {string} target
 * @param {character[]} original
 * @param {character[]} changed
 * @param {number[]} cost
 * @return {number}
 */
const minimumCost = function (source, target, original, changed, cost) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = source.length;
  const m = cost.length;
  const dist = Array.from({ length: 26 }, () => {
    return new Array(26).fill(Number.MAX_SAFE_INTEGER);
  });
  let result = 0;

  for (let index = 0; index < m; index++) {
    const a = original[index].charCodeAt(0) - BASE_CODE;
    const b = changed[index].charCodeAt(0) - BASE_CODE;

    dist[a][b] = Math.min(cost[index], dist[a][b]);
  }

  for (let k = 0; k < 26; k++) {
    for (let a = 0; a < 26; a++) {
      if (dist[a][k] === Number.MAX_SAFE_INTEGER) continue;

      for (let b = 0; b < 26; b++) {
        if (dist[k][b] === Number.MAX_SAFE_INTEGER) continue;

        dist[a][b] = Math.min(dist[a][k] + dist[k][b], dist[a][b]);
      }
    }
  }

  for (let index = 0; index < n; index++) {
    if (source[index] === target[index]) continue;

    const a = source[index].charCodeAt(0) - BASE_CODE;
    const b = target[index].charCodeAt(0) - BASE_CODE;

    if (dist[a][b] === Number.MAX_SAFE_INTEGER) return -1;

    result += dist[a][b];
  }

  return result;
};
```
