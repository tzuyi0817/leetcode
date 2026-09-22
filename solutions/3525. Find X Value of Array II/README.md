# [3525. Find X Value of Array II](https://leetcode.com/problems/find-x-value-of-array-ii)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an array of <strong>positive</strong> integers <code>nums</code> and a <strong>positive</strong> integer <code>k</code>. You are also given a 2D array <code>queries</code>, where <code>queries[i] = [index<sub>i</sub>, value<sub>i</sub>, start<sub>i</sub>, x<sub>i</sub>]</code>.</p>

<p>You are allowed to perform an operation <strong>once</strong> on <code>nums</code>, where you can remove any <strong>suffix</strong> from <code>nums</code> such that <code>nums</code> remains <strong>non-empty</strong>.</p>

<p>The <strong>x-value</strong> of <code>nums</code> <strong>for a given</strong> <code>x</code> is defined as the number of ways to perform this operation so that the <strong>product</strong> of the remaining elements leaves a <em>remainder</em> of <code>x</code> <strong>modulo</strong> <code>k</code>.</p>

<p>For each query in <code>queries</code> you need to determine the <strong>x-value</strong> of <code>nums</code> for <code>x<sub>i</sub></code> after performing the following actions:</p>

<ul>
	<li>Update <code>nums[index<sub>i</sub>]</code> to <code>value<sub>i</sub></code>. Only this step persists for the rest of the queries.</li>
	<li><strong>Remove</strong> the prefix <code>nums[0..(start<sub>i</sub> - 1)]</code> (where <code>nums[0..(-1)]</code> will be used to represent the <strong>empty</strong> prefix).</li>
</ul>

<p>Return an array <code>result</code> of size <code>queries.length</code> where <code>result[i]</code> is the answer for the <code>i<sup>th</sup></code> query.</p>

<p>A <strong>prefix</strong> of an array is a <span data-keyword="subarray" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_u_" data-state="closed" class="">subarray</button></span> that starts from the beginning of the array and extends to any point within it.</p>

<p>A <strong>suffix</strong> of an array is a <span data-keyword="subarray" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_v_" data-state="closed" class="">subarray</button></span> that starts at any point within the array and extends to the end of the array.</p>

<p><strong>Note</strong> that the prefix and suffix to be chosen for the operation can be <strong>empty</strong>.</p>

