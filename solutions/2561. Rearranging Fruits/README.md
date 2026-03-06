# [2561. Rearranging Fruits](https://leetcode.com/problems/rearranging-fruits)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have two fruit baskets containing <code>n</code> fruits each. You are given two <strong>0-indexed</strong> integer arrays <code>basket1</code> and <code>basket2</code> representing the cost of fruit in each basket. You want to make both baskets <strong>equal</strong>. To do so, you can use the following operation as many times as you want:</p>

<ul>
	<li>Choose two indices <code>i</code> and <code>j</code>, and swap the <code>i<sup><font size="1">th</font></sup></code> fruit of <code>basket1</code> with the <code>j<sup><font size="1">th</font></sup></code> fruit of <code>basket2</code>.</li>
	<li>The cost of the swap is <code>min(basket1[i], basket2[j])</code>.</li>
</ul>

<p>Two baskets are considered equal if sorting them according to the fruit cost makes them exactly the same baskets.</p>

<p>Return <em>the minimum cost to make both the baskets equal or </em><code>-1</code><em> if impossible.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> basket1 = [4,2,2,2], basket2 = [1,4,1,2]
<strong>Output:</strong> 1
<strong>Explanation:</strong> Swap index 1 of basket1 with index 0 of basket2, which has cost 1. Now basket1 = [4,1,2,2] and basket2 = [2,4,1,2]. Rearranging both the arrays makes them equal.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> basket1 = [2,3,4,1], basket2 = [3,2,5,1]
<strong>Output:</strong> -1
<strong>Explanation:</strong> It can be shown that it is impossible to make both the baskets equal.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>basket1.length == basket2.length</code></li>
	<li><code>1 &lt;= basket1.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= basket1[i], basket2[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy + Hash Table`**

- Time complexity: <em>O(n+queries.length)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} basket1
 * @param {number[]} basket2
 * @return {number}
 */
const minCost = function (basket1, basket2) {
  const costMap = new Map();
  const costs = [];
  let swapCount = 0;

  for (const cost of basket1) {
    const count = costMap.get(cost) ?? 0;

    costMap.set(cost, count + 1);
  }

  for (const cost of basket2) {
    const count = costMap.get(cost) ?? 0;

    costMap.set(cost, count - 1);
  }

  for (const [cost, count] of costMap) {
    if (count % 2 !== 0) return -1;

    costs.push({ cost, count: Math.abs(count) / 2 });

    if (count > 0) {
      swapCount += count / 2;
    }
  }

  costs.sort((a, b) => a.cost - b.cost);

  const minCost = costs[0].cost;
  let result = 0;

  for (const { cost, count } of costs) {
    const swap = Math.min(swapCount, count);
    const cost1 = minCost * swap * 2;
    const cost2 = cost * swap;

    result += Math.min(cost1, cost2);
    swapCount -= swap;

    if (!swapCount) return result;
  }

  return -1;
};
```
