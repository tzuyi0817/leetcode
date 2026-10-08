# [3267. Count Almost Equal Pairs II](https://leetcode.com/problems/count-almost-equal-pairs-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p><strong>Attention</strong>: In this version, the number of operations that can be performed, has been increased to <strong>twice</strong>.</p>

<p>You are given an array <code>nums</code> consisting of positive integers.</p>

<p>We call two integers <code>x</code> and <code>y</code> <strong>almost equal</strong> if both integers can become equal after performing the following operation <strong>at most <u>twice</u></strong>:</p>

<ul>
	<li>Choose <strong>either</strong> <code>x</code> or <code>y</code> and swap any two digits within the chosen number.</li>
</ul>

<p>Return the number of indices <code>i</code> and <code>j</code> in <code>nums</code> where <code>i &lt; j</code> such that <code>nums[i]</code> and <code>nums[j]</code> are <strong>almost equal</strong>.</p>

<p><strong>Note</strong> that it is allowed for an integer to have leading zeros after performing an operation.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1023,2310,2130,213]</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The almost equal pairs of elements are:</p>

<ul>
	<li>1023 and 2310. By swapping the digits 1 and 2, and then the digits 0 and 3 in 1023, you get 2310.</li>
	<li>1023 and 213. By swapping the digits 1 and 0, and then the digits 1 and 2 in 1023, you get 0213, which is 213.</li>
	<li>2310 and 213. By swapping the digits 2 and 0, and then the digits 3 and 2 in 2310, you get 0213, which is 213.</li>
	<li>2310 and 2130. By swapping the digits 3 and 1 in 2310, you get 2130.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,10,100]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>The almost equal pairs of elements are:</p>

<ul>
	<li>1 and 10. By swapping the digits 1 and 0 in 10, you get 01 which is 1.</li>
	<li>1 and 100. By swapping the second 0 with the digit 1 in 100, you get 001, which is 1.</li>
	<li>10 and 100. By swapping the first 0 with the digit 1 in 100, you get 010, which is 10.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 5000</code></li>
	<li><code>1 &lt;= nums[i] &lt; 10<sup>7</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Hash Table`**

- Time complexity: <em>O(n\*log(Max(nums))<sup>4</sup>)</em>
- Space complexity: <em>O(n+log(Max(nums))<sup>4</sup>)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const countPairs = function (nums) {
  const maxNum = Math.max(...nums);
  const maxLen = String(maxNum).length;
  const countMap = new Map();
  let result = 0;

  for (const num of nums) {
    const digits = String(num).padStart(maxLen, '0');
    const swaps = getSwaps(digits);

    for (const swap of swaps) {
      result += countMap.get(swap) ?? 0;
    }

    const count = countMap.get(digits) ?? 0;

    countMap.set(digits, count + 1);
  }

  return result;
};

function getSwaps(digits) {
  const n = digits.length;
  const oneSwaps = new Set();

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < a; b++) {
      const nextDigits = swapDigits(digits, a, b);

      oneSwaps.add(nextDigits);
    }
  }

  const result = new Set([digits, ...oneSwaps]);

  for (const swap of oneSwaps) {
    for (let a = 0; a < n; a++) {
      for (let b = 0; b < a; b++) {
        const nextDigits = swapDigits(swap, a, b);

        result.add(nextDigits);
      }
    }
  }

  return result;
}

function swapDigits(digits, a, b) {
  const nextDigits = digits.split('');

  [nextDigits[a], nextDigits[b]] = [nextDigits[b], nextDigits[a]];

  return nextDigits.join('');
}
```
