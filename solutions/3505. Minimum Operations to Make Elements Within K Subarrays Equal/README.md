# [3505. Minimum Operations to Make Elements Within K Subarrays Equal](https://leetcode.com/problems/minimum-operations-to-make-elements-within-k-subarrays-equal)

## Description

<div class="HTMLContent_html__0OZLp" data-qd-rendered-description="" data-track-load="description_content"><p>You are given an integer array <code>nums</code> and two integers, <code>x</code> and <code>k</code>. You can perform the following operation any number of times (<strong>including zero</strong>):</p>

<ul>
	<li>Increase or decrease any element of <code>nums</code> by 1.</li>
</ul>

<p>Return the <strong>minimum</strong> number of operations needed to have <strong>at least</strong> <code>k</code> <em>non-overlapping <span data-keyword="subarray-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_t_" data-state="closed" class="">subarrays</button></span></em> of size <strong>exactly</strong> <code>x</code> in <code>nums</code>, where all elements within each subarray are equal.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [5,-2,1,3,7,3,6,4,-1], x = 3, k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">8</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Use 3 operations to add 3 to <code>nums[1]</code> and use 2 operations to subtract 2 from <code>nums[3]</code>. The resulting array is <code>[5, 1, 1, 1, 7, 3, 6, 4, -1]</code>.</li>
	<li>Use 1 operation to add 1 to <code>nums[5]</code> and use 2 operations to subtract 2 from <code>nums[6]</code>. The resulting array is <code>[5, 1, 1, 1, 7, 4, 4, 4, -1]</code>.</li>
	<li>Now, all elements within each subarray <code>[1, 1, 1]</code> (from indices 1 to 3) and <code>[4, 4, 4]</code> (from indices 5 to 7) are equal. Since 8 total operations were used, 8 is the output.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [9,-2,-2,-2,1,5], x = 2, k = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">3</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>Use 3 operations to subtract 3 from <code>nums[4]</code>. The resulting array is <code>[9, -2, -2, -2, -2, 5]</code>.</li>
	<li>Now, all elements within each subarray <code>[-2, -2]</code> (from indices 1 to 2) and <code>[-2, -2]</code> (from indices 3 to 4) are equal. Since 3 operations were used, 3 is the output.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>6</sup> &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
	<li><code>2 &lt;= x &lt;= nums.length</code></li>
	<li><code>1 &lt;= k &lt;= 15</code></li>
	<li><code>2 &lt;= k * x &lt;= nums.length</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Priority Queue + Dynamic Programming`**

- Time complexity: <em>O(nlogx+nk)</em>
- Space complexity: <em>O(nk+x)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
const minOperations = function (nums, x, k) {
  const minOps = getMinOps(nums, x);
  const m = minOps.length;
  const dp = Array.from({ length: m }, () => new Array(k + 1).fill(-1));

  const getMinTotalOps = (index, remain) => {
    if (m - index < (remain - 1) * x + 1) {
      return Number.MAX_SAFE_INTEGER;
    }

    if (index >= m || !remain) return 0;

    if (dp[index][remain] !== -1) return dp[index][remain];

    const skip = getMinTotalOps(index + 1, remain);
    const pick = minOps[index] + getMinTotalOps(index + x, remain - 1);
    const result = Math.min(skip, pick);

    dp[index][remain] = result;

    return result;
  };

  return getMinTotalOps(0, k);
};

function getMinOps(nums, x) {
  const n = nums.length;
  const lowerHeap = new MaxHeap();
  const upperHeap = new MinHeap();
  const delayLowerMap = new Map();
  const delayUpperMap = new Map();
  const result = [];
  let lowerSize = 0;
  let upperSize = 0;
  let lowerSum = 0;
  let upperSum = 0;

  const prune = (heap, delayMap) => {
    while (heap.size()) {
      const num = heap.top();
      const count = delayMap.get(num);

      if (!count) return;

      heap.pop();

      if (count === 1) {
        delayMap.delete(num);
      } else {
        delayMap.set(num, count - 1);
      }
    }
  };

  const balance = () => {
    prune(lowerHeap, delayLowerMap);
    prune(upperHeap, delayUpperMap);

    if (lowerSize < upperSize) {
      const num = upperHeap.pop();

      lowerHeap.push(num);
      lowerSize += 1;
      lowerSum += num;
      upperSize -= 1;
      upperSum -= num;
    } else if (lowerSize - upperSize > 1) {
      const num = lowerHeap.pop();

      upperHeap.push(num);
      lowerSize -= 1;
      lowerSum -= num;
      upperSize += 1;
      upperSum += num;
    }

    prune(lowerHeap, delayLowerMap);
    prune(upperHeap, delayUpperMap);
  };

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (!lowerSize || num <= lowerHeap.top()) {
      lowerSum += num;
      lowerSize += 1;
      lowerHeap.push(num);
    } else {
      upperSum += num;
      upperSize += 1;
      upperHeap.push(num);
    }

    if (index >= x) {
      prune(lowerHeap, delayLowerMap);
      prune(upperHeap, delayUpperMap);

      const deleteNum = nums[index - x];

      if (deleteNum <= lowerHeap.top()) {
        const count = delayLowerMap.get(deleteNum) ?? 0;

        delayLowerMap.set(deleteNum, count + 1);
        lowerSize -= 1;
        lowerSum -= deleteNum;
      } else {
        const count = delayUpperMap.get(deleteNum) ?? 0;

        delayUpperMap.set(deleteNum, count + 1);
        upperSize -= 1;
        upperSum -= deleteNum;
      }
    }

    balance();

    if (index >= x - 1) {
      const median = lowerHeap.top();
      const ops = median * lowerSize - lowerSum + upperSum - median * upperSize;

      result.push(ops);
    }
  }

  return result;
}
```
