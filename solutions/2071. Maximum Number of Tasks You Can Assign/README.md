# [2071. Maximum Number of Tasks You Can Assign](https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign)

## Description

<div class="elfjS" data-track-load="description_content"><p>You have <code>n</code> tasks and <code>m</code> workers. Each task has a strength requirement stored in a <strong>0-indexed</strong> integer array <code>tasks</code>, with the <code>i<sup>th</sup></code> task requiring <code>tasks[i]</code> strength to complete. The strength of each worker is stored in a <strong>0-indexed</strong> integer array <code>workers</code>, with the <code>j<sup>th</sup></code> worker having <code>workers[j]</code> strength. Each worker can only be assigned to a <strong>single</strong> task and must have a strength <strong>greater than or equal</strong> to the task's strength requirement (i.e., <code>workers[j] &gt;= tasks[i]</code>).</p>

<p>Additionally, you have <code>pills</code> magical pills that will <strong>increase a worker's strength</strong> by <code>strength</code>. You can decide which workers receive the magical pills, however, you may only give each worker <strong>at most one</strong> magical pill.</p>

<p>Given the <strong>0-indexed </strong>integer arrays <code>tasks</code> and <code>workers</code> and the integers <code>pills</code> and <code>strength</code>, return <em>the <strong>maximum</strong> number of tasks that can be completed.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> tasks = [<u><strong>3</strong></u>,<u><strong>2</strong></u>,<u><strong>1</strong></u>], workers = [<u><strong>0</strong></u>,<u><strong>3</strong></u>,<u><strong>3</strong></u>], pills = 1, strength = 1
<strong>Output:</strong> 3
<strong>Explanation:</strong>
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 2 (0 + 1 &gt;= 1)
- Assign worker 1 to task 1 (3 &gt;= 2)
- Assign worker 2 to task 0 (3 &gt;= 3)
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> tasks = [<u><strong>5</strong></u>,4], workers = [<u><strong>0</strong></u>,0,0], pills = 1, strength = 5
<strong>Output:</strong> 1
<strong>Explanation:</strong>
We can assign the magical pill and tasks as follows:
- Give the magical pill to worker 0.
- Assign worker 0 to task 0 (0 + 5 &gt;= 5)
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> tasks = [<u><strong>10</strong></u>,<u><strong>15</strong></u>,30], workers = [<u><strong>0</strong></u>,<u><strong>10</strong></u>,10,10,10], pills = 3, strength = 10
<strong>Output:</strong> 2
<strong>Explanation:</strong>
We can assign the magical pills and tasks as follows:
- Give the magical pill to worker 0 and worker 1.
- Assign worker 0 to task 0 (0 + 10 &gt;= 10)
- Assign worker 1 to task 1 (10 + 10 &gt;= 15)
The last pill is not given because it will not make any worker strong enough for the last task.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == tasks.length</code></li>
	<li><code>m == workers.length</code></li>
	<li><code>1 &lt;= n, m &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>0 &lt;= pills &lt;= m</code></li>
	<li><code>0 &lt;= tasks[i], workers[j], strength &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Monotonic Queue`**

- Time complexity: <em>O(nlogn+mlogm+min(n,m)\*log(min(n,m)))</em>
- Space complexity: <em>O(min(n,m))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} tasks
 * @param {number[]} workers
 * @param {number} pills
 * @param {number} strength
 * @return {number}
 */
const maxTaskAssign = function (tasks, workers, pills, strength) {
  const n = tasks.length;
  const m = workers.length;
  let left = 0;
  let right = Math.min(n, m);
  let result = 0;

  tasks.sort((a, b) => a - b);
  workers.sort((a, b) => a - b);

  const isCanComplete = assign => {
    const queue = [];
    let worker = m - 1;
    let remainPills = pills;

    for (let index = assign - 1; index >= 0; index--) {
      const task = tasks[index];

      if (queue.length && queue[0] >= task) {
        queue.shift();
      } else if (worker >= 0 && workers[worker] >= task) {
        worker -= 1;
      } else {
        while (worker >= 0 && workers[worker] + strength >= task) {
          queue.push(workers[worker]);
          worker -= 1;
        }

        if (!queue.length || !remainPills) return false;

        queue.pop();
        remainPills -= 1;
      }
    }

    return true;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (isCanComplete(mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};
```
