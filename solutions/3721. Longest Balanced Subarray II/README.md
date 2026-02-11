# [3721. Longest Balanced Subarray II](https://leetcode.com/problems/longest-balanced-subarray-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given an integer array <code>nums</code>.</p>

<p>A <strong><span data-keyword="subarray-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1k:" data-state="closed" class="">subarray</button></span></strong> is called <strong>balanced</strong> if the number of <strong>distinct even</strong> numbers in the subarray is equal to the number of <strong>distinct odd</strong> numbers.</p>

<p>Return the length of the <strong>longest</strong> balanced subarray.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,5,4,3]</span></p>

<p><strong>Output:</strong> <span class="example-io">4</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The longest balanced subarray is <code>[2, 5, 4, 3]</code>.</li>
	<li>It has 2 distinct even numbers <code>[2, 4]</code> and 2 distinct odd numbers <code>[5, 3]</code>. Thus, the answer is 4.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [3,2,2,5,4]</span></p>

<p><strong>Output:</strong> <span class="example-io">5</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The longest balanced subarray is <code>[3, 2, 2, 5, 4]</code>.</li>
	<li>It has 2 distinct even numbers <code>[2, 4]</code> and 2 distinct odd numbers <code>[3, 5]</code>. Thus, the answer is 5.</li>
</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,2]</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The longest balanced subarray is <code>[2, 3, 2]</code>.</li>
	<li>It has 1 distinct even number <code>[2]</code> and 1 distinct odd number <code>[3]</code>. Thus, the answer is 3.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
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
 * @param {number[]} nums
 * @return {number}
 */
const longestBalanced = function (nums) {
  const n = nums.length;
  const prevMap = new Map();
  const tree = new SegmentTree(n);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const delta = num % 2 ? -1 : 1;

    if (prevMap.has(num)) {
      tree.update(0, prevMap.get(num), -delta);
    }

    tree.update(0, index, delta);
    prevMap.set(num, index);

    const l = tree.query();

    if (l !== -1 && l <= index) {
      const len = index - l + 1;

      result = Math.max(len, result);
    }
  }

  return result;
};

class SegmentTree {
  constructor(n) {
    this.n = n;
    this.minTree = Array.from({ length: 4 * n }, () => 0);
    this.maxTree = Array.from({ length: 4 * n }, () => 0);
    this.lazyTree = Array.from({ length: 4 * n }, () => 0);
  }

  sync(index, low, high) {
    const val = this.lazyTree[index];

    this.minTree[index] += val;
    this.maxTree[index] += val;

    if (low !== high) {
      this.lazyTree[index * 2 + 1] += val;
      this.lazyTree[index * 2 + 2] += val;
    }

    this.lazyTree[index] = 0;
  }

  update(l, r, delta) {
    this.#update(0, 0, this.n - 1, l, r, delta);
  }

  #update(index, low, high, l, r, delta) {
    this.sync(index, low, high);

    if (low > high || low > r || high < l) return;

    if (l <= low && r >= high) {
      this.lazyTree[index] += delta;
      this.sync(index, low, high);
      return;
    }

    const mid = Math.floor((low + high) / 2);

    this.#update(index * 2 + 1, low, mid, l, r, delta);
    this.#update(index * 2 + 2, mid + 1, high, l, r, delta);

    this.merge(this.minTree, index, (a, b) => Math.min(a, b));
    this.merge(this.maxTree, index, (a, b) => Math.max(a, b));
  }

  merge(tree, index, compare) {
    const a = tree[index * 2 + 1];
    const b = tree[index * 2 + 2];

    tree[index] = compare(a, b);
  }

  query() {
    return this.#query(0, 0, this.n - 1);
  }

  #query(index, low, high) {
    this.sync(index, low, high);

    if (this.minTree[index] > 0 || this.maxTree[index] < 0) return -1;

    if (low === high) {
      return this.minTree[index] === 0 ? low : -1;
    }

    const mid = Math.floor((low + high) / 2);
    const l = this.#query(index * 2 + 1, low, mid);

    if (l !== -1) return l;

    return this.#query(index * 2 + 2, mid + 1, high);
  }
}
```
