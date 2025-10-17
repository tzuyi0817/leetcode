# [3003. Maximize the Number of Partitions After Operations](https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given a string <code>s</code> and an integer <code>k</code>.</p>

<p>First, you are allowed to change <strong>at most</strong> <strong>one</strong> index in <code>s</code> to another lowercase English letter.</p>

<p>After that, do the following partitioning operation until <code>s</code> is <strong>empty</strong>:</p>

<ul>
	<li>Choose the <strong>longest</strong> <strong>prefix</strong> of <code>s</code> containing at most <code>k</code> <strong>distinct</strong> characters.</li>
	<li><strong>Delete</strong> the prefix from <code>s</code> and increase the number of partitions by one. The remaining characters (if any) in <code>s</code> maintain their initial order.</li>
</ul>

<p>Return an integer denoting the <strong>maximum</strong> number of resulting partitions after the operations by optimally choosing at most one index to change.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "accca", k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<p>The optimal way is to change <code>s[2]</code> to something other than a and c, for example, b. then it becomes <code>"acbca"</code>.</p>

<p>Then we perform the operations:</p>

<ol>
	<li>The longest prefix containing at most 2 distinct characters is <code>"ac"</code>, we remove it and <code>s</code> becomes <code>"bca"</code>.</li>
	<li>Now The longest prefix containing at most 2 distinct characters is <code>"bc"</code>, so we remove it and <code>s</code> becomes <code>"a"</code>.</li>
	<li>Finally, we remove <code>"a"</code> and <code>s</code> becomes empty, so the procedure ends.</li>
</ol>

<p>Doing the operations, the string is divided into 3 partitions, so the answer is 3.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "aabaab", k = 3</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>Initially&nbsp;<code>s</code>&nbsp;contains 2 distinct characters, so whichever character we change, it will contain at most 3 distinct characters, so the longest prefix with at most 3 distinct characters would always be all of it, therefore the answer is 1.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">s = "xxyz", k = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<p>The optimal way is to change&nbsp;<code>s[0]</code>&nbsp;or&nbsp;<code>s[1]</code>&nbsp;to something other than characters in&nbsp;<code>s</code>, for example, to change&nbsp;<code>s[0]</code>&nbsp;to&nbsp;<code>w</code>.</p>

<p>Then&nbsp;<code>s</code>&nbsp;becomes <code>"wxyz"</code>, which consists of 4 distinct characters, so as <code>k</code> is 1, it will divide into 4 partitions.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>s</code> consists only of lowercase English letters.</li>
	<li><code>1 &lt;= k &lt;= 26</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Dynamic Programming`**

- Time complexity: <em>O(26n -> n)</em>
- Space complexity: <em>O(26n -> n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxPartitionsAfterOperations = function (s, k) {
  const BASE_CODE = 'a'.charCodeAt(0);
  const n = s.length;
  const memo = new Map();

  function getPartitions(index, isChange, mask, bit) {
    const nextMask = mask | bit;

    if (popcount(nextMask) > k) {
      return 1 + getMaxPartitions(index + 1, isChange, bit);
    }

    return getMaxPartitions(index + 1, isChange, nextMask);
  }

  function getMaxPartitions(index, isChange, mask) {
    if (index >= n) return 0;

    const key = `${index},${((isChange ? 1 : 0) << 26) | mask}`;

    if (memo.has(key)) return memo.get(key);

    const bit = 1 << (s[index].charCodeAt(0) - BASE_CODE);
    let result = getPartitions(index, isChange, mask, bit);

    if (!isChange) {
      for (let code = 0; code < 26; code++) {
        const partitions = getPartitions(index, true, mask, 1 << code);

        result = Math.max(partitions, result);
      }
    }

    memo.set(key, result);

    return result;
  }

  return getMaxPartitions(0, false, 0) + 1;
};

function popcount(x) {
  let count = 0;

  while (x) {
    x &= x - 1;
    count += 1;
  }

  return count;
}
```
