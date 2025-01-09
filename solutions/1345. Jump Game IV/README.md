# [1345. Jump Game IV](https://leetcode.com/problems/jump-game-iv)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array of&nbsp;integers <code>arr</code>, you are initially positioned at the first index of the array.</p>

<p>In one step you can jump from index <code>i</code> to index:</p>

<ul>
	<li><code>i + 1</code> where:&nbsp;<code>i + 1 &lt; arr.length</code>.</li>
	<li><code>i - 1</code> where:&nbsp;<code>i - 1 &gt;= 0</code>.</li>
	<li><code>j</code> where: <code>arr[i] == arr[j]</code> and <code>i != j</code>.</li>
</ul>

<p>Return <em>the minimum number of steps</em> to reach the <strong>last index</strong> of the array.</p>

<p>Notice that you can not jump outside of the array at any time.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr = [100,-23,-23,404,100,23,23,23,3,404]
<strong>Output:</strong> 3
<strong>Explanation:</strong> You need three jumps from index 0 --&gt; 4 --&gt; 3 --&gt; 9. Note that index 9 is the last index of the array.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr = [7]
<strong>Output:</strong> 0
<strong>Explanation:</strong> Start index is the last index. You do not need to jump.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> arr = [7,6,9,6,9,6,9,7]
<strong>Output:</strong> 1
<strong>Explanation:</strong> You can jump directly from index 0 to index 7 which is last index of the array.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>-10<sup>8</sup> &lt;= arr[i] &lt;= 10<sup>8</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @return {number}
 */
const minJumps = function (arr) {
  const n = arr.length;

  if (n === 1) return 0;
  const arrMap = new Map();

  for (let index = 0; index < n; index++) {
    const value = arr[index];

    if (!arrMap.has(value)) {
      arrMap.set(value, []);
    }
    const indices = arrMap.get(value);

    indices.push(index);
  }

  let queue = [0];
  let result = 0;

  const isValidIndex = index => index > -1 && index < n && arrMap.has(arr[index]);

  while (queue.length) {
    const nextQueue = [];

    result += 1;

    for (const index of queue) {
      const value = arr[index];
      const forwardIndex = index + 1;
      const backIndex = index - 1;

      if (forwardIndex === n - 1 || backIndex === n - 1) return result;
      if (isValidIndex(forwardIndex)) {
        nextQueue.push(forwardIndex);
      }
      if (isValidIndex(backIndex)) {
        nextQueue.push(backIndex);
      }

      for (const nextIndex of arrMap.get(value) ?? []) {
        if (nextIndex === n - 1) return result;
        nextQueue.push(nextIndex);
      }
      arrMap.delete(value);
    }
    queue = nextQueue;
  }
  return -1;
};
```
