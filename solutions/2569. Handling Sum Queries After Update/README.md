# [2569. Handling Sum Queries After Update](https://leetcode.com/problems/handling-sum-queries-after-update)

## Description

<div class="elfjS" data-track-load="description_content"><p>You are given two <strong>0-indexed</strong> arrays <code>nums1</code> and <code>nums2</code> and a 2D array <code>queries</code> of queries. There are three types of queries:</p>

<ol>
	<li>For a query of type 1, <code>queries[i]&nbsp;= [1, l, r]</code>. Flip the values from <code>0</code> to <code>1</code> and from <code>1</code> to <code>0</code> in <code>nums1</code>&nbsp;from index <code>l</code> to index <code>r</code>. Both <code>l</code> and <code>r</code> are <strong>0-indexed</strong>.</li>
	<li>For a query of type 2, <code>queries[i]&nbsp;= [2, p, 0]</code>. For every index <code>0 &lt;= i &lt; n</code>, set&nbsp;<code>nums2[i] =&nbsp;nums2[i]&nbsp;+ nums1[i]&nbsp;* p</code>.</li>
	<li>For a query of type 3, <code>queries[i]&nbsp;= [3, 0, 0]</code>. Find the sum of the elements in <code>nums2</code>.</li>
</ol>

<p>Return <em>an array containing all the answers to the third type&nbsp;queries.</em></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre><strong>Input:</strong> nums1 = [1,0,1], nums2 = [0,0,0], queries = [[1,1,1],[2,1,0],[3,0,0]]
<strong>Output:</strong> [3]
<strong>Explanation:</strong> After the first query nums1 becomes [1,1,1]. After the second query, nums2 becomes [1,1,1], so the answer to the third query is 3. Thus, [3] is returned.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre><strong>Input:</strong> nums1 = [1], nums2 = [5], queries = [[2,0,0],[3,0,0]]
<strong>Output:</strong> [5]
<strong>Explanation:</strong> After the first query, nums2 remains [5], so the answer to the second query is 5. Thus, [5] is returned.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums1.length,nums2.length &lt;= 10<sup>5</sup></code></li>
	<li><code>nums1.length = nums2.length</code></li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code><font face="monospace">queries[i].length = 3</font></code></li>
	<li><code><font face="monospace">0 &lt;= l &lt;= r &lt;= nums1.length - 1</font></code></li>
	<li><code><font face="monospace">0 &lt;= p &lt;= 10<sup>6</sup></font></code></li>
	<li><code>0 &lt;= nums1[i] &lt;= 1</code></li>
	<li><code>0 &lt;= nums2[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(logn)</em>
- Space complexity: <em>O(4n -> n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[][]} queries
 * @return {number[]}
 */
const handleQuery = function (nums1, nums2, queries) {
  const tree = new SegmentTree(nums1);
  const result = [];
  let sum = nums2.reduce((total, num) => total + num);

  for (const [type, l, r] of queries) {
    if (type === 1) {
      tree.updateRange(l, r);
    } else if (type === 2) {
      sum += l * tree.getSum();
    } else {
      result.push(sum);
    }
  }

  return result;
};

class SegmentTree {
  constructor(nums) {
    const n = nums.length;

    this.n = n;
    this.nums = nums;
    this.tree = Array.from({ length: 4 * n }, () => 0);
    this.lazy = Array.from({ length: 4 * n }, () => false);
    this.build(0, 0, n - 1);
  }

  build(index, start, end) {
    if (start === end) {
      this.tree[index] = this.nums[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);

    this.build(index * 2 + 1, start, mid);
    this.build(index * 2 + 2, mid + 1, end);
    this.tree[index] = this.tree[index * 2 + 1] + this.tree[index * 2 + 2];
  }

  updateRange(l, r) {
    return this.#updateRange(0, 0, this.n - 1, l, r);
  }

  #updateRange(index, start, end, l, r) {
    if (this.lazy[index]) {
      this.flip(index, start, end);
      this.lazy[index] = false;
    }

    if (start > r || end < l) return;

    if (start >= l && end <= r) {
      this.flip(index, start, end);
      return;
    }

    const mid = Math.floor((start + end) / 2);

    this.#updateRange(index * 2 + 1, start, mid, l, r);
    this.#updateRange(index * 2 + 2, mid + 1, end, l, r);
    this.tree[index] = this.tree[index * 2 + 1] + this.tree[index * 2 + 2];
  }

  flip(index, start, end) {
    this.tree[index] = end - start + 1 - this.tree[index];

    if (start < end) {
      this.lazy[index * 2 + 1] = !this.lazy[index * 2 + 1];
      this.lazy[index * 2 + 2] = !this.lazy[index * 2 + 2];
    }
  }

  getSum() {
    return this.tree[0];
  }
}
```
