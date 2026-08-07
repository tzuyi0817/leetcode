# [3145. Find Products of Elements of Big Array](https://leetcode.com/problems/find-products-of-elements-of-big-array)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>The <strong>powerful array</strong> of a non-negative integer <code>x</code> is defined as the shortest sorted array of powers of two that sum up to <code>x</code>. The table below illustrates examples of how the <strong>powerful array</strong> is determined. It can be proven that the powerful array of <code>x</code> is unique.</p>

<table border="1"><tbody><tr><th>num</th><th>Binary Representation</th><th>powerful array</th></tr><tr><td>1</td><td>0000<u>1</u></td><td>[1]</td></tr><tr><td>8</td><td>0<u>1</u>000</td><td>[8]</td></tr><tr><td>10</td><td>0<u>1</u>0<u>1</u>0</td><td>[2, 8]</td></tr><tr><td>13</td><td>0<u>11</u>0<u>1</u></td><td>[1, 4, 8]</td></tr><tr><td>23</td><td><u>1</u>0<u>111</u></td><td>[1, 2, 4, 16]</td></tr></tbody></table>

<p>The array <code>big_nums</code> is created by concatenating the <strong>powerful arrays</strong> for every positive integer <code>i</code> in ascending order: 1, 2, 3, and so on. Thus, <code>big_nums</code> begins as <code>[<u>1</u>, <u>2</u>, <u>1, 2</u>, <u>4</u>, <u>1, 4</u>, <u>2, 4</u>, <u>1, 2, 4</u>, <u>8</u>, ...]</code>.</p>

<p>You are given a 2D integer matrix <code>queries</code>, where for <code>queries[i] = [from<sub>i</sub>, to<sub>i</sub>, mod<sub>i</sub>]</code> you should calculate <code>(big_nums[from<sub>i</sub>] * big_nums[from<sub>i</sub> + 1] * ... * big_nums[to<sub>i</sub>]) % mod<sub>i</sub></code>.</p>

<p>Return an integer array <code>answer</code> such that <code>answer[i]</code> is the answer to the <code>i<sup>th</sup></code> query.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">queries = [[1,3,7]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[4]</span></p>

<p><strong>Explanation:</strong></p>

<p>There is one query.</p>

<p><code>big_nums[1..3] = [2,1,2]</code>. The product of them is 4. The result is <code>4 % 7 = 4.</code></p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">queries = [[2,5,3],[7,7,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[2,2]</span></p>

<p><strong>Explanation:</strong></p>

<p>There are two queries.</p>

<p>First query: <code>big_nums[2..5] = [1,2,4,1]</code>. The product of them is 8. The result is <code>8 % 3 = 2</code>.</p>

<p>Second query: <code>big_nums[7] = 2</code>. The result is <code>2 % 4 = 2</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= queries.length &lt;= 500</code></li>
	<li><code>queries[i].length == 3</code></li>
	<li><code>0 &lt;= queries[i][0] &lt;= queries[i][1] &lt;= 10<sup>15</sup></code></li>
	<li><code>1 &lt;= queries[i][2] &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Search + Bit Manipulation`**

- Time complexity: <em>O(nlog<sup>2</sup>Max(to))</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} queries
 * @return {number[]}
 */
const findProductsOfElements = function (queries) {
  return queries.map(([from, to, mod]) => {
    const bigForm = BigInt(from);
    const bigTo = BigInt(to);
    const bigMod = BigInt(mod);
    const powers = getSumPowersK(bigTo + 1n) - getSumPowersK(bigForm);

    return Number(modPow(2n, powers, bigMod));
  });
};

function getSumPowers(num) {
  const len = BigInt(num.toString(2).length);
  let sum = 0n;
  let powerTwo = 1n;

  for (let bit = 0n; bit < len; bit++) {
    const base = powerTwo * 2n;
    const others = (num % base) + 1n - powerTwo;

    sum += (num / base) * powerTwo * bit;

    if (others > 0n) {
      sum += others * bit;
    }

    powerTwo *= 2n;
  }

  return sum;
}

function getSumBits(num) {
  let bits = 0n;

  for (let powerTwo = 1n; powerTwo <= num; powerTwo *= 2n) {
    const base = powerTwo * 2n;
    const others = (num % base) + 1n - powerTwo;

    bits += (num / base) * powerTwo;

    if (others > 0n) {
      bits += others;
    }
  }

  return bits;
}

function findFirstGreaterEqualSumBits(k) {
  let left = 1n;
  let right = k;

  while (left <= right) {
    const mid = (left + right) / 2n;

    getSumBits(mid) >= k ? (right = mid - 1n) : (left = mid + 1n);
  }

  return left;
}

function getSumPowersK(k) {
  const num = findFirstGreaterEqualSumBits(k);
  const len = BigInt(num.toString(2).length);
  let sumPowers = getSumPowers(num - 1n);
  let remainBitCount = k - getSumBits(num - 1n);

  for (let bit = 0n; bit < len; bit++) {
    if ((num >> bit) & 1n) {
      sumPowers += bit;
      remainBitCount -= 1n;
    }

    if (!remainBitCount) return sumPowers;
  }

  return sumPowers;
}

function modPow(base, exp, mod) {
  if (mod === 1n) return 0n;

  let result = 1n;

  while (exp) {
    if (exp % 2n) {
      result = (result * base) % mod;
    }

    base = (base * base) % mod;
    exp /= 2n;
  }

  return result;
}
```
