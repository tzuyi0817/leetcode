# [3477. Fruits Into Baskets II](https://leetcode.com/problems/fruits-into-baskets-ii)

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
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>1 &lt;= fruits[i], baskets[i] &lt;= 1000</code></li>
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
    if (st.query(quantity) === -1) {
      result += 1;
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

  build(nums, index, low, high) {
    if (low === high) {
      this.tree[index] = nums[low];
      return;
    }
    const mid = Math.floor((low + high) / 2);

    this.build(nums, index * 2 + 1, low, mid);
    this.build(nums, index * 2 + 2, mid + 1, high);
    this.merge(index);
  }

  update(target, val) {
    this._update(0, 0, this.n - 1, target, val);
  }

  _update(index, low, high, target, val) {
    if (low === high) {
      this.tree[index] = val;
      return;
    }
    const mid = Math.floor((low + high) / 2);

    if (target <= mid) {
      this._update(index * 2 + 1, low, mid, target, val);
    } else {
      this._update(index * 2 + 2, mid + 1, high, target, val);
    }

    this.merge(index);
  }

  query(target) {
    return this._query(0, 0, this.n - 1, target);
  }

  _query(index, low, high, target) {
    if (this.tree[index] < target) return -1;
    if (low === high) {
      this.update(low, -1);
      return low;
    }
    const mid = Math.floor((low + high) / 2);

    if (this.tree[index * 2 + 1] >= target) {
      return this._query(index * 2 + 1, low, mid, target);
    } else {
      return this._query(index * 2 + 2, mid + 1, high, target);
    }
  }

  merge(index) {
    this.tree[index] = Math.max(this.tree[index * 2 + 1], this.tree[index * 2 + 2]);
  }
}
```
