# [879. Profitable Schemes](https://leetcode.com/problems/profitable-schemes)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a group of <code>n</code> members, and a list of various crimes they could commit. The <code>i<sup>th</sup></code> crime generates a <code>profit[i]</code> and requires <code>group[i]</code> members to participate in it. If a member participates in one crime, that member can't participate in another crime.</p>

<p>Let's call a <strong>profitable scheme</strong> any subset of these crimes that generates at least <code>minProfit</code> profit, and the total number of members participating in that subset of crimes is at most <code>n</code>.</p>

<p>Return the number of schemes that can be chosen. Since the answer may be very large, <strong>return it modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> n = 5, minProfit = 3, group = [2,2], profit = [2,3]
<strong>Output:</strong> 2
<strong>Explanation:</strong> To make a profit of at least 3, the group could either commit crimes 0 and 1, or just crime 1.
In total, there are 2 schemes.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
<strong>Output:</strong> 7
<strong>Explanation:</strong> To make a profit of at least 5, the group could commit any crimes, as long as they commit one.
There are 7 possible schemes: (0), (1), (2), (0,1), (0,2), (1,2), and (0,1,2).</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>0 &lt;= minProfit &lt;= 100</code></li>
	<li><code>1 &lt;= group.length &lt;= 100</code></li>
	<li><code>1 &lt;= group[i] &lt;= 100</code></li>
	<li><code>profit.length == group.length</code></li>
	<li><code>0 &lt;= profit[i] &lt;= 100</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(group.length _ n _ minProfit)</em>
- Space complexity: <em>O(group.length _ n _ minProfit)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} n
 * @param {number} minProfit
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
const profitableSchemes = function (n, minProfit, group, profit) {
  const MODULO = 10 ** 9 + 7;
  const groups = group.length;
  const dp = new Array(groups + 1)
    .fill('')
    .map(_ =>
      new Array(n + 1)
        .fill('')
        .map(_ => new Array(minProfit + 1).fill(-1)),
    );

  const commitCrimes = (index, currentProfit, members) => {
    if (index >= groups) return currentProfit >= minProfit ? 1 : 0;
    if (dp[index][members][currentProfit] !== -1) return dp[index][members][currentProfit];

    let result = commitCrimes(index + 1, currentProfit, members);

    if (members >= group[index]) {
      const newProfit = Math.min(minProfit, currentProfit + profit[index]);

      result += commitCrimes(index + 1, newProfit, members - group[index]);
      result %= MODULO;
    }
    return (dp[index][members][currentProfit] = result);
  };

  return commitCrimes(0, 0, n);
};
```
