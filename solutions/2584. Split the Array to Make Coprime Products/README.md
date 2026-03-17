# [2584. Split the Array to Make Coprime Products](https://leetcode.com/problems/split-the-array-to-make-coprime-products)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code> of length <code>n</code>.</p>

<p>A <strong>split</strong> at an index <code>i</code> where <code>0 &lt;= i &lt;= n - 2</code> is called <strong>valid</strong> if the product of the first <code>i + 1</code> elements and the product of the remaining elements are coprime.</p>

<ul>
	<li>For example, if <code>nums = [2, 3, 3]</code>, then a split at the index <code>i = 0</code> is valid because <code>2</code> and <code>9</code> are coprime, while a split at the index <code>i = 1</code> is not valid because <code>6</code> and <code>3</code> are not coprime. A split at the index <code>i = 2</code> is not valid because <code>i == n - 1</code>.</li>
</ul>

<p>Return <em>the smallest index </em><code>i</code><em> at which the array can be split validly or </em><code>-1</code><em> if there is no such split</em>.</p>

<p>Two values <code>val1</code> and <code>val2</code> are coprime if <code>gcd(val1, val2) == 1</code> where <code>gcd(val1, val2)</code> is the greatest common divisor of <code>val1</code> and <code>val2</code>.</p>

<p>&nbsp;</p>
<p><strong>Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/12/14/second.PNG" style="width: 450px; height: 211px;">
<pre><strong>Input:</strong> nums = [4,7,8,15,3,5]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The table above shows the values of the product of the first i + 1 elements, the remaining elements, and their gcd at each index i.
The only valid split is at index 2.
</pre>

<p><strong>Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/12/14/capture.PNG" style="width: 450px; height: 215px;">
<pre><strong>Input:</strong> nums = [4,7,15,8,3,5]
<strong>Output:</strong> -1
<strong>Explanation:</strong> The table above shows the values of the product of the first i + 1 elements, the remaining elements, and their gcd at each index i.
There is no valid split.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table + Math`**

- Time complexity: <em>O(nlogMax(nums))</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const findValidSplit = function (nums) {
  const n = nums.length;
  const leftPrimeFactors = new Set();
  const rightPrimeMap = new Map();

  const getPrimeFactors = num => {
    const factorMap = new Map();

    for (let x = 2; x ** 2 <= num; x++) {
      while (num % x === 0) {
        const count = factorMap.get(x) ?? 0;

        factorMap.set(x, count + 1);
        num /= x;
      }
    }

    if (num > 1) {
      const count = factorMap.get(num) ?? 0;

      factorMap.set(num, count + 1);
    }

    return factorMap;
  };

  for (const num of nums) {
    const factorMap = getPrimeFactors(num);

    for (const [prime, count] of factorMap) {
      const primeCount = rightPrimeMap.get(prime) ?? 0;

      rightPrimeMap.set(prime, primeCount + count);
    }
  }

  for (let index = 0; index < n - 1; index++) {
    const num = nums[index];
    const factorMap = getPrimeFactors(num);

    for (const [prime, count] of factorMap) {
      const primeCount = rightPrimeMap.get(prime) ?? 0;

      if (count >= primeCount) {
        rightPrimeMap.delete(prime);
        leftPrimeFactors.delete(prime);
      } else {
        rightPrimeMap.set(prime, primeCount - count);
        leftPrimeFactors.add(prime);
      }
    }

    if (!leftPrimeFactors.size) return index;
  }

  return -1;
};
```
