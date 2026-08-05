# [3134. Find the Median of the Uniqueness Array](https://leetcode.com/problems/find-the-median-of-the-uniqueness-array)

## Description

<div class="HTMLContent_html__0OZLp" data-track-load="description_content"><p>You are given an integer array <code>nums</code>. The <strong>uniqueness array</strong> of <code>nums</code> is the sorted array that contains the number of distinct elements of all the <span data-keyword="subarray-nonempty" class=" cursor-pointer relative text-dark-blue-s text-sm"><button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-_r_21_" data-state="closed" class="">subarrays</button></span> of <code>nums</code>. In other words, it is a sorted array consisting of <code>distinct(nums[i..j])</code>, for all <code>0 &lt;= i &lt;= j &lt; nums.length</code>.</p>

<p>Here, <code>distinct(nums[i..j])</code> denotes the number of distinct elements in the subarray that starts at index <code>i</code> and ends at index <code>j</code>.</p>

<p>Return the <strong>median</strong> of the <strong>uniqueness array</strong> of <code>nums</code>.</p>

<p><strong>Note</strong> that the <strong>median</strong> of an array is defined as the middle element of the array when it is sorted in non-decreasing order. If there are two choices for a median, the <strong>smaller</strong> of the two values is taken.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,3]</span></p>

<p><strong>Output:</strong> <span class="example-io">1</span></p>

<p><strong>Explanation:</strong></p>

<p>The uniqueness array of <code>nums</code> is <code>[distinct(nums[0..0]), distinct(nums[1..1]), distinct(nums[2..2]), distinct(nums[0..1]), distinct(nums[1..2]), distinct(nums[0..2])]</code> which is equal to <code>[1, 1, 1, 2, 2, 3]</code>. The uniqueness array has a median of 1. Therefore, the answer is 1.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [3,4,3,4,5]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>The uniqueness array of <code>nums</code> is <code>[1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3]</code>. The uniqueness array has a median of 2. Therefore, the answer is 2.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [4,3,5,4]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<p>The uniqueness array of <code>nums</code> is <code>[1, 1, 1, 1, 2, 2, 2, 3, 3, 3]</code>. The uniqueness array has a median of 2. Therefore, the answer is 2.</p>
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

**Solution: `Binary Search + Sliding Window`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const medianOfUniquenessArray = function (nums) {
  const n = nums.length;
  const subarrayCount = (n * (n + 1)) / 2;
  const midianCount = Math.floor((subarrayCount + 1) / 2);

  const getMostKDistinctSubarrayCount = k => {
    const numMap = new Map();
    let distinct = 0;
    let left = 0;
    let result = 0;

    for (let index = 0; index < n; index++) {
      const num = nums[index];
      const count = numMap.get(num) ?? 0;

      if (!count) {
        distinct += 1;
      }

      numMap.set(num, count + 1);

      while (distinct > k) {
        const leftNum = nums[left];
        const leftCount = numMap.get(leftNum);

        if (leftCount === 1) {
          numMap.delete(leftNum);
          distinct -= 1;
        } else {
          numMap.set(leftNum, leftCount - 1);
        }

        left += 1;
      }

      result += index - left + 1;
    }

    return result;
  };

  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (getMostKDistinctSubarrayCount(mid) >= midianCount) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
};
```
