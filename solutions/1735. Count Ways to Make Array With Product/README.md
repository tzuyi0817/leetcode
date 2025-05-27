# [1735. Count Ways to Make Array With Product](https://leetcode.com/problems/count-ways-to-make-array-with-product)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a 2D integer array, <code>queries</code>. For each <code>queries[i]</code>, where <code>queries[i] = [n<sub>i</sub>, k<sub>i</sub>]</code>, find the number of different ways you can place positive integers into an array of size <code>n<sub>i</sub></code> such that the product of the integers is <code>k<sub>i</sub></code>. As the number of ways may be too large, the answer to the <code>i<sup>th</sup></code> query is the number of ways <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>Return <em>an integer array </em><code>answer</code><em> where </em><code>answer.length == queries.length</code><em>, and </em><code>answer[i]</code><em> is the answer to the </em><code>i<sup>th</sup></code><em> query.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> queries = [[2,6],[5,1],[73,660]]
<strong>Output:</strong> [4,1,50734910]
<strong>Explanation:</strong>&nbsp;Each query is independent.
[2,6]: There are 4 ways to fill an array of size 2 that multiply to 6: [1,6], [2,3], [3,2], [6,1].
[5,1]: There is 1 way to fill an array of size 5 that multiply to 1: [1,1,1,1,1].
[73,660]: There are 1050734917 ways to fill an array of size 73 that multiply to 660. 1050734917 modulo 10<sup>9</sup> + 7 = 50734910.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> queries = [[1,1],[2,2],[3,3],[4,4],[5,5]]
<strong>Output:</strong> [1,2,3,10,5]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>4</sup> </code></li>
	<li><code>1 &lt;= n<sub>i</sub>, k<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming + Combinatorics`**

- Time complexity: <em>O((maxK)log(log(maxK))+(maxN)log(maxN)+queries.length\*logk)</em>
- Space complexity: <em>O(maxK+(maxN)log(maxN))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} queries
 * @return {number[]}
 */
const waysToFillArray = function (queries) {
  let maxN = 0;
  let maxK = 0;

  for (const [n, k] of queries) {
    maxN = Math.max(n, maxN);
    maxK = Math.max(k, maxK);
  }

  const MODULO = BigInt(10 ** 9 + 7);
  const minPrimeSieve = Array.from({ length: maxK + 1 }, (_, index) => index);
  const duplicateN = Math.ceil(Math.log2(maxN));
  const totalN = maxN + duplicateN;
  const nCk = Array.from({ length: totalN + 1 }, () => new Array(duplicateN + 1).fill(1n));

  minPrimeSieve[0] = 0;
  minPrimeSieve[1] = 0;

  for (let num = 2; num ** 2 <= maxK; num++) {
    if (minPrimeSieve[num] !== num) continue;

    for (let factor = num ** 2; factor <= maxK; factor += num) {
      minPrimeSieve[factor] = num;
    }
  }

  for (let a = 2; a <= totalN; a++) {
    for (let b = 1; b < Math.min(duplicateN + 1, a); b++) {
      nCk[a][b] = nCk[a - 1][b - 1] + nCk[a - 1][b];
    }
  }

  const getPrimeCountMap = num => {
    const result = new Map();

    while (num > 1) {
      const prime = minPrimeSieve[num];
      let count = 0;

      while (num % prime === 0) {
        num /= prime;
        count += 1;
      }

      result.set(prime, count);
    }

    return result;
  };

  return queries.map(([n, k]) => {
    const primeCountMap = getPrimeCountMap(k);
    let ways = 1n;

    for (const count of primeCountMap.values()) {
      ways = (ways * nCk[n + count - 1][count]) % MODULO;
    }

    return Number(ways);
  });
};
```
