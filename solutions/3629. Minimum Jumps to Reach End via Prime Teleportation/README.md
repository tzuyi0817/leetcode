# [3629. Minimum Jumps to Reach End via Prime Teleportation](https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>nums</code> of length <code>n</code>.</p>

<p>You start at index 0, and your goal is to reach index <code>n - 1</code>.</p>

<p>From any index <code>i</code>, you may perform one of the following operations:</p>

<ul>
	<li><strong>Adjacent Step</strong>: Jump to index <code>i + 1</code> or <code>i - 1</code>, if the index is within bounds.</li>
	<li><strong>Prime Teleportation</strong>: If <code>nums[i]</code> is a <span data-keyword="prime-number" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1j_" data-state="closed" class="">prime number</button></span> <code>p</code>, you may instantly jump to any index <code>j != i</code> such that <code>nums[j] % p == 0</code>.</li>
</ul>

<p>Return the <strong>minimum</strong> number of jumps required to reach index <code>n - 1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,4,6]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>One optimal sequence of jumps is:</p>

<ul>
	<li>Start at index <code>i = 0</code>. Take an adjacent step to index 1.</li>
	<li>At index <code>i = 1</code>, <code>nums[1] = 2</code> is a prime number. Therefore, we teleport to index <code>i = 3</code> as <code>nums[3] = 6</code> is divisible by 2.</li>
</ul>

<p>Thus, the answer is 2.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,3,4,7,9]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>One optimal sequence of jumps is:</p>

<ul>
	<li>Start at index <code>i = 0</code>. Take an adjacent step to index <code>i = 1</code>.</li>
	<li>At index <code>i = 1</code>, <code>nums[1] = 3</code> is a prime number. Therefore, we teleport to index <code>i = 4</code> since <code>nums[4] = 9</code> is divisible by 3.</li>
</ul>

<p>Thus, the answer is 2.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,6,5,8]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Since no teleportation is possible, we move through <code>0 → 1 → 2 → 3</code>. Thus, the answer is 3.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n == nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sieve of Eratosthenes + Breadth-First Search`**

- Time complexity: <em>O(mloglogm+nlogm)</em>
  - m = Max(nums)
- Space complexity: <em>O(m+nlogm)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const minJumps = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const sieve = Array.from({ length: maxNum + 1 }, (_, index) => index);
  const visited = Array.from({ length: n }, () => false);
  const primeSet = new Set();
  const primeMap = new Map();
  let queue = [0];
  let result = 0;

  const isPrime = x => x > 1 && sieve[x] === x;

  for (let a = 2; a ** 2 <= maxNum; a++) {
    if (sieve[a] !== a) continue;

    for (let b = a * a; b <= maxNum; b += a) {
      if (sieve[b] === b) {
        sieve[b] = a;
      }
    }
  }

  for (const num of nums) {
    if (isPrime(num)) {
      primeSet.add(num);
    }
  }

  for (let index = 0; index < n; index++) {
    let current = nums[index];

    while (current > 1) {
      const prime = sieve[current];

      if (primeSet.has(prime)) {
        if (!primeMap.has(prime)) {
          primeMap.set(prime, []);
        }

        primeMap.get(prime).push(index);
      }

      while (current % prime === 0) {
        current /= prime;
      }
    }
  }

  while (queue.length) {
    const nextQueue = [];

    for (const index of queue) {
      if (index === n - 1) return result;

      const num = nums[index];
      const prev = index - 1;
      const next = index + 1;

      if (prev >= 0 && !visited[prev]) {
        visited[prev] = true;
        nextQueue.push(prev);
      }

      if (next < n && !visited[next]) {
        visited[next] = true;
        nextQueue.push(next);
      }

      if (!isPrime(num)) continue;

      for (const pos of primeMap.get(num)) {
        if (pos === index || visited[pos]) continue;

        visited[pos] = true;
        nextQueue.push(pos);
      }

      primeMap.set(num, []);
    }

    queue = nextQueue;
    result += 1;
  }

  return -1;
};
```
