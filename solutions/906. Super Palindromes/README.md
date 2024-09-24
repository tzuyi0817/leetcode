# [906. Super Palindromes](https://leetcode.com/problems/super-palindromes)

## Description

<div class="elfjS" data-track-load="description_content"><p>Let's say a positive integer is a <strong>super-palindrome</strong> if it is a palindrome, and it is also the square of a palindrome.</p>

<p>Given two positive integers <code>left</code> and <code>right</code> represented as strings, return <em>the number of <strong>super-palindromes</strong> integers in the inclusive range</em> <code>[left, right]</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> left = "4", right = "1000"
<strong>Output:</strong> 4
<strong>Explanation</strong>: 4, 9, 121, and 484 are superpalindromes.
Note that 676 is not a superpalindrome: 26 * 26 = 676, but 26 is not a palindrome.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> left = "1", right = "2"
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= left.length, right.length &lt;= 18</code></li>
	<li><code>left</code> and <code>right</code> consist of only digits.</li>
	<li><code>left</code> and <code>right</code> cannot have leading zeros.</li>
	<li><code>left</code> and <code>right</code> represent integers in the range <code>[1, 10<sup>18</sup> - 1]</code>.</li>
	<li><code>left</code> is less than or equal to <code>right</code>.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Enumeration`**

- Time complexity: <em>O(10<sup>right.length/2</sup> \* right.length)</em>
- Space complexity: <em>O(right.length/2)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} left
 * @param {string} right
 * @return {number}
 */
const superpalindromesInRange = function (left, right) {
  const MAX_LENGTH = Math.ceil(right.length / 2);
  let result = 0;

  const isPalindrome = num => {
    let left = 0;
    let right = num.length - 1;

    while (left < right) {
      if (num[left] !== num[right]) return false;
      left += 1;
      right -= 1;
    }
    return true;
  };

  const createPalindrome = current => {
    if (current.length > MAX_LENGTH) return;
    if (current && current[0] !== '0') {
      const num = BigInt(current) ** 2n;

      if (num > BigInt(right)) return;
      if (num >= BigInt(left) && isPalindrome(`${num}`)) result += 1;
    }

    for (let num = 0; num <= 9; num++) {
      createPalindrome(`${num}${current}${num}`);
    }
  };

  createPalindrome('');

  for (let num = 0; num <= 9; num++) {
    createPalindrome(`${num}`);
  }
  return result;
};
```
