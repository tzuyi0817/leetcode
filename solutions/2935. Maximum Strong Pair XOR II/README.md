# [2935. Maximum Strong Pair XOR II](https://leetcode.com/problems/maximum-strong-pair-xor-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given a <strong>0-indexed</strong> integer array <code>nums</code>. A pair of integers <code>x</code> and <code>y</code> is called a <strong>strong</strong> pair if it satisfies the condition:</p>

<ul>
	<li><code>|x - y| &lt;= min(x, y)</code></li>
</ul>

<p>You need to select two integers from <code>nums</code> such that they form a strong pair and their bitwise <code>XOR</code> is the <strong>maximum</strong> among all strong pairs in the array.</p>

<p>Return <em>the <strong>maximum</strong> </em><code>XOR</code><em> value out of all possible strong pairs in the array</em> <code>nums</code>.</p>

<p><strong>Note</strong> that you can pick the same integer twice to form a pair.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums = [1,2,3,4,5]
<strong>Output:</strong> 7
<strong>Explanation:</strong> There are 11 strong pairs in the array <code>nums</code>: (1, 1), (1, 2), (2, 2), (2, 3), (2, 4), (3, 3), (3, 4), (3, 5), (4, 4), (4, 5) and (5, 5).
The maximum XOR possible from these pairs is 3 XOR 4 = 7.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums = [10,100]
<strong>Output:</strong> 0
<strong>Explanation:</strong> There are 2 strong pairs in the array nums: (10, 10) and (100, 100).
The maximum XOR possible from these pairs is 10 XOR 10 = 0 since the pair (100, 100) also gives 100 XOR 100 = 0.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> nums = [500,520,2500,3000]
<strong>Output:</strong> 1020
<strong>Explanation:</strong> There are 6 strong pairs in the array nums: (500, 500), (500, 520), (520, 520), (2500, 2500), (2500, 3000) and (3000, 3000).
The maximum XOR possible from these pairs is 500 XOR 520 = 1020 since the only other non-zero XOR value is 2500 XOR 3000 = 636.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 2<sup>20</sup> - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Trie + Sliding Window`**

- Time complexity: <em>O(nlog(Max(nums)))</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const maximumStrongPairXor = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const maxBit = 32 - Math.clz32(maxNum);
  const trie = new Trie(maxBit);
  let left = 0;
  let result = 0;

  nums.sort((a, b) => a - b);

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    while (left < index && nums[left] < num - nums[left]) {
      trie.remove(nums[left]);
      left += 1;
    }

    trie.insert(num);

    const xor = trie.getMaxXor(num);

    result = Math.max(xor, result);
  }

  return result;
};

class TrieNode {
  children = [null, null];
  count = 0;
}

class Trie {
  constructor(bit) {
    this.maxBit = bit;
    this.root = new TrieNode();
  }

  insert(num) {
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      const bit = (num >> index) & 1;

      if (!node.children[bit]) {
        node.children[bit] = new TrieNode();
      }

      node = node.children[bit];
      node.count += 1;
    }
  }

  remove(num) {
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      const bit = (num >> index) & 1;

      node = node.children[bit];
      node.count -= 1;
    }
  }

  getMaxXor(num) {
    let maxXor = 0;
    let node = this.root;

    for (let index = this.maxBit; index >= 0; index--) {
      const bit = (num >> index) & 1;
      const toggleBit = bit ^ 1;
      const { children } = node;

      if (!children[toggleBit] && !children[bit]) return 0;

      if (children[toggleBit] && children[toggleBit].count) {
        maxXor |= 1 << index;
        node = children[toggleBit];
      } else {
        node = children[bit];
      }
    }

    return maxXor;
  }
}
```
