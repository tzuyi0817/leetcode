# [3510. Minimum Pair Removal to Sort Array II](https://leetcode.com/problems/minimum-pair-removal-to-sort-array-ii)

## Description

<div class="elfjS" data-track-load="description_content"><p>Given an array <code>nums</code>, you can perform the following operation any number of times:</p>

<ul>
	<li>Select the <strong>adjacent</strong> pair with the <strong>minimum</strong> sum in <code>nums</code>. If multiple such pairs exist, choose the leftmost one.</li>
	<li>Replace the pair with their sum.</li>
</ul>

<p>Return the <strong>minimum number of operations</strong> needed to make the array <strong>non-decreasing</strong>.</p>

<p>An array is said to be <strong>non-decreasing</strong> if each element is greater than or equal to its previous element (if it exists).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [5,2,3,1]</span></p>

<p><strong>Output:</strong> <span class="example-io">2</span></p>

<p><strong>Explanation:</strong></p>

<ul>
	<li>The pair <code>(3,1)</code> has the minimum sum of 4. After replacement, <code>nums = [5,2,4]</code>.</li>
	<li>The pair <code>(2,4)</code> has the minimum sum of 6. After replacement, <code>nums = [5,6]</code>.</li>
</ul>

<p>The array <code>nums</code> became non-decreasing in two operations.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">nums = [1,2,2]</span></p>

<p><strong>Output:</strong> <span class="example-io">0</span></p>

<p><strong>Explanation:</strong></p>

<p>The array <code>nums</code> is already sorted.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>
</div>

<p>&nbsp;</p>

## Solutions

**Solution: `Doubly-Linked List + Priority Queue`**

- Time complexity: <em>O(nlogn)</em>
- Space complexity: <em>O(n)</em>

<p>&nbsp;</p>

### **JavaScript**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumPairRemoval = function (nums) {
  const n = nums.length;
  const list = new DoublyLinked();
  const merged = Array.from({ length: n }, () => false);
  const minHeap = new PriorityQueue((a, b) => {
    if (a.cost === b.cost) return a.first.left - b.first.left;

    return a.cost - b.cost;
  });
  let decreaseCount = 0;
  let count = 0;

  list.insertLast(new Node(nums[0], 0));

  for (let i = 1; i < nums.length; i++) {
    list.insertLast(new Node(nums[i], i));

    const curr = list.tail();

    minHeap.enqueue({
      first: curr.getPrev(),
      second: curr,
      cost: nums[i] + nums[i - 1],
    });

    if (nums[i - 1] > nums[i]) {
      decreaseCount++;
    }
  }

  while (decreaseCount > 0) {
    const { first, second, cost } = minHeap.dequeue();

    if (merged[first.left] || merged[second.left] || first.value + second.value !== cost) {
      continue;
    }

    count++;

    if (first.value > second.value) {
      decreaseCount--;
    }

    const prev = first.getPrev();
    const next = second.getNext();

    if (prev) {
      if (prev.value > first.value && prev.value <= cost) {
        decreaseCount--;
      }
      if (prev.value <= first.value && prev.value > cost) {
        decreaseCount++;
      }

      minHeap.enqueue({
        first: prev,
        second: first,
        cost: prev.value + cost,
      });
    }

    if (next) {
      if (second.value > next.value && cost <= next.value) {
        decreaseCount--;
      }
      if (second.value <= next.value && cost > next.value) {
        decreaseCount++;
      }

      minHeap.enqueue({
        first,
        second: next,
        cost: cost + next.value,
      });
    }

    list.remove(second);
    first.value = cost;
    merged[second.left] = true;
  }

  return count;
};

class Node {
  constructor(value, left) {
    this.value = value;
    this.left = left;
    this.prev = null;
    this.next = null;
  }

  getPrev() {
    return this.prev;
  }

  getNext() {
    return this.next;
  }
}

class DoublyLinked {
  headNode = null;
  tailNode = null;
  size = 0;

  head() {
    return this.headNode;
  }

  tail() {
    return this.tailNode;
  }

  insertLast(node) {
    if (this.headNode) {
      node.prev = this.tailNode;
      this.tailNode.next = node;
      this.tailNode = node;
    } else {
      this.headNode = node;
      this.tailNode = node;
    }

    this.size++;
  }

  remove(node) {
    if (!node) return;

    const prev = node.prev;
    const next = node.next;

    if (prev) {
      prev.next = next;
    } else {
      this.headNode = next;
    }

    if (next) {
      next.prev = prev;
    } else {
      this.tailNode = prev;
    }

    node.prev = null;
    node.next = null;
    this.size--;
  }
}
```
