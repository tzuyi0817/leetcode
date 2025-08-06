# [3479. Fruits Into Baskets III](https://leetcode.com/problems/fruits-into-baskets-iii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two arrays of integers, <code>fruits</code> and <code>baskets</code>, each of length <code>n</code>, where <code>fruits[i]</code> represents the <strong>quantity</strong> of the <code>i<sup>th</sup></code> type of fruit, and <code>baskets[j]</code> represents the <strong>capacity</strong> of the <code>j<sup>th</sup></code> basket.</p>

<p>From left to right, place the fruits according to these rules:</p>

<ul>
	<li>Each fruit type must be placed in the <strong>leftmost available basket</strong> with a capacity <strong>greater than or equal</strong> to the quantity of that fruit type.</li>
	<li>Each basket can hold <b>only one</b> type of fruit.</li>
	<li>If a fruit type <b>cannot be placed</b> in any basket, it remains <b>unplaced</b>.</li>
</ul>

<p>Return the number of fruit types that remain unplaced after all possible allocations are made.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">fruits = [4,2,5], baskets = [3,5,4]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><code>fruits[0] = 4</code> is placed in <code>baskets[1] = 5</code>.</li>
	<li><code>fruits[1] = 2</code> is placed in <code>baskets[0] = 3</code>.</li>
	<li><code>fruits[2] = 5</code> cannot be placed in <code>baskets[2] = 4</code>.</li>
</ul>

<p>Since one fruit type remains unplaced, we return 1.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">fruits = [3,6,1], baskets = [6,4,7]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li><code>fruits[0] = 3</code> is placed in <code>baskets[0] = 6</code>.</li>
	<li><code>fruits[1] = 6</code> cannot be placed in <code>baskets[1] = 4</code> (insufficient capacity) but can be placed in the next available basket, <code>baskets[2] = 7</code>.</li>
	<li><code>fruits[2] = 1</code> is placed in <code>baskets[1] = 4</code>.</li>
</ul>

<p>Since all fruits are successfully placed, we return 0.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == fruits.length == baskets.length</code></li>
	<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= fruits[i], baskets[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
const numOfUnplacedFruits = function (fruits, baskets) {
  const st = new SegmentTree(baskets);
  let result = 0;

  for (const quantity of fruits) {
    const index = st.query(quantity);

    if (index === -1) {
      result += 1;
    } else {
      st.update(index, 0);
    }
  }

  return result;
};

class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.tree = Array.from({ length: this.n * 4 }, () => 0);
    this.build(nums, 0, 0, this.n - 1);
  }

  build(nums, index, left, right) {
    if (left === right) {
      this.tree[index] = nums[left];
      return;
    }
    const mid = Math.floor((left + right) / 2);

    this.build(nums, index * 2 + 1, left, mid);
    this.build(nums, index * 2 + 2, mid + 1, right);
    this.merge(index);
  }

  merge(index) {
    const a = this.tree[index * 2 + 1];
    const b = this.tree[index * 2 + 2];

    this.tree[index] = Math.max(a, b);
  }

  update(index, val) {
    this.#update(0, 0, this.n - 1, index, val);
  }

  #update(index, left, right, target, val) {
    if (left === right) {
      this.tree[index] = val;
      return;
    }
    const mid = Math.floor((left + right) / 2);

    if (mid >= target) {
      this.#update(index * 2 + 1, left, mid, target, val);
    } else {
      this.#update(index * 2 + 2, mid + 1, right, target, val);
    }

    this.merge(index);
  }

  query(target) {
    return this.#query(0, 0, this.n - 1, target);
  }

  #query(index, left, right, target) {
    if (this.tree[index] < target) return -1;
    if (left === right) return left;
    const mid = Math.floor((left + right) / 2);

    if (this.tree[index * 2 + 1] >= target) {
      return this.#query(index * 2 + 1, left, mid, target);
    } else {
      return this.#query(index * 2 + 2, mid + 1, right, target);
    }
  }
}
```
