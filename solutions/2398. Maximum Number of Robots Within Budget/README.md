# [2398. Maximum Number of Robots Within Budget](https://leetcode.com/problems/maximum-number-of-robots-within-budget)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have <code>n</code> robots. You are given two <strong>0-indexed</strong> integer arrays, <code>chargeTimes</code> and <code>runningCosts</code>, both of length <code>n</code>. The <code>i<sup>th</sup></code> robot costs <code>chargeTimes[i]</code> units to charge and costs <code>runningCosts[i]</code> units to run. You are also given an integer <code>budget</code>.</p>

<p>The <strong>total cost</strong> of running <code>k</code> chosen robots is equal to <code>max(chargeTimes) + k * sum(runningCosts)</code>, where <code>max(chargeTimes)</code> is the largest charge cost among the <code>k</code> robots and <code>sum(runningCosts)</code> is the sum of running costs among the <code>k</code> robots.</p>

<p>Return<em> the <strong>maximum</strong> number of <strong>consecutive</strong> robots you can run such that the total cost <strong>does not</strong> exceed </em><code>budget</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
<strong>Output:</strong> 3
<strong>Explanation:</strong> 
It is possible to run all individual and consecutive pairs of robots within budget.
To obtain answer 3, consider the first 3 robots. The total cost will be max(3,6,1) + 3 * sum(2,1,3) = 6 + 3 * 6 = 24 which is less than 25.
It can be shown that it is not possible to run more than 3 consecutive robots within budget, so we return 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> chargeTimes = [11,12,19], runningCosts = [10,8,7], budget = 19
<strong>Output:</strong> 0
<strong>Explanation:</strong> No robot can be run that does not exceed the budget, so we return 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>chargeTimes.length == runningCosts.length == n</code></li>
	<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= chargeTimes[i], runningCosts[i] &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= budget &lt;= 10<sup>15</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Monotonic Queue`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
const maximumRobots = function (chargeTimes, runningCosts, budget) {
  const n = chargeTimes.length;
  const deque = [];
  let left = 0;
  let totalCost = 0;
  let result = 0;

  for (let index = 0; index < n; index++) {
    const chargeTime = chargeTimes[index];
    const cost = runningCosts[index];

    while (deque.length && chargeTimes[deque.at(-1)] <= chargeTime) {
      deque.pop();
    }

    deque.push(index);
    totalCost += cost;

    let totalBudget = totalCost * (index - left + 1) + chargeTimes[deque[0]];

    while (deque.length && totalBudget > budget) {
      if (deque[0] === left) {
        deque.shift();
      }

      totalCost -= runningCosts[left];
      left += 1;
      totalBudget = totalCost * (index - left + 1) + chargeTimes[deque[0]];
    }

    result = Math.max(index - left + 1, result);
  }

  return result;
};
```
