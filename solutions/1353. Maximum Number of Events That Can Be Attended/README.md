# [1353. Maximum Number of Events That Can Be Attended](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array of <code>events</code> where <code>events[i] = [startDay<sub>i</sub>, endDay<sub>i</sub>]</code>. Every event <code>i</code> starts at <code>startDay<sub>i</sub></code><sub> </sub>and ends at <code>endDay<sub>i</sub></code>.</p>

<p>You can attend an event <code>i</code> at any day <code>d</code> where <code>startTime<sub>i</sub> &lt;= d &lt;= endTime<sub>i</sub></code>. You can only attend one event at any time <code>d</code>.</p>

<p>Return <em>the maximum number of events you can attend</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/02/05/e1.png" style="width: 400px; height: 267px;">
<pre><strong>Input:</strong> events = [[1,2],[2,3],[3,4]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> You can attend all the three events.
One way to attend them all is as shown.
Attend the first event on day 1.
Attend the second event on day 2.
Attend the third event on day 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> events= [[1,2],[2,3],[3,4],[1,2]]
<strong>Output:</strong> 4
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= events.length &lt;= 10<sup>5</sup></code></li>
	<li><code>events[i].length == 2</code></li>
	<li><code>1 &lt;= startDay<sub>i</sub> &lt;= endDay<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} events
 * @return {number}
 */
const maxEvents = function (events) {
  const n = events.length;
  const endDayHeap = new MinPriorityQueue();
  let currentDay = 0;
  let index = 0;
  let result = 0;

  events.sort((a, b) => a[0] - b[0]);

  while (index < n || endDayHeap.size()) {
    if (!endDayHeap.size()) {
      const startDay = events[index][0];

      currentDay = startDay;
    }

    while (index < n && events[index][0] <= currentDay) {
      const endDay = events[index][1];

      endDayHeap.enqueue(endDay);
      index += 1;
    }

    result += 1;
    currentDay += 1;
    endDayHeap.dequeue();

    while (endDayHeap.size() && endDayHeap.front() < currentDay) {
      endDayHeap.dequeue();
    }
  }

  return result;
};
```
