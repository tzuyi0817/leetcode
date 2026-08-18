# [3161. Block Placement Queries](https://leetcode.com/problems/block-placement-queries)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>There exists an infinite number line, with its origin at 0 and extending towards the <strong>positive</strong> x-axis.</p>

<p>You are given a 2D array <code>queries</code>, which contains two types of queries:</p>

<ol>
	<li>For a query of type 1, <code>queries[i] = [1, x]</code>. Build an obstacle at distance <code>x</code> from the origin. It is guaranteed that there is <strong>no</strong> obstacle at distance <code>x</code> when the query is asked.</li>
	<li>For a query of type 2, <code>queries[i] = [2, x, sz]</code>. Check if it is possible to place a block of size <code>sz</code> <em>anywhere</em> in the range <code>[0, x]</code> on the line, such that the block <strong>entirely</strong> lies in the range <code>[0, x]</code>. A block <strong>cannot </strong>be placed if it intersects with any obstacle, but it may touch it. Note that you do<strong> not</strong> actually place the block. Queries are separate.</li>
</ol>

<p>Return a boolean array <code>results</code>, where <code>results[i]</code> is <code>true</code> if you can place the block specified in the <code>i<sup>th</sup></code> query of type 2, and <code>false</code> otherwise.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]</span></p>

<p><strong>Output:</strong> <span class="example-io">[false,true,true]</span></p>

<p><strong>Explanation:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2024/04/22/example0block.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 309px; height: 129px;"></strong></p>

<p>For query 0, place an obstacle at <code>x = 2</code>. A block of size at most 2 can be placed before <code>x = 3</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">queries = </span>[[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]</p>

<p><strong>Output:</strong> [true,true,false]</p>

<p><strong>Explanation:</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2024/04/22/example1block.png" style="padding: 10px; background: rgb(255, 255, 255); border-radius: 0.5rem; width: 310px; height: 130px;"></strong></p>

<ul>
	<li>Place an obstacle at <code>x = 7</code> for query 0. A block of size at most 7 can be placed before <code>x = 7</code>.</li>
	<li>Place an obstacle at <code>x = 2</code> for query 2. Now, a block of size at most 5 can be placed before <code>x = 7</code>, and a block of size at most 2 before <code>x = 2</code>.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= queries.length &lt;= 15 * 10<sup>4</sup></code></li>
	<li><code>2 &lt;= queries[i].length &lt;= 3</code></li>
	<li><code>1 &lt;= queries[i][0] &lt;= 2</code></li>
	<li><code>1 &lt;= x, sz &lt;= min(5 * 10<sup>4</sup>, 3 * queries.length)</code></li>
	<li>The input is generated such that for queries of type 1, no obstacle exists at distance <code>x</code> when the query is asked.</li>
	<li>The input is generated such that there is at least one query of type 2.</li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Binary Indexed Tree + Binary Search`**

- Time complexity: <em>O(10<sup>5</sup>+nlog10<sup>5</sup>)</em>
- Space complexity: <em>O(10<sup>5</sup>+queries.length)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[][]} queries
 * @return {boolean[]}
 */
const getResults = function (queries) {
  const n = queries.length;
  const maxNum = Math.min(50000, n * 3);
  const result = [];
  const tree = new BIT(maxNum);
  const obstacles = new OrderedSet();

  obstacles.insert(0);
  obstacles.insert(maxNum);

  for (const [type, x] of queries) {
    if (type === 1) {
      obstacles.insert(x);
    }
  }

  for (let index = 1; index < obstacles.arr.length; index++) {
    const prev = obstacles.arr[index - 1];
    const current = obstacles.arr[index];

    tree.maximize(current, current - prev);
  }

  for (let index = n - 1; index >= 0; index--) {
    const [type, x, sz] = queries[index];

    if (type === 1) {
      const obstacle = obstacles.findIndex(x);

      if (obstacle !== -1 && obstacle + 1 < obstacles.arr.length) {
        const prevX = obstacles.arr[obstacle - 1];
        const nextX = obstacles.arr[obstacle + 1];

        tree.maximize(nextX, nextX - prevX);
      }

      obstacles.erase(x);
    } else {
      const upper = obstacles.upperBoundIndex(x);
      const prev = obstacles.arr[upper - 1];
      const isPlacement = x - prev >= sz || tree.query(prev) >= sz;

      result.push(isPlacement);
    }
  }

  return result.toReversed();
};

class BIT {
  constructor(n) {
    this.bit = Array.from({ length: n + 2 }, () => 0);
  }

  maximize(x, delta) {
    while (x < this.bit.length) {
      this.bit[x] = Math.max(this.bit[x], delta);
      x += x & -x;
    }
  }

  query(x) {
    let result = 0;

    while (x) {
      result = Math.max(this.bit[x], result);
      x -= x & -x;
    }

    return result;
  }
}

class OrderedSet {
  arr = [];

  upperBoundIndex(val) {
    let left = 0;
    let right = this.arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      this.arr[mid] > val ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  }

  insert(val) {
    const index = this.upperBoundIndex(val);

    if (index > 0 && this.arr[index - 1] === val) return;

    this.arr.splice(index, 0, val);
  }

  erase(val) {
    const index = this.upperBoundIndex(val) - 1;

    if (index >= 0 && this.arr[index] === val) {
      this.arr.splice(index, 1);
    }
  }

  findIndex(val) {
    const index = this.upperBoundIndex(val) - 1;

    return index >= 0 && this.arr[index] === val ? index : -1;
  }
}
```
