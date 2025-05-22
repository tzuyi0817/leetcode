# [1723. Find Minimum Time to Finish All Jobs](https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>jobs</code>, where <code>jobs[i]</code> is the amount of time it takes to complete the <code>i<sup>th</sup></code> job.</p>

<p>There are <code>k</code> workers that you can assign jobs to. Each job should be assigned to <strong>exactly</strong> one worker. The <strong>working time</strong> of a worker is the sum of the time it takes to complete all jobs assigned to them. Your goal is to devise an optimal assignment such that the <strong>maximum working time</strong> of any worker is <strong>minimized</strong>.</p>

<p><em>Return the <strong>minimum</strong> possible <strong>maximum working time</strong> of any assignment. </em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> jobs = [3,2,3], k = 3
<strong>Output:</strong> 3
<strong>Explanation:</strong> By assigning each person one job, the maximum time is 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> jobs = [1,2,4,7,8], k = 2
<strong>Output:</strong> 11
<strong>Explanation:</strong> Assign the jobs the following way:
Worker 1: 1, 2, 8 (working time = 1 + 2 + 8 = 11)
Worker 2: 4, 7 (working time = 4 + 7 = 11)
The maximum working time is 11.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= k &lt;= jobs.length &lt;= 12</code></li>
	<li><code>1 &lt;= jobs[i] &lt;= 10<sup>7</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Backtracking`**

- Time complexity: <em>O(k<sup>n</sup>)</em>
- Space complexity: <em>O(k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} jobs
 * @param {number} k
 * @return {number}
 */
const minimumTimeRequired = function (jobs, k) {
  const n = jobs.length;
  const workers = Array.from({ length: k }, () => 0);
  let result = Number.MAX_SAFE_INTEGER;

  jobs.sort((a, b) => b - a);

  const assignJob = (index, maxTime) => {
    if (maxTime >= result) return;
    if (index >= n) {
      result = Math.min(maxTime, result);
      return;
    }
    const time = jobs[index];

    for (let worker = 0; worker < k; worker++) {
      workers[worker] += time;

      const nextMaxTime = Math.max(workers[worker], maxTime);

      assignJob(index + 1, nextMaxTime);
      workers[worker] -= time;

      if (workers[worker] === 0) return;
    }
  };

  assignJob(0, 0);

  return result;
};
```
