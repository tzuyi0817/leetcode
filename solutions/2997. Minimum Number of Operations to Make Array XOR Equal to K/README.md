# [2997. Minimum Number of Operations to Make Array XOR Equal to K](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code> and a positive integer <code>k</code>.</p>

<p>You can apply the following operation on the array <strong>any</strong> number of times:</p>

<ul>
	<li>Choose <strong>any</strong> element of the array and <strong>flip</strong> a bit in its <strong>binary</strong> representation. Flipping a bit means changing a <code>0</code> to <code>1</code> or vice versa.</li>
</ul>

<p>Return <em>the <strong>minimum</strong> number of operations required to make the bitwise </em><code>XOR</code><em> of <strong>all</strong> elements of the final array equal to </em><code>k</code>.</p>

<p><strong>Note</strong> that you can flip leading zero bits in the binary representation of elements. For example, for the number <code>(101)<sub>2</sub></code> you can flip the fourth bit and obtain <code>(1101)<sub>2</sub></code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [2,1,3,4], k = 1
<strong>Output:</strong> 2
<strong>Explanation:</strong> We can do the following operations:
- Choose element 2 which is 3 == (011)<sub>2</sub>, we flip the first bit and we obtain (010)<sub>2</sub> == 2. nums becomes [2,1,2,4].
- Choose element 0 which is 2 == (010)<sub>2</sub>, we flip the third bit and we obtain (110)<sub>2</sub> = 6. nums becomes [6,1,2,4].
The XOR of elements of the final array is (6 XOR 1 XOR 2 XOR 4) == 1 == k.
It can be shown that we cannot make the XOR equal to k in less than 2 operations.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [2,0,2,0], k = 0
<strong>Output:</strong> 0
<strong>Explanation:</strong> The XOR of elements of the array is (2 XOR 0 XOR 2 XOR 0) == 0 == k. So no operation is needed.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
	<li><code>0 &lt;= k &lt;= 10<sup>6</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Bit Manipulation`**

- Time complexity: <em>O(n)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minOperations = function (nums, k) {
  const xor = nums.reduce((result, num) => result ^ num);
  let xorBinaryBits = xor.toString(2);
  let kBinaryBits = k.toString(2);
  const maxSize = Math.max(xorBinaryBits.length, kBinaryBits.length);
  let result = 0;

  xorBinaryBits = xorBinaryBits.padStart(maxSize, '0');
  kBinaryBits = kBinaryBits.padStart(maxSize, '0');

  for (let index = 0; index < maxSize; index++) {
    if (xorBinaryBits[index] !== kBinaryBits[index]) result += 1;
  }
  return result;
};
```