<p><strong>Note</strong> that x-value has a <em>different</em> definition in this version.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3,4,5], k = 3, queries = [[2,2,0,2],[3,3,3,0],[0,1,0,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[2,2,2]</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>For query 0, <code>nums</code> becomes <code>[1, 2, 2, 4, 5]</code>, and the empty prefix <strong>must</strong> be removed. The possible operations are:
    <ul>
    	<li>Remove the suffix <code>[2, 4, 5]</code>. <code>nums</code> becomes <code>[1, 2]</code>.</li>
    	<li>Remove the empty suffix. <code>nums</code> becomes <code>[1, 2, 2, 4, 5]</code> with a product 80, which gives remainder 2 when divided by 3.</li>
    </ul>
    </li>
    <li>For query 1, <code>nums</code> becomes <code>[1, 2, 2, 3, 5]</code>, and the prefix <code>[1, 2, 2]</code> <strong>must</strong> be removed. The possible operations are:
    <ul>
    	<li>Remove the empty suffix. <code>nums</code> becomes <code>[3, 5]</code>.</li>
    	<li>Remove the suffix <code>[5]</code>. <code>nums</code> becomes <code>[3]</code>.</li>
    </ul>
    </li>
    <li>For query 2, <code>nums</code> becomes <code>[1, 2, 2, 3, 5]</code>, and the empty prefix <strong>must</strong> be removed. The possible operations are:
    <ul>
    	<li>Remove the suffix <code>[2, 2, 3, 5]</code>. <code>nums</code> becomes <code>[1]</code>.</li>
    	<li>Remove the suffix <code>[3, 5]</code>. <code>nums</code> becomes <code>[1, 2, 2]</code>.</li>
    </ul>
    </li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,4,8,16,32], k = 4, queries = [[0,2,0,2],[0,2,0,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[1,0]</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>For query 0, <code>nums</code> becomes <code>[2, 2, 4, 8, 16, 32]</code>. The only possible operation is:

    <ul>
    	<li>Remove the suffix <code>[2, 4, 8, 16, 32]</code>.</li>
    </ul>
    </li>
    <li>For query 1, <code>nums</code> becomes <code>[2, 2, 4, 8, 16, 32]</code>. There is no possible way to perform the operation.</li>

</ul>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,1,2,1,1], k = 2, queries = [[2,1,0,1]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[5]</span></p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= k &lt;= 5</code></li>
	<li><code>1 &lt;= queries.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>queries[i] == [index<sub>i</sub>, value<sub>i</sub>, start<sub>i</sub>, x<sub>i</sub>]</code></li>
	<li><code>0 &lt;= index<sub>i</sub> &lt;= nums.length - 1</code></li>
	<li><code>1 &lt;= value<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= start<sub>i</sub> &lt;= nums.length - 1</code></li>
	<li><code>0 &lt;= x<sub>i</sub> &lt;= k - 1</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(k\*(n+qlogn))</em>
- Space complexity: <em>O(nk)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
const resultArray = function (nums, k, queries) {
  const tree = new SegmentTree(nums, k);

  return queries.map(([index, val, start, x]) => {
    tree.update(index, val);

    const { remain } = tree.query(start);

    return remain[x];
  });
};

class Node {
  constructor(k) {
    this.remain = new Array(k).fill(0);
  }
  product = 1;
}

class SegmentTree {
  constructor(nums, k) {
    this.k = k;
    this.n = nums.length;
    this.tree = Array.from({ length: 4 * this.n }, () => new Node(k));
    this.#build(nums, 0, 0, this.n - 1);
  }

  #build(nums, index, l, r) {
    if (l === r) {
      const x = nums[l] % this.k;

      this.tree[index].remain[x] = 1;
      this.tree[index].product = x;

      return;
    }

    const mid = Math.floor((l + r) / 2);

    this.#build(nums, index * 2 + 1, l, mid);
    this.#build(nums, index * 2 + 2, mid + 1, r);

    const leftNode = this.tree[index * 2 + 1];
    const rightNode = this.tree[index * 2 + 2];

    this.tree[index] = this.#merge(this.tree[index], leftNode, rightNode);
  }

  #merge(node, leftNode, rightNode) {
    node.product = (leftNode.product * rightNode.product) % this.k;

    for (let x = 0; x < this.k; x++) {
      node.remain[x] = leftNode.remain[x];
    }

    for (let x = 0; x < this.k; x++) {
      const mod = (x * leftNode.product) % this.k;

      node.remain[mod] += rightNode.remain[x];
    }

    return node;
  }

  update(index, val) {
    this.#update(0, 0, this.n - 1, index, val);
  }

  #update(index, l, r, target, val) {
    if (l === r) {
      const x = val % this.k;

      this.tree[index] = new Node(this.k);
      this.tree[index].remain[x] = 1;
      this.tree[index].product = x;

      return;
    }

    const mid = Math.floor((l + r) / 2);

    if (target <= mid) {
      this.#update(index * 2 + 1, l, mid, target, val);
    } else {
      this.#update(index * 2 + 2, mid + 1, r, target, val);
    }

    const leftNode = this.tree[index * 2 + 1];
    const rightNode = this.tree[index * 2 + 2];

    this.tree[index] = this.#merge(this.tree[index], leftNode, rightNode);
  }

  query(start) {
    return this.#query(0, 0, this.n - 1, start);
  }

  #query(index, l, r, start) {
    if (start <= l) {
      return this.tree[index];
    }

    const mid = Math.floor((l + r) / 2);

    if (start <= mid) {
      const leftNode = this.#query(index * 2 + 1, l, mid, start);
      const rightNode = this.tree[index * 2 + 2];

      return this.#merge(new Node(this.k), leftNode, rightNode);
    }

    return this.#query(index * 2 + 2, mid + 1, r, start);
  }
}
```
