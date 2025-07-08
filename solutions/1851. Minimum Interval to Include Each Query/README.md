# [1851. Minimum Interval to Include Each Query](https://leetcode.com/problems/minimum-interval-to-include-each-query)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a 2D integer array <code>intervals</code>, where <code>intervals[i] = [left<sub>i</sub>, right<sub>i</sub>]</code> describes the <code>i<sup>th</sup></code> interval starting at <code>left<sub>i</sub></code> and ending at <code>right<sub>i</sub></code> <strong>(inclusive)</strong>. The <strong>size</strong> of an interval is defined as the number of integers it contains, or more formally <code>right<sub>i</sub> - left<sub>i</sub> + 1</code>.</p>

<p>You are also given an integer array <code>queries</code>. The answer to the <code>j<sup>th</sup></code> query is the <strong>size of the smallest interval</strong> <code>i</code> such that <code>left<sub>i</sub> &lt;= queries[j] &lt;= right<sub>i</sub></code>. If no such interval exists, the answer is <code>-1</code>.</p>

<p>Return <em>an array containing the answers to the queries</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
<strong>Output:</strong> [3,3,1,4]
<strong>Explanation:</strong> The queries are processed as follows:
- Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3.
- Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3.
- Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1.
- Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
<strong>Output:</strong> [2,-1,4,6]
<strong>Explanation:</strong> The queries are processed as follows:
- Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2.
- Query = 19: None of the intervals contain 19. The answer is -1.
- Query = 5: The interval [2,5] is the smallest interval containing 5. The answer is 5 - 2 + 1 = 4.
- Query = 22: The interval [20,25] is the smallest interval containing 22. The answer is 25 - 20 + 1 = 6.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= intervals.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>intervals[i].length == 2</code></li>
	<li><code>1 &lt;= left<sub>i</sub> &lt;= right<sub>i</sub> &lt;= 10<sup>7</sup></code></li>
	<li><code>1 &lt;= queries[j] &lt;= 10<sup>7</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue`**

- Time complexity: <em>O(nlogn+mlogm+nlogm)</em>
- Space complexity: <em>O(m+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
const minInterval = function (intervals, queries) {
  const m = intervals.length;
  const n = queries.length;
  const minHeap = new MinPriorityQueue(({ left, right }) => right - left + 1);
  const indexedQueries = queries.map((query, index) => ({ query, index }));
  const result = Array.from({ length: n }, () => -1);
  let intervalIndex = 0;

  intervals.sort((a, b) => a[0] - b[0]);
  indexedQueries.sort((a, b) => a.query - b.query);

  for (const { query, index } of indexedQueries) {
    while (intervalIndex < m && intervals[intervalIndex][0] <= query) {
      const [left, right] = intervals[intervalIndex];

      minHeap.enqueue({ left, right });
      intervalIndex += 1;
    }

    while (minHeap.size() && minHeap.front().right < query) {
      minHeap.dequeue();
    }

    if (!minHeap.size()) continue;
    const { left, right } = minHeap.front();

    result[index] = right - left + 1;
  }

  return result;
};
```
