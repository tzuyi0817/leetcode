# [1354. Construct Target Array With Multiple Sums](https://leetcode.com/problems/construct-target-array-with-multiple-sums)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>target</code> of n integers. From a starting array <code>arr</code> consisting of <code>n</code> 1's, you may perform the following procedure :</p>

<ul>
	<li>let <code>x</code> be the sum of all elements currently in your array.</li>
	<li>choose index <code>i</code>, such that <code>0 &lt;= i &lt; n</code> and set the value of <code>arr</code> at index <code>i</code> to <code>x</code>.</li>
	<li>You may repeat this procedure as many times as needed.</li>
</ul>

<p>Return <code>true</code> <em>if it is possible to construct the</em> <code>target</code> <em>array from</em> <code>arr</code><em>, otherwise, return</em> <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> target = [9,3,5]
<strong>Output:</strong> true
<strong>Explanation:</strong> Start with arr = [1, 1, 1] 
[1, 1, 1], sum = 3 choose index 1
[1, 3, 1], sum = 5 choose index 2
[1, 3, 5], sum = 9 choose index 0
[9, 3, 5] Done
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> target = [1,1,1,2]
<strong>Output:</strong> false
<strong>Explanation:</strong> Impossible to create target array from [1,1,1,1].
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> target = [8,5]
<strong>Output:</strong> true
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == target.length</code></li>
	<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= target[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue`**

- Time complexity: <em>O(nlogM\*logn)</em>
  - `M` is Max(target[i])
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} target
 * @return {boolean}
 */
const isPossible = function (target) {
  const queue = new MaxPriorityQueue();
  let sum = target.reduce((result, num) => result + num);

  for (const num of target) {
    queue.enqueue(num);
  }

  while (queue.front().element > 1) {
    const num = queue.dequeue().element;
    const restSum = sum - num;

    if (restSum === 0) return false;
    if (restSum === 1) return true;
    const nextNum = num % restSum;

    if (nextNum < 1 || nextNum === num) return false;
    queue.enqueue(nextNum);
    sum = sum - num + nextNum;
  }
  return true;
};
```
