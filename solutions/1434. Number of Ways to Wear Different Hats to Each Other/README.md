# [1434. Number of Ways to Wear Different Hats to Each Other](https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other)

## Description

<div class="elfjS" data-track-load="description_content"><p>There are <code>n</code> people and <code>40</code> types of hats labeled from <code>1</code> to <code>40</code>.</p>

<p>Given a 2D integer array <code>hats</code>, where <code>hats[i]</code> is a list of all hats preferred by the <code>i<sup>th</sup></code> person.</p>

<p>Return <em>the number of ways that the <code>n</code> people wear different hats to each other</em>.</p>

<p>Since the answer may be too large, return it modulo <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> hats = [[3,4],[4,5],[5]]
<strong>Output:</strong> 1
<strong>Explanation:</strong> There is only one way to choose hats given the conditions. 
First person choose hat 3, Second person choose hat 4 and last one hat 5.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> hats = [[3,5,1],[3,5]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> There are 4 ways to choose hats:
(3,5), (5,3), (1,3) and (1,5)
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> hats = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]
<strong>Output:</strong> 24
<strong>Explanation:</strong> Each person can choose hats labeled from 1 to 4.
Number of Permutations of (1,2,3,4) = 24.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == hats.length</code></li>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= hats[i].length &lt;= 40</code></li>
	<li><code>1 &lt;= hats[i][j] &lt;= 40</code></li>
	<li><code>hats[i]</code> contains a list of <strong>unique</strong> integers.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Bit Manipulation`**

- Time complexity: <em>O(40\*2<sup>n</sup>)</em>
- Space complexity: <em>O(40\*2<sup>n</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} hats
 * @return {number}
 */
const numberWays = function (hats) {
  const MODULO = 10 ** 9 + 7;
  const HAT_TYPES = 40;
  const n = hats.length;
  const hatsWithWearPersons = Array.from({ length: HAT_TYPES + 1 }, () => []);
  const dp = Array.from({ length: HAT_TYPES + 1 }, () => new Array(1 << n).fill(-1));

  for (let person = 0; person < n; person++) {
    const wearHats = hats[person];

    for (const hat of wearHats) {
      hatsWithWearPersons[hat].push(person);
    }
  }

  const wearHat = (hat, mask) => {
    if (mask === (1 << n) - 1) return 1;
    if (hat > HAT_TYPES) return 0;
    if (dp[hat][mask] !== -1) return dp[hat][mask];
    let result = wearHat(hat + 1, mask);

    for (const person of hatsWithWearPersons[hat]) {
      const personMask = 1 << person;

      if (mask & personMask) continue;

      result = (result + wearHat(hat + 1, mask | personMask)) % MODULO;
    }

    dp[hat][mask] = result;

    return result;
  };

  return wearHat(1, 0);
};
```
