# [2054. Two Best Non-Overlapping Events](https://leetcode.com/problems/two-best-non-overlapping-events)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> 2D integer array of <code>events</code> where <code>events[i] = [startTime<sub>i</sub>, endTime<sub>i</sub>, value<sub>i</sub>]</code>. The <code>i<sup>th</sup></code> event starts at <code>startTime<sub>i</sub></code><sub> </sub>and ends at <code>endTime<sub>i</sub></code>, and if you attend this event, you will receive a value of <code>value<sub>i</sub></code>. You can choose <strong>at most</strong> <strong>two</strong> <strong>non-overlapping</strong> events to attend such that the sum of their values is <strong>maximized</strong>.</p>

<p>Return <em>this <strong>maximum</strong> sum.</em></p>

<p>Note that the start time and end time is <strong>inclusive</strong>: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time <code>t</code>, the next event must start at or after <code>t + 1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/09/21/picture5.png" style="width: 400px; height: 75px;">
<pre><strong>Input:</strong> events = [[1,3,2],[4,5,2],[2,4,3]]
<strong>Output:</strong> 4
<strong>Explanation: </strong>Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="Example 1 Diagram" src="https://assets.leetcode.com/uploads/2021/09/21/picture1.png" style="width: 400px; height: 77px;">
<pre><strong>Input:</strong> events = [[1,3,2],[4,5,2],[1,5,5]]
<strong>Output:</strong> 5
<strong>Explanation: </strong>Choose event 2 for a sum of 5.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/09/21/picture3.png" style="width: 400px; height: 66px;">
<pre><strong>Input:</strong> events = [[1,5,3],[1,5,1],[6,6,5]]
<strong>Output:</strong> 8
<strong>Explanation: </strong>Choose events 0 and 2 for a sum of 3 + 5 = 8.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= events.length &lt;= 10<sup>5</sup></code></li>
	<li><code>events[i].length == 3</code></li>
	<li><code>1 &lt;= startTime<sub>i</sub> &lt;= endTime<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= value<sub>i</sub> &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sorting`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} events
 * @return {number}
 */
const maxTwoEvents = function (events) {
  const endEventMap = events.reduce((map, [_, end, value]) => {
    const previousValue = map.get(end);

    if (previousValue >= value) return map;
    return map.set(end, value);
  }, new Map());
  const endEvents = [...endEventMap.keys()];
  let previousValue = 0;
  let result = 0;
  let currentEnd = 0;

  events.sort((a, b) => a[0] - b[0]);
  endEvents.sort((a, b) => a - b);

  for (const event of events) {
    const start = event[0];
    const value = event[2];

    while (endEvents[currentEnd] < start) {
      const endValue = endEventMap.get(endEvents[currentEnd]);

      previousValue = Math.max(endValue, previousValue);
      currentEnd += 1;
    }
    result = Math.max(previousValue + value, result);
  }
  return result;
};
```
