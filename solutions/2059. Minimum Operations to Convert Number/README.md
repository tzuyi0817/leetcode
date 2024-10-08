# [2059. Minimum Operations to Convert Number](https://leetcode.com/problems/minimum-operations-to-convert-number)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code> containing <strong>distinct</strong> numbers, an integer <code>start</code>, and an integer <code>goal</code>. There is an integer <code>x</code> that is initially set to <code>start</code>, and you want to perform operations on <code>x</code> such that it is converted to <code>goal</code>. You can perform the following operation repeatedly on the number <code>x</code>:</p>

<p>If <code>0 &lt;= x &lt;= 1000</code>, then for any index <code>i</code> in the array (<code>0 &lt;= i &lt; nums.length</code>), you can set <code>x</code> to any of the following:</p>

<ul>
	<li><code>x + nums[i]</code></li>
	<li><code>x - nums[i]</code></li>
	<li><code>x ^ nums[i]</code> (bitwise-XOR)</li>
</ul>

<p>Note that you can use each <code>nums[i]</code> any number of times in any order. Operations that set <code>x</code> to be out of the range <code>0 &lt;= x &lt;= 1000</code> are valid, but no more operations can be done afterward.</p>

<p>Return <em>the <strong>minimum</strong> number of operations needed to convert </em><code>x = start</code><em> into </em><code>goal</code><em>, and </em><code>-1</code><em> if it is not possible</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,4,12], start = 2, goal = 12
<strong>Output:</strong> 2
<strong>Explanation:</strong> We can go from 2 → 14 → 12 with the following 2 operations.
- 2 + 12 = 14
- 14 - 2 = 12
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,5,7], start = 0, goal = -4
<strong>Output:</strong> 2
<strong>Explanation:</strong> We can go from 0 → 3 → -4 with the following 2 operations. 
- 0 + 3 = 3
- 3 - 7 = -4
Note that the last operation sets x out of the range 0 &lt;= x &lt;= 1000, which is valid.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [2,8,16], start = 0, goal = 1
<strong>Output:</strong> -1
<strong>Explanation:</strong> There is no way to convert 0 into 1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i], goal &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= start &lt;= 1000</code></li>
	<li><code>start != goal</code></li>
	<li>All the integers in <code>nums</code> are distinct.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Breadth-First Search`**

- Time complexity: <em>O(1000n)</em>
- Space complexity: <em>O(1000)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
const minimumOperations = function (nums, start, goal) {
  const visited = new Set();
  let queue = [start];
  let result = 0;

  function isValidOperation(value) {
    if (value < 0 || value > 1000) return false;
    if (visited.has(value)) return false;
    visited.add(value);
    return true;
  }

  while (queue.length) {
    const size = queue.length;
    const nextQueue = [];

    result += 1;
    for (let index = 0; index < size; index++) {
      const value = queue.pop();

      for (const num of nums) {
        const add = value + num;
        const minus = value - num;
        const xor = value ^ num;

        if (add === goal || minus === goal || xor === goal) return result;
        isValidOperation(add) && nextQueue.push(add);
        isValidOperation(minus) && nextQueue.push(minus);
        isValidOperation(xor) && nextQueue.push(xor);
      }
    }
    queue = nextQueue;
  }
  return -1;
};
```
