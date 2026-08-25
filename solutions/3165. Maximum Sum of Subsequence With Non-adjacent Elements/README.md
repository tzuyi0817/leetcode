# [3165. Maximum Sum of Subsequence With Non-adjacent Elements](https://leetcode.com/problems/maximum-sum-of-subsequence-with-non-adjacent-elements)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an array <code>nums</code> consisting of integers. You are also given a 2D array <code>queries</code>, where <code>queries[i] = [pos<sub>i</sub>, x<sub>i</sub>]</code>.</p>

<p>For query <code>i</code>, we first set <code>nums[pos<sub>i</sub>]</code> equal to <code>x<sub>i</sub></code>, then we calculate the answer to query <code>i</code> which is the <strong>maximum</strong> sum of a <span data-keyword="subsequence-array" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_s_" data-state="closed" class="">subsequence</button></span> of <code>nums</code> where <strong>no two adjacent elements are selected</strong>.</p>

<p>Return the <em>sum</em> of the answers to all queries.</p>

<p>Since the final answer may be very large, return it <strong>modulo</strong> <code>10<sup>9</sup> + 7</code>.</p>

<p>A <strong>subsequence</strong> is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [3,5,9], queries = [[1,-2],[0,-3]]</span></p>

<p><strong>Output:</strong> <span class="example-io">21</span></p>

<p><strong>Explanation:</strong><br>
After the 1<sup>st</sup> query, <code>nums = [3,-2,9]</code> and the maximum sum of a subsequence with non-adjacent elements is <code>3 + 9 = 12</code>.<br>
After the 2<sup>nd</sup> query, <code>nums = [-3,-2,9]</code> and the maximum sum of a subsequence with non-adjacent elements is 9.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [0,-1], queries = [[0,-5]]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong><br>
After the 1<sup>st</sup> query, <code>nums = [-5,-1]</code> and the maximum sum of a subsequence with non-adjacent elements is 0 (choosing an empty subsequence).</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>-10<sup>5</sup> &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= queries.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>queries[i] == [pos<sub>i</sub>, x<sub>i</sub>]</code></li>
	<li><code>0 &lt;= pos<sub>i</sub> &lt;= nums.length - 1</code></li>
	<li><code>-10<sup>5</sup> &lt;= x<sub>i</sub> &lt;= 10<sup>5</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Segment Tree`**

- Time complexity: <em>O(n+qlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
const maximumSumSubsequence = function (nums, queries) {
  const MODULO = 10 ** 9 + 7;
  const tree = new SegmentTree(nums);
  let result = 0;

  for (const [pos, x] of queries) {
    tree.update(pos, x);
    result = (result + tree.query()) % MODULO;
  }

  return result;
};

class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.nums = nums;
    this.tree = Array.from({ length: 4 * this.n }, () => {
      return [
        [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
        [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
      ];
    });
    this.#build(0, 0, this.n - 1);
  }

  #build(index, l, r) {
    if (l === r) {
      this.tree[index][0][0] = 0;
      this.tree[index][1][1] = this.nums[l];

      return;
    }

    const mid = Math.floor((l + r) / 2);
    const a = index * 2 + 1;
    const b = index * 2 + 2;

    this.#build(a, l, mid);
    this.#build(b, mid + 1, r);
    this.#merge(index, this.tree[a], this.tree[b]);
  }

  #merge(index, a, b) {
    for (let l = 0; l < 2; l++) {
      for (let r = 0; r < 2; r++) {
        const sum1 = a[l][0] + b[0][r];
        const sum2 = a[l][0] + b[1][r];
        const sum3 = a[l][1] + b[0][r];

        this.tree[index][l][r] = Math.max(sum1, sum2, sum3);
      }
    }
  }

  update(pos, x) {
    this.#update(0, 0, this.n - 1, pos, x);
  }

  #update(index, l, r, pos, x) {
    if (l === r) {
      this.tree[index][1][1] = x;

      return;
    }

    const mid = Math.floor((l + r) / 2);
    const a = index * 2 + 1;
    const b = index * 2 + 2;

    if (pos <= mid) {
      this.#update(a, l, mid, pos, x);
    } else {
      this.#update(b, mid + 1, r, pos, x);
    }

    this.#merge(index, this.tree[a], this.tree[b]);
  }

  query() {
    const result = this.tree[0];
    const sum1 = result[0][0];
    const sum2 = result[0][1];
    const sum3 = result[1][0];
    const sum4 = result[1][1];

    return Math.max(sum1, sum2, sum3, sum4);
  }
}
```
