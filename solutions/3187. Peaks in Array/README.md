# [3187. Peaks in Array](https://leetcode.com/problems/peaks-in-array)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>A <strong>peak</strong> in an array <code>arr</code> is an element that is <strong>greater</strong> than its previous and next element in <code>arr</code>.</p>

<p>You are given an integer array <code>nums</code> and a 2D integer array <code>queries</code>.</p>

<p>You have to process queries of two types:</p>

<ul>
	<li><code>queries[i] = [1, l<sub>i</sub>, r<sub>i</sub>]</code>, determine the count of <strong>peak</strong> elements in the <span data-keyword="subarray" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">subarray</button></span> <code>nums[l<sub>i</sub>..r<sub>i</sub>]</code>.</li>
	<li><code>queries[i] = [2, index<sub>i</sub>, val<sub>i</sub>]</code>, change <code>nums[index<sub>i</sub>]</code> to <code><font face="monospace">val<sub>i</sub></font></code>.</li>
</ul>

<p>Return an array <code>answer</code> containing the results of the queries of the first type in order.</p>

<p><strong>Notes:</strong></p>

<ul>
	<li>The <strong>first</strong> and the <strong>last</strong> element of an array or a subarray <strong>cannot</strong> be a peak.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [3,1,4,2,5], queries = [[2,3,4],[1,0,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[0]</span></p>

<p><strong>Explanation:</strong></p>

<p>First query: We change <code>nums[3]</code> to 4 and <code>nums</code> becomes <code>[3,1,4,4,5]</code>.</p>

<p>Second query: The number of peaks in the <code>[3,1,4,4,5]</code> is 0.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,1,4,2,1,5], queries = [[2,2,4],[1,0,2],[1,0,4]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[0,1]</span></p>

<p><strong>Explanation:</strong></p>

<p>First query: <code>nums[2]</code> should become 4, but it is already set to 4.</p>

<p>Second query: The number of peaks in the <code>[4,1,4]</code> is 0.</p>

<p>Third query: The second 4 is a peak in the <code>[4,1,4,2,1]</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>queries[i][0] == 1</code> or <code>queries[i][0] == 2</code></li>
	<li>For all <code>i</code> that:
	<ul>
		<li><code>queries[i][0] == 1</code>: <code>0 &lt;= queries[i][1] &lt;= queries[i][2] &lt;= nums.length - 1</code></li>
		<li><code>queries[i][0] == 2</code>: <code>0 &lt;= queries[i][1] &lt;= nums.length - 1</code>, <code>1 &lt;= queries[i][2] &lt;= 10<sup>5</sup></code></li>
	</ul>
	</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Indexed Tree`**

- Time complexity: <em>O(nlongn+qlogn)</em>
- Space complexity: <em>O(n+q)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
const countOfPeaks = function (nums, queries) {
  const n = nums.length;
  const peaks = Array.from({ length: n }, () => 0);
  const tree = new BIT(n);
  const result = [];

  const isPeak = index => {
    const prev = nums[index - 1];
    const current = nums[index];
    const next = nums[index + 1];

    return current > prev && current > next;
  };

  for (let index = 1; index < n - 1; index++) {
    peaks[index] = Number(isPeak(index));
  }

  for (let index = 0; index < n; index++) {
    tree.update(index + 1, peaks[index]);
  }

  const updatePeak = index => {
    if (index <= 0 || index >= n - 1) return;

    const originPeak = peaks[index];
    const currentPeak = Number(isPeak(index));

    if (originPeak !== currentPeak) {
      peaks[index] = currentPeak;
      tree.update(index + 1, currentPeak - originPeak);
    }
  };

  for (const query of queries) {
    const [type] = query;

    if (type === 1) {
      const l = query[1];
      const r = query[2];
      const count = r - l < 2 ? 0 : tree.query(r) - tree.query(l + 1);

      result.push(count);
    } else {
      const index = query[1];
      const val = query[2];

      nums[index] = val;
      updatePeak(index);
      updatePeak(index - 1);
      updatePeak(index + 1);
    }
  }

  return result;
};

class BIT {
  constructor(n) {
    this.n = n + 2;
    this.tree = Array.from({ length: this.n }, () => 0);
  }

  update(index, delta) {
    while (index < this.n) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  query(index) {
    let result = 0;

    while (index) {
      result += this.tree[index];
      index -= index & -index;
    }

    return result;
  }
}
```
