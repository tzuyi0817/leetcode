# [1707. Maximum XOR With an Element From Array](https://leetcode.com/problems/maximum-xor-with-an-element-from-array)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an array <code>nums</code> consisting of non-negative integers. You are also given a <code>queries</code> array, where <code>queries[i] = [x<sub>i</sub>, m<sub>i</sub>]</code>.</p>

<p>The answer to the <code>i<sup>th</sup></code> query is the maximum bitwise <code>XOR</code> value of <code>x<sub>i</sub></code> and any element of <code>nums</code> that does not exceed <code>m<sub>i</sub></code>. In other words, the answer is <code>max(nums[j] XOR x<sub>i</sub>)</code> for all <code>j</code> such that <code>nums[j] &lt;= m<sub>i</sub></code>. If all elements in <code>nums</code> are larger than <code>m<sub>i</sub></code>, then the answer is <code>-1</code>.</p>

<p>Return <em>an integer array </em><code>answer</code><em> where </em><code>answer.length == queries.length</code><em> and </em><code>answer[i]</code><em> is the answer to the </em><code>i<sup>th</sup></code><em> query.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
<strong>Output:</strong> [3,3,7]
<strong>Explanation:</strong>
1) 0 and 1 are the only two integers not greater than 1. 0 XOR 3 = 3 and 1 XOR 3 = 2. The larger of the two is 3.
2) 1 XOR 2 = 3.
3) 5 XOR 2 = 7.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
<strong>Output:</strong> [15,-1,5]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length, queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>queries[i].length == 2</code></li>
	<li><code>0 &lt;= nums[j], x<sub>i</sub>, m<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie + Bit Manipulation`**

- Time complexity: <em>O(mlogm+nlogn+(m+n)\*log(Max(nums[i])))</em>
- Space complexity: <em>O(m\*log(Max(nums[i]))+n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
const maximizeXor = function (nums, queries) {
  const m = nums.length;
  const n = queries.length;
  const indexedQueries = queries.map((query, index) => {
    const [xor, max] = query;

    return { xor, max, index };
  });

  nums.sort((a, b) => a - b);
  indexedQueries.sort((a, b) => a.max - b.max);

  const maxNum = Math.max(nums[m - 1], indexedQueries[n - 1].max);
  const trie = new BitTrie(maxNum);
  const result = Array.from({ length: n }, () => -1);
  let index = 0;

  for (const query of indexedQueries) {
    while (index < m && nums[index] <= query.max) {
      trie.insert(nums[index]);
      index += 1;
    }

    if (index) {
      result[query.index] = trie.getMaxXor(query.xor);
    }
  }

  return result;
};

class TrieNode {
  zero = null;
  one = null;
}

class BitTrie {
  root = new TrieNode();

  constructor(maxNum) {
    this.maxBit = Math.ceil(Math.log2(maxNum));
  }

  insert(num) {
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      if ((num >> index) & 1) {
        node.one = node.one ?? new TrieNode();
        node = node.one;
      } else {
        node.zero = node.zero ?? new TrieNode();
        node = node.zero;
      }
    }
  }

  getMaxXor(num) {
    let node = this.root;
    let xor = 0;

    for (let index = this.maxBit; index >= 0; index--) {
      if ((num >> index) & 1) {
        if (node.zero) {
          xor |= 1 << index;
          node = node.zero;
        } else {
          node = node.one;
        }
      } else {
        if (node.one) {
          xor |= 1 << index;
          node = node.one;
        } else {
          node = node.zero;
        }
      }
    }

    return xor;
  }
}
```
