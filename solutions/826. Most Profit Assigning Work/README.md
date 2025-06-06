# [826. Most Profit Assigning Work](https://leetcode.com/problems/most-profit-assigning-work)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have <code>n</code> jobs and <code>m</code> workers. You are given three arrays: <code>difficulty</code>, <code>profit</code>, and <code>worker</code> where:</p>

<ul>
	<li><code>difficulty[i]</code> and <code>profit[i]</code> are the difficulty and the profit of the <code>i<sup>th</sup></code> job, and</li>
	<li><code>worker[j]</code> is the ability of <code>j<sup>th</sup></code> worker (i.e., the <code>j<sup>th</sup></code> worker can only complete a job with difficulty at most <code>worker[j]</code>).</li>
</ul>

<p>Every worker can be assigned <strong>at most one job</strong>, but one job can be <strong>completed multiple times</strong>.</p>

<ul>
	<li>For example, if three workers attempt the same job that pays <code>$1</code>, then the total profit will be <code>$3</code>. If a worker cannot complete any job, their profit is <code>$0</code>.</li>
</ul>

<p>Return the maximum profit we can achieve after assigning the workers to the jobs.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
<strong>Output:</strong> 100
<strong>Explanation:</strong> Workers are assigned jobs of difficulty [4,4,6,6] and they get a profit of [20,20,30,30] separately.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> difficulty = [85,47,57], profit = [24,66,99], worker = [40,25,25]
<strong>Output:</strong> 0
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == difficulty.length</code></li>
	<li><code>n == profit.length</code></li>
	<li><code>m == worker.length</code></li>
	<li><code>1 &lt;= n, m &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= difficulty[i], profit[i], worker[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn+mlogm)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
const maxProfitAssignment = function (difficulty, profit, worker) {
  const n = difficulty.length;
  const difficultyMap = difficulty.reduce((map, difficult, index) => {
    const income = map.get(difficult) ?? 0;

    return map.set(difficult, Math.max(income, profit[index]));
  }, new Map());

  worker.sort((a, b) => a - b);
  difficulty.sort((a, b) => a - b);

  let index = 0;
  let maxIncome = 0;
  let result = 0;

  for (const ability of worker) {
    while (index < n && ability >= difficulty[index]) {
      const income = difficultyMap.get(difficulty[index]);

      maxIncome = Math.max(income, maxIncome);
      index += 1;
    }
    result += maxIncome;
  }
  return result;
};
```
