# [1356. Sort Integers by The Number of 1 Bits](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>arr</code>. Sort the integers in the array&nbsp;in ascending order by the number of <code>1</code>'s&nbsp;in their binary representation and in case of two or more integers have the same number of <code>1</code>'s you have to sort them in ascending order.</p>

<p>Return <em>the array after sorting it</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> arr = [0,1,2,3,4,5,6,7,8]
<strong>Output:</strong> [0,1,2,4,8,3,5,6,7]
<strong>Explantion:</strong> [0] is the only integer with 0 bits.
[1,2,4,8] all have 1 bit.
[3,5,6] have 2 bits.
[7] has 3 bits.
The sorted array by bits is [0,1,2,4,8,3,5,6,7]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> arr = [1024,512,256,128,64,32,16,8,4,2,1]
<strong>Output:</strong> [1,2,4,8,16,32,64,128,256,512,1024]
<strong>Explantion:</strong> All integers have 1 bit in the binary representation, you should just sort them in ascending order.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 500</code></li>
	<li><code>0 &lt;= arr[i] &lt;= 10<sup>4</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Bit Manipulation`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(1)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortByBits = function (arr) {
  const popcount = x => {
    let count = 0;

    while (x) {
      x &= x - 1;
      count += 1;
    }

    return count;
  };

  return arr.toSorted((a, b) => {
    return popcount(a) - popcount(b) || a - b;
  });
};
```
