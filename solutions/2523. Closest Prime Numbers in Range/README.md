# [2523. Closest Prime Numbers in Range](https://leetcode.com/problems/closest-prime-numbers-in-range)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given two positive integers <code>left</code> and <code>right</code>, find the two integers <code>num1</code> and <code>num2</code> such that:</p>

<ul>
	<li><code>left &lt;= num1 &lt; num2 &lt;= right </code>.</li>
	<li>Both <code>num1</code> and <code>num2</code> are <span data-keyword="prime-number" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rg:" data-state="closed" class="">prime numbers</button></span>.</li>
	<li><code>num2 - num1</code> is the <strong>minimum</strong> amongst all other pairs satisfying the above conditions.</li>
</ul>

<p>Return the positive integer array <code>ans = [num1, num2]</code>. If there are multiple pairs satisfying these conditions, return the one with the <strong>smallest</strong> <code>num1</code> value. If no such numbers exist, return <code>[-1, -1]</code><em>.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> left = 10, right = 19
<strong>Output:</strong> [11,13]
<strong>Explanation:</strong> The prime numbers between 10 and 19 are 11, 13, 17, and 19.
The closest gap between any pair is 2, which can be achieved by [11,13] or [17,19].
Since 11 is smaller than 17, we return the first pair.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> left = 4, right = 6
<strong>Output:</strong> [-1,-1]
<strong>Explanation:</strong> There exists only one prime number in the given range, so the conditions cannot be satisfied.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= left &lt;= right &lt;= 10<sup>6</sup></code></li>
</ul>

<p>&nbsp;</p>
<style type="text/css">.spoilerbutton {display:block; border:dashed; padding: 0px 0px; margin:10px 0px; font-size:150%; font-weight: bold; color:#000000; background-color:cyan; outline:0; 
}
.spoiler {overflow:hidden;}
.spoiler > div {-webkit-transition: all 0s ease;-moz-transition: margin 0s ease;-o-transition: all 0s ease;transition: margin 0s ease;}
.spoilerbutton[value="Show Message"] + .spoiler > div {margin-top:-500%;}
.spoilerbutton[value="Hide Message"] + .spoiler {padding:5px;}
</style>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Sieve of Eratosthenes`**

- Time complexity: <em>O(nlog(logn))</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
const closestPrimes = function (left, right) {
  const sieve = new Array(right + 1).fill(true);

  sieve[0] = false;
  sieve[1] = false;

  for (let num = 2; num ** 2 <= right; num++) {
    if (!sieve[num]) continue;

    for (let multNum = num ** 2; multNum <= right; multNum += num) {
      sieve[multNum] = false;
    }
  }

  let result = [-1, -1];
  let prevPrime = -1;
  let minInterval = Number.MAX_SAFE_INTEGER;

  for (let num = left; num <= right; num++) {
    if (!sieve[num]) continue;

    if (prevPrime !== -1 && num - prevPrime < minInterval) {
      minInterval = num - prevPrime;
      result = [prevPrime, num];
    }

    prevPrime = num;
  }

  return result;
};
```
