# [1803. Count Pairs With XOR in a Range](https://leetcode.com/problems/count-pairs-with-xor-in-a-range)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given a <strong>(0-indexed)</strong> integer array <code>nums</code> and two integers <code>low</code> and <code>high</code>, return <em>the number of <strong>nice pairs</strong></em>.</p>

<p>A <strong>nice pair</strong> is a pair <code>(i, j)</code> where <code>0 &lt;= i &lt; j &lt; nums.length</code> and <code>low &lt;= (nums[i] XOR nums[j]) &lt;= high</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,4,2,7], low = 2, high = 6
<strong>Output:</strong> 6
<strong>Explanation:</strong> All nice pairs (i, j) are as follows:
    - (0, 1): nums[0] XOR nums[1] = 5 
    - (0, 2): nums[0] XOR nums[2] = 3
    - (0, 3): nums[0] XOR nums[3] = 6
    - (1, 2): nums[1] XOR nums[2] = 6
    - (1, 3): nums[1] XOR nums[3] = 3
    - (2, 3): nums[2] XOR nums[3] = 5
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [9,8,4,2,1], low = 5, high = 14
<strong>Output:</strong> 8
<strong>Explanation:</strong> All nice pairs (i, j) are as follows:
​​​​​    - (0, 2): nums[0] XOR nums[2] = 13
&nbsp;   - (0, 3): nums[0] XOR nums[3] = 11
&nbsp;   - (0, 4): nums[0] XOR nums[4] = 8
&nbsp;   - (1, 2): nums[1] XOR nums[2] = 12
&nbsp;   - (1, 3): nums[1] XOR nums[3] = 10
&nbsp;   - (1, 4): nums[1] XOR nums[4] = 9
&nbsp;   - (2, 3): nums[2] XOR nums[3] = 6
&nbsp;   - (2, 4): nums[2] XOR nums[4] = 5</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= low &lt;= high &lt;= 2 * 10<sup>4</sup></code></li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie`**

- Time complexity: <em>O(nlog(Max(nums, high)))</em>
- Space complexity: <em>O(nlog(Max(nums, high)))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
const countPairs = function (nums, low, high) {
  const trie = new TrieNode();
  const maxNum = Math.max(...nums, high);
  const log = Math.ceil(Math.log2(maxNum));
  let result = 0;

  const insertNum = num => {
    let current = trie;

    for (let index = log; index >= 0; index--) {
      const bit = (num >> index) & 1;

      if (!current.children[bit]) {
        current.children[bit] = new TrieNode();
      }

      current = current.children[bit];
      current.count += 1;
    }
  };

  const getCount = (num, limit) => {
    let count = 0;
    let current = trie;

    for (let index = log; index >= 0; index--) {
      const bit = (num >> index) & 1;
      const limitBit = (limit >> index) & 1;

      if (limitBit) {
        if (current.children[bit]) {
          count += current.children[bit].count;
        }

        current = current.children[bit ^ 1];
      } else {
        current = current.children[bit];
      }

      if (!current) return count;
    }

    return count;
  };

  for (const num of nums) {
    result += getCount(num, high + 1) - getCount(num, low);
    insertNum(num);
  }

  return result;
};

class TrieNode {
  children = [null, null];
  count = 0;
}
```
