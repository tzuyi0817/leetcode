# [1998. GCD Sort of an Array](https://leetcode.com/problems/gcd-sort-of-an-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code>, and you can perform the following operation <strong>any</strong> number of times on <code>nums</code>:</p>

<ul>
	<li>Swap the positions of two elements <code>nums[i]</code> and <code>nums[j]</code> if <code>gcd(nums[i], nums[j]) &gt; 1</code> where <code>gcd(nums[i], nums[j])</code> is the <strong>greatest common divisor</strong> of <code>nums[i]</code> and <code>nums[j]</code>.</li>
</ul>

<p>Return <code>true</code> <em>if it is possible to sort </em><code>nums</code><em> in <strong>non-decreasing</strong> order using the above swap method, or </em><code>false</code><em> otherwise.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [7,21,3]
<strong>Output:</strong> true
<strong>Explanation:</strong> We can sort [7,21,3] by performing the following operations:
- Swap 7 and 21 because gcd(7,21) = 7. nums = [<u><strong>21</strong></u>,<u><strong>7</strong></u>,3]
- Swap 21 and 3 because gcd(21,3) = 3. nums = [<u><strong>3</strong></u>,7,<u><strong>21</strong></u>]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [5,2,6,2]
<strong>Output:</strong> false
<strong>Explanation:</strong> It is impossible to sort the array because 5 cannot be swapped with any other element.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [10,5,9,3,15]
<strong>Output:</strong> true
We can sort [10,5,9,3,15] by performing the following operations:
- Swap 10 and 15 because gcd(10,15) = 5. nums = [<u><strong>15</strong></u>,5,9,3,<u><strong>10</strong></u>]
- Swap 15 and 3 because gcd(15,3) = 3. nums = [<u><strong>3</strong></u>,5,9,<u><strong>15</strong></u>,10]
- Swap 10 and 15 because gcd(10,15) = 5. nums = [3,5,9,<u><strong>10</strong></u>,<u><strong>15</strong></u>]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>2 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find + Sieve of Eratosthenes`**

- Time complexity: <em>O(nlogn+nlogMax(nums)+Max(nums)log(logMax(nums)))</em>
- Space complexity: <em>O(n+Max(nums))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const gcdSort = function (nums) {
  const maxNum = Math.max(...nums);
  const sortedNums = [...nums].sort((a, b) => a - b);
  const uf = new UnionFind(maxNum + 1);
  const minPrimeSieve = Array.from({ length: maxNum + 1 }, (_, index) => index);

  minPrimeSieve[0] = 0;
  minPrimeSieve[1] = 0;

  const getPrimeFactors = num => {
    const result = [];

    while (num > 1) {
      const prime = minPrimeSieve[num];

      result.push(prime);

      while (num % prime === 0) {
        num /= prime;
      }
    }

    return result;
  };

  for (let num = 2; num * num <= maxNum; num++) {
    if (minPrimeSieve[num] !== num) continue;

    for (let factor = num * num; factor <= maxNum; factor += num) {
      minPrimeSieve[factor] = num;
    }
  }

  for (const num of nums) {
    const primeFactors = getPrimeFactors(num);

    for (const factor of primeFactors) {
      uf.union(num, factor);
    }
  }

  return nums.every((num, index) => uf.find(num) === uf.find(sortedNums[index]));
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.ranks = Array.from({ length: n }, () => 0);
  }

  find(node) {
    if (this.groups[node] === node) return node;
    const group = this.find(this.groups[node]);

    this.groups[node] = group;
    return group;
  }

  union(a, b) {
    const groupA = this.find(a);
    const groupB = this.find(b);

    if (groupA === groupB) return false;
    if (this.ranks[groupA] > this.ranks[groupB]) {
      this.groups[groupB] = groupA;
    } else if (this.ranks[groupA] < this.ranks[groupB]) {
      this.groups[groupA] = groupB;
    } else {
      this.groups[groupB] = groupA;
      this.ranks[groupA] += 1;
    }

    return true;
  }
}
```
