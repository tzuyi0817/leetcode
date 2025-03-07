# [1505. Minimum Possible Integer After at Most K Adjacent Swaps On Digits](https://leetcode.com/problems/minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>num</code> representing <strong>the digits</strong> of a very large integer and an integer <code>k</code>. You are allowed to swap any two adjacent digits of the integer <strong>at most</strong> <code>k</code> times.</p>

<p>Return <em>the minimum integer you can obtain also as a string</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/06/17/q4_1.jpg" style="width: 500px; height: 40px;">
<pre><strong>Input:</strong> num = "4321", k = 4
<strong>Output:</strong> "1342"
<strong>Explanation:</strong> The steps to obtain the minimum integer from 4321 with 4 adjacent swaps are shown.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> num = "100", k = 1
<strong>Output:</strong> "010"
<strong>Explanation:</strong> It's ok for the output to have leading zeros, but the input is guaranteed not to have any leading zeros.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> num = "36789", k = 1000
<strong>Output:</strong> "36789"
<strong>Explanation:</strong> We can keep the number without any swaps.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= num.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>num</code> consists of only <strong>digits</strong> and does not contain <strong>leading zeros</strong>.</li>
	<li><code>1 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Greedy + Binary Indexed Tree`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
const minInteger = function (num, k) {
  const n = num.length;
  const tree = new BinaryIndexedTree(n);
  const used = new Array(n + 1).fill(false);
  const numIndices = Array.from({ length: 10 }, () => []);
  let result = '';

  for (let index = 0; index < n; index++) {
    numIndices[Number(num[index])].push(index);
  }

  while (result.length < n && k) {
    for (let digit = 0; digit < 10; digit++) {
      if (!numIndices[digit].length) continue;
      const index = numIndices[digit][0];
      const cost = index - tree.get(index);

      if (cost > k) continue;

      k -= cost;
      result += digit;
      tree.add(index + 1, 1);
      used[index] = true;
      numIndices[digit].shift();
      break;
    }
  }

  for (let index = 0; index < n; index++) {
    if (used[index]) continue;

    result += num[index];
  }

  return result;
};

class BinaryIndexedTree {
  constructor(n) {
    this.sums = new Array(n + 1).fill(0);
  }

  add(index, delta) {
    while (index < this.sums.length) {
      this.sums[index] += delta;
      index += index & -index;
    }
  }

  get(index) {
    let sum = 0;

    while (index > 0) {
      sum += this.sums[index];
      index -= index & -index;
    }

    return sum;
  }
}
```
