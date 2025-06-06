# [1649. Create Sorted Array through Instructions](https://leetcode.com/problems/create-sorted-array-through-instructions)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an integer array <code>instructions</code>, you are asked to create a sorted array from the elements in <code>instructions</code>. You start with an empty container <code>nums</code>. For each element from <strong>left to right</strong> in <code>instructions</code>, insert it into <code>nums</code>. The <strong>cost</strong> of each insertion is the <b>minimum</b> of the following:</p>

<ul>
	<li>The number of elements currently in <code>nums</code> that are <strong>strictly less than</strong> <code>instructions[i]</code>.</li>
	<li>The number of elements currently in <code>nums</code> that are <strong>strictly greater than</strong> <code>instructions[i]</code>.</li>
</ul>

<p>For example, if inserting element <code>3</code> into <code>nums = [1,2,3,5]</code>, the <strong>cost</strong> of insertion is <code>min(2, 1)</code> (elements <code>1</code> and <code>2</code> are less than <code>3</code>, element <code>5</code> is greater than <code>3</code>) and <code>nums</code> will become <code>[1,2,3,3,5]</code>.</p>

<p>Return <em>the <strong>total cost</strong> to insert all elements from </em><code>instructions</code><em> into </em><code>nums</code>. Since the answer may be large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> instructions = [1,5,6,2]
<strong>Output:</strong> 1
<strong>Explanation:</strong> Begin with nums = [].
Insert 1 with cost min(0, 0) = 0, now nums = [1].
Insert 5 with cost min(1, 0) = 0, now nums = [1,5].
Insert 6 with cost min(2, 0) = 0, now nums = [1,5,6].
Insert 2 with cost min(1, 2) = 1, now nums = [1,2,5,6].
The total cost is 0 + 0 + 0 + 1 = 1.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> instructions = [1,2,3,6,5,4]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Begin with nums = [].
Insert 1 with cost min(0, 0) = 0, now nums = [1].
Insert 2 with cost min(1, 0) = 0, now nums = [1,2].
Insert 3 with cost min(2, 0) = 0, now nums = [1,2,3].
Insert 6 with cost min(3, 0) = 0, now nums = [1,2,3,6].
Insert 5 with cost min(3, 1) = 1, now nums = [1,2,3,5,6].
Insert 4 with cost min(3, 2) = 2, now nums = [1,2,3,4,5,6].
The total cost is 0 + 0 + 0 + 0 + 1 + 2 = 3.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre><strong>Input:</strong> instructions = [1,3,3,3,2,4,2,1,2]
<strong>Output:</strong> 4
<strong>Explanation:</strong> Begin with nums = [].
Insert 1 with cost min(0, 0) = 0, now nums = [1].
Insert 3 with cost min(1, 0) = 0, now nums = [1,3].
Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3].
Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3,3].
Insert 2 with cost min(1, 3) = 1, now nums = [1,2,3,3,3].
Insert 4 with cost min(5, 0) = 0, now nums = [1,2,3,3,3,4].
​​​​​​​Insert 2 with cost min(1, 4) = 1, now nums = [1,2,2,3,3,3,4].
​​​​​​​Insert 1 with cost min(0, 6) = 0, now nums = [1,1,2,2,3,3,3,4].
​​​​​​​Insert 2 with cost min(2, 4) = 2, now nums = [1,1,2,2,2,3,3,3,4].
The total cost is 0 + 0 + 0 + 0 + 1 + 0 + 1 + 0 + 2 = 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= instructions.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= instructions[i] &lt;= 10<sup>5</sup></code></li>
</ul></div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Indexed Tree`**

- Time complexity: <em>O(nlog\*Max(instructions[i]))</em>
- Space complexity: <em>O(Max(instructions[i]))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} instructions
 * @return {number}
 */
const createSortedArray = function (instructions) {
  const n = instructions.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const minNum = Math.min(...instructions);
  const maxNum = Math.max(...instructions);
  const tree = new BinaryIndexedTree(maxNum - minNum + 1);
  let result = 0n;

  for (let index = 0; index < n; index++) {
    const num = instructions[index] - minNum + 1;
    const lessCount = tree.get(num - 1);
    const greaterCount = index - tree.get(num);
    const cost = BigInt(Math.min(lessCount, greaterCount));

    result = (result + cost) % MODULO;
    tree.add(num, 1);
  }

  return Number(result);
};

class BinaryIndexedTree {
  constructor(n) {
    this.tree = Array.from({ length: n + 1 }, () => 0);
  }

  add(index, delta) {
    const n = this.tree.length;

    while (index < n) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  get(index) {
    let sum = 0;

    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }

    return sum;
  }
}
```
