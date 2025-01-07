# [1335. Minimum Difficulty of a Job Schedule](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule)

## Description

<div class="elfjS" data-track-load="description_content"><p>You want to schedule a list of jobs in <code>d</code> days. Jobs are dependent (i.e To work on the <code>i<sup>th</sup></code> job, you have to finish all the jobs <code>j</code> where <code>0 &lt;= j &lt; i</code>).</p>

<p>You have to finish <strong>at least</strong> one task every day. The difficulty of a job schedule is the sum of difficulties of each day of the <code>d</code> days. The difficulty of a day is the maximum difficulty of a job done on that day.</p>

<p>You are given an integer array <code>jobDifficulty</code> and an integer <code>d</code>. The difficulty of the <code>i<sup>th</sup></code> job is <code>jobDifficulty[i]</code>.</p>

<p>Return <em>the minimum difficulty of a job schedule</em>. If you cannot find a schedule for the jobs return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/01/16/untitled.png" style="width: 365px; height: 370px;">
<pre><strong>Input:</strong> jobDifficulty = [6,5,4,3,2,1], d = 2
<strong>Output:</strong> 7
<strong>Explanation:</strong> First day you can finish the first 5 jobs, total difficulty = 6.
Second day you can finish the last job, total difficulty = 1.
The difficulty of the schedule = 6 + 1 = 7 
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> jobDifficulty = [9,9,9], d = 4
<strong>Output:</strong> -1
<strong>Explanation:</strong> If you finish a job per day you will still have a free day. you cannot find a schedule for the given jobs.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> jobDifficulty = [1,1,1], d = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> The schedule is one job per day. total difficulty will be 3.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= jobDifficulty.length &lt;= 300</code></li>
	<li><code>0 &lt;= jobDifficulty[i] &lt;= 1000</code></li>
	<li><code>1 &lt;= d &lt;= 10</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(n<sup>2</sup>d)</em>
- Space complexity: <em>O(nd)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
const minDifficulty = function (jobDifficulty, d) {
  const n = jobDifficulty.length;

  if (n < d) return -1;
  const memo = Array.from({ length: n }, () => new Array(d).fill(-1));
  const maxDifficultyJobs = Array.from({ length: n }, () => 0);
  let currentMaxDifficulty = 0;

  for (let index = n - 1; index >= 0; index--) {
    currentMaxDifficulty = Math.max(jobDifficulty[index], currentMaxDifficulty);
    maxDifficultyJobs[index] = currentMaxDifficulty;
  }

  const finishJobs = (job, day) => {
    if (day === d) return maxDifficultyJobs[job];
    if (memo[job][day] !== -1) return memo[job][day];
    let maxDifficulty = 0;
    let result = Number.MAX_SAFE_INTEGER;

    for (let index = job; index < n - (d - day); index++) {
      maxDifficulty = Math.max(jobDifficulty[index], maxDifficulty);

      const difficulty = maxDifficulty + finishJobs(index + 1, day + 1);

      result = Math.min(difficulty, result);
    }
    memo[job][day] = result;

    return result;
  };

  return finishJobs(0, 1);
};
```
