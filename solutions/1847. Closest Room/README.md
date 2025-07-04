# [1847. Closest Room](https://leetcode.com/problems/closest-room)

## Description

<div class="elfjS" data-track-load="description_content"><p>There is a hotel with <code>n</code> rooms. The rooms are represented by a 2D integer array <code>rooms</code> where <code>rooms[i] = [roomId<sub>i</sub>, size<sub>i</sub>]</code> denotes that there is a room with room number <code>roomId<sub>i</sub></code> and size equal to <code>size<sub>i</sub></code>. Each <code>roomId<sub>i</sub></code> is guaranteed to be <strong>unique</strong>.</p>

<p>You are also given <code>k</code> queries in a 2D array <code>queries</code> where <code>queries[j] = [preferred<sub>j</sub>, minSize<sub>j</sub>]</code>. The answer to the <code>j<sup>th</sup></code> query is the room number <code>id</code> of a room such that:</p>

<ul>
	<li>The room has a size of <strong>at least</strong> <code>minSize<sub>j</sub></code>, and</li>
	<li><code>abs(id - preferred<sub>j</sub>)</code> is <strong>minimized</strong>, where <code>abs(x)</code> is the absolute value of <code>x</code>.</li>
</ul>

<p>If there is a <strong>tie</strong> in the absolute difference, then use the room with the <strong>smallest</strong> such <code>id</code>. If there is <strong>no such room</strong>, the answer is <code>-1</code>.</p>

<p>Return <em>an array </em><code>answer</code><em> of length </em><code>k</code><em> where </em><code>answer[j]</code><em> contains the answer to the </em><code>j<sup>th</sup></code><em> query</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> rooms = [[2,2],[1,2],[3,2]], queries = [[3,1],[3,3],[5,2]]
<strong>Output:</strong> [3,-1,3]
<strong>Explanation: </strong>The answers to the queries are as follows:
Query = [3,1]: Room number 3 is the closest as abs(3 - 3) = 0, and its size of 2 is at least 1. The answer is 3.
Query = [3,3]: There are no rooms with a size of at least 3, so the answer is -1.
Query = [5,2]: Room number 3 is the closest as abs(3 - 5) = 2, and its size of 2 is at least 2. The answer is 3.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> rooms = [[1,4],[2,3],[3,5],[4,1],[5,2]], queries = [[2,3],[2,4],[2,5]]
<strong>Output:</strong> [2,1,3]
<strong>Explanation: </strong>The answers to the queries are as follows:
Query = [2,3]: Room number 2 is the closest as abs(2 - 2) = 0, and its size of 3 is at least 3. The answer is 2.
Query = [2,4]: Room numbers 1 and 3 both have sizes of at least 4. The answer is 1 since it is smaller.
Query = [2,5]: Room number 3 is the only room with a size of at least 5. The answer is 3.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == rooms.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>k == queries.length</code></li>
	<li><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= roomId<sub>i</sub>, preferred<sub>j</sub> &lt;= 10<sup>7</sup></code></li>
	<li><code>1 &lt;= size<sub>i</sub>, minSize<sub>j</sub> &lt;= 10<sup>7</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn+klogk+klogn)</em>
- Space complexity: <em>O(n+k)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} rooms
 * @param {number[][]} queries
 * @return {number[]}
 */
const closestRoom = function (rooms, queries) {
  const n = rooms.length;
  const k = queries.length;
  const indexdQueries = queries.map(([preferred, minSize], index) => {
    return { preferred, minSize, index };
  });
  const result = Array.from({ length: k }, () => -1);
  const sortedRooms = [];
  let roomIndex = 0;

  const insertRoom = id => {
    let left = 0;
    let right = sortedRooms.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (sortedRooms[mid] < id) left = mid + 1;
      else right = mid;
    }

    sortedRooms.splice(left, 0, id);
  };

  const searchClosest = id => {
    if (!sortedRooms.length) return -1;
    let left = 0,
      right = sortedRooms.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (sortedRooms[mid] < id) left = mid + 1;
      else right = mid - 1;
    }

    if (left >= sortedRooms.length && right < 0) return -1;
    if (right < 0) return sortedRooms[left];
    if (left >= sortedRooms.length) return sortedRooms[right];
    const leftDiff = Math.abs(sortedRooms[left] - id);
    const rightDiff = Math.abs(sortedRooms[right] - id);

    if (leftDiff === rightDiff) return Math.min(sortedRooms[left], sortedRooms[right]);

    return leftDiff > rightDiff ? sortedRooms[right] : sortedRooms[left];
  };

  rooms.sort((a, b) => b[1] - a[1]);
  indexdQueries.sort((a, b) => b.minSize - a.minSize);

  for (const { preferred, minSize, index } of indexdQueries) {
    while (roomIndex < n && rooms[roomIndex][1] >= minSize) {
      const roomId = rooms[roomIndex][0];

      insertRoom(roomId);
      roomIndex += 1;
    }

    result[index] = searchClosest(preferred);
  }

  return result;
};
```
