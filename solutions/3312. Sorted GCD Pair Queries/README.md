# [3312. Sorted GCD Pair Queries](https://leetcode.com/problems/sorted-gcd-pair-queries)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>nums</code> of length <code>n</code> and an integer array <code>queries</code>.</p>

<p>Let <code>gcdPairs</code> denote an array obtained by calculating the <span data-keyword="gcd-function" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_1l_" data-state="closed" class="">GCD</button></span> of all possible pairs <code>(nums[i], nums[j])</code>, where <code>0 &lt;= i &lt; j &lt; n</code>, and then sorting these values in <strong>ascending</strong> order.</p>

<p>For each query <code>queries[i]</code>, you need to find the element at index <code>queries[i]</code> in <code>gcdPairs</code>.</p>

<p>Return an integer array <code>answer</code>, where <code>answer[i]</code> is the value at <code>gcdPairs[queries[i]]</code> for each query.</p>

<p>The term <code>gcd(a, b)</code> denotes the <strong>greatest common divisor</strong> of <code>a</code> and <code>b</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,3,4], queries = [0,2,2]</span></p>

<p><strong>Output:</strong> <span class="example-io">[1,2,2]</span></p>

<p><strong>Explanation:</strong></p>

<p><code>gcdPairs = [gcd(nums[0], nums[1]), gcd(nums[0], nums[2]), gcd(nums[1], nums[2])] = [1, 2, 1]</code>.</p>

<p>After sorting in ascending order, <code>gcdPairs = [1, 1, 2]</code>.</p>

<p>So, the answer is <code>[gcdPairs[queries[0]], gcdPairs[queries[1]], gcdPairs[queries[2]]] = [1, 2, 2]</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,4,2,1], queries = [5,3,1,0]</span></p>

<p><strong>Output:</strong> <span class="example-io">[4,2,1,1]</span></p>

<p><strong>Explanation:</strong></p>

<p><code>gcdPairs</code> sorted in ascending order is <code>[1, 1, 1, 2, 2, 4]</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [2,2], queries = [0,0]</span></p>

<p><strong>Output:</strong> <span class="example-io">[2,2]</span></p>

<p><strong>Explanation:</strong></p>

<p><code>gcdPairs = [2]</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= n == nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= nums[i] &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= queries[i] &lt; n * (n - 1) / 2</code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Prefix Sum + Binary Search`**

- Time complexity: <em>O(nlog(Max(nums)))</em>
- Space complexity: <em>O(Max(nums))</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
const gcdValues = function (nums, queries) {
  const maxNum = Math.max(...nums);
  const countDivisor = Array.from({ length: maxNum + 1 }, () => 0);
  const countGcdPair = Array.from({ length: maxNum + 1 }, () => 0);
  const prefixCountGcdPair = [0];

  for (const num of nums) {
    for (let divisor = 1; divisor * divisor <= num; divisor++) {
      if (num % divisor) continue;

      countDivisor[divisor] += 1;

      if (num / divisor !== divisor) {
        countDivisor[num / divisor] += 1;
      }
    }
  }

  for (let gcd = maxNum; gcd >= 1; gcd--) {
    const count = countDivisor[gcd];

    countGcdPair[gcd] = (count * (count - 1)) / 2;

    for (let largeGcd = gcd * 2; largeGcd <= maxNum; largeGcd += gcd) {
      countGcdPair[gcd] -= countGcdPair[largeGcd];
    }
  }

  for (let gcd = 1; gcd <= maxNum; gcd++) {
    const count = prefixCountGcdPair[gcd - 1] + countGcdPair[gcd];

    prefixCountGcdPair.push(count);
  }

  const findGcdPair = nth => {
    let left = 1;
    let right = prefixCountGcdPair.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      prefixCountGcdPair[mid] < nth ? (left = mid + 1) : (right = mid - 1);
    }

    return left;
  };

  return queries.map(index => findGcdPair(index + 1));
};
```
