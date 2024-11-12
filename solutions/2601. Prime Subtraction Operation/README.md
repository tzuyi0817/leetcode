# [2601. Prime Subtraction Operation](https://leetcode.com/problems/prime-subtraction-operation)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code> of length <code>n</code>.</p>

<p>You can perform the following operation as many times as you want:</p>

<ul>
	<li>Pick an index <code>i</code> that you haven’t picked before, and pick a prime <code>p</code> <strong>strictly less than</strong> <code>nums[i]</code>, then subtract <code>p</code> from <code>nums[i]</code>.</li>
</ul>

<p>Return <em>true if you can make <code>nums</code> a strictly increasing array using the above operation and false otherwise.</em></p>

<p>A <strong>strictly increasing array</strong> is an array whose each element is strictly greater than its preceding element.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [4,9,6,10]
<strong>Output:</strong> true
<strong>Explanation:</strong> In the first operation: Pick i = 0 and p = 3, and then subtract 3 from nums[0], so that nums becomes [1,9,6,10].
In the second operation: i = 1, p = 7, subtract 7 from nums[1], so nums becomes equal to [1,2,6,10].
After the second operation, nums is sorted in strictly increasing order, so the answer is true.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [6,8,11,12]
<strong>Output:</strong> true
<strong>Explanation: </strong>Initially nums is sorted in strictly increasing order, so we don't need to make any operations.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [5,8,3]
<strong>Output:</strong> false
<strong>Explanation:</strong> It can be proven that there is no way to perform operations to make nums sorted in strictly increasing order, so the answer is false.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>
	<li><code>nums.length == n</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const primeSubOperation = function (nums) {
  const n = nums.length;
  const memo = new Map();

  const isPrime = num => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    if (memo.has(num)) return memo.get(num);

    for (let index = 5; index * index <= num; index++) {
      if (num % index === 0) {
        memo.set(num, false);
        return false;
      }
    }
    memo.set(num, true);
    return true;
  };

  const getMinPrime = (start, end) => {
    for (let num = start; num < end; num++) {
      if (isPrime(num)) return num;
    }
    return -1;
  };

  let next = nums[n - 1];

  for (let index = n - 2; index >= 0; index--) {
    const current = nums[index];

    if (current < next) {
      next = current;
      continue;
    }
    const prime = getMinPrime(current - next + 1, current);

    if (prime === -1) return false;

    next = current - prime;
  }
  return true;
};
```
