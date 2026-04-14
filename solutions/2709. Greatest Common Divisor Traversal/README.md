# [2709. Greatest Common Divisor Traversal](https://leetcode.com/problems/greatest-common-divisor-traversal)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code>, and you are allowed to <strong>traverse</strong> between its indices. You can traverse between index <code>i</code> and index <code>j</code>, <code>i != j</code>, if and only if <code>gcd(nums[i], nums[j]) &gt; 1</code>, where <code>gcd</code> is the <strong>greatest common divisor</strong>.</p>

<p>Your task is to determine if for <strong>every pair</strong> of indices <code>i</code> and <code>j</code> in nums, where <code>i &lt; j</code>, there exists a <strong>sequence of traversals</strong> that can take us from <code>i</code> to <code>j</code>.</p>

<p>Return <code>true</code><em> if it is possible to traverse between all such pairs of indices,</em><em> or </em><code>false</code><em> otherwise.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,3,6]
<strong>Output:</strong> true
<strong>Explanation:</strong> In this example, there are 3 possible pairs of indices: (0, 1), (0, 2), and (1, 2).
To go from index 0 to index 1, we can use the sequence of traversals 0 -&gt; 2 -&gt; 1, where we move from index 0 to index 2 because gcd(nums[0], nums[2]) = gcd(2, 6) = 2 &gt; 1, and then move from index 2 to index 1 because gcd(nums[2], nums[1]) = gcd(6, 3) = 3 &gt; 1.
To go from index 0 to index 2, we can just go directly because gcd(nums[0], nums[2]) = gcd(2, 6) = 2 &gt; 1. Likewise, to go from index 1 to index 2, we can just go directly because gcd(nums[1], nums[2]) = gcd(3, 6) = 3 &gt; 1.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [3,9,5]
<strong>Output:</strong> false
<strong>Explanation:</strong> No sequence of traversals can take us from index 0 to index 2 in this example. So, we return false.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [4,3,12,8]
<strong>Output:</strong> true
<strong>Explanation:</strong> There are 6 possible pairs of indices to traverse between: (0, 1), (0, 2), (0, 3), (1, 2), (1, 3), and (2, 3). A valid sequence of traversals exists for each pair, so we return true.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Union Find + sieveEratosthenes`**

- Time complexity: <em>O(Max(nums)log\*Max(nums)+nlog\*Max(nums))</em>
- Space complexity: <em>O(Max(nums)+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canTraverseAllPairs = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);

  const sieveEratosthenes = n => {
    const primeFactors = Array.from({ length: n + 1 }, (_, index) => index);

    for (let num = 2; num <= n; num++) {
      if (primeFactors[num] !== num) continue;

      for (let factor = num * num; factor <= n; factor += num) {
        if (primeFactors[factor] === factor) {
          primeFactors[factor] = num;
        }
      }
    }

    return primeFactors;
  };

  const primeFactors = sieveEratosthenes(maxNum);
  const factorMap = new Map();
  const uf = new UnionFind(n);

  const getPrimeFactors = num => {
    const factors = [];

    while (num > 1) {
      const divisor = primeFactors[num];

      factors.push(divisor);

      while (num % divisor === 0) {
        num = Math.floor(num / divisor);
      }
    }

    return factors;
  };

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const factors = getPrimeFactors(num);

    for (const factor of factors) {
      if (factorMap.has(factor)) {
        uf.union(factorMap.get(factor), index);
      } else {
        factorMap.set(factor, index);
      }
    }
  }

  return uf.maxSize === n;
};

class UnionFind {
  constructor(n) {
    this.groups = Array.from({ length: n }, (_, index) => index);
    this.sizes = Array.from({ length: n }, () => 1);
    this.maxSize = 1;
  }

  find(x) {
    if (this.groups[x] === x) return x;

    this.groups[x] = this.find(this.groups[x]);

    return this.groups[x];
  }

  union(x, y) {
    const groupX = this.find(x);
    const groupY = this.find(y);

    if (groupX === groupY) return false;

    if (this.sizes[groupX] >= this.sizes[groupY]) {
      this.groups[groupY] = groupX;
      this.sizes[groupX] += this.sizes[groupY];
      this.maxSize = Math.max(this.sizes[groupX], this.maxSize);
    } else {
      this.groups[groupX] = groupY;
      this.sizes[groupY] += this.sizes[groupX];
      this.maxSize = Math.max(this.sizes[groupY], this.maxSize);
    }

    return true;
  }
}
```
